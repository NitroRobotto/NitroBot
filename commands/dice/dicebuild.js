const { SlashCommandBuilder } = require('discord.js');
const { GetRandomFromList, RemoveItemFromList } = require('../../tools/utils.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dicebuild')
		.setDescription('Roll a custom dice with arbitrary faces.')
		.addStringOption(option =>
			option.setName('faces').setDescription('Content of the faces to roll for. Each face is separated with ";".')
				.setRequired(true))
		.addIntegerOption(option =>
			option.setName('rolls').setDescription('How many dice should you roll? Default: 1.')
				.setMinValue(1))
		.addBooleanOption(option =>
			option.setName('norepeats').setDescription('If set to true, prevents faces from repeating.')),
	async execute(interaction) {
		let faces = interaction.options.getString('faces', true).split(';');
		let rolls = interaction.options.getInteger('rolls') ? interaction.options.getInteger('rolls') : 1;
		const noRepeats = interaction.options.getBoolean('norepeats');

		faces.forEach((item, index, list) => {list[index] = item.trim();});
		faces = faces.filter(Boolean);
		if (noRepeats) rolls = Math.min(rolls, faces.length);

		let results = `**Dicebuild: **${rolls}  ×**「**`;

		faces.forEach((item) => { results += item + ';'; });

		results = `${results.slice(0, -1)}**」**\n***Results:***`;

		let tempResult;
		while (rolls-- > 0) {
			tempResult = GetRandomFromList(faces);
			if (noRepeats) faces = RemoveItemFromList(faces, tempResult);
			results += '「' + tempResult + '」';
		}

		await interaction.reply(results);
	},
};