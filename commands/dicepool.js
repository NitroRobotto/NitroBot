const { SlashCommandBuilder } = require('discord.js');
const { roll } = require('../tools/utils.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dicepool')
		.setDescription('Rolls between 1 and 10 dice of the specific type.')
		.addIntegerOption(option =>
			option.setName('dice').setDescription('How many dice do you want to roll?')
				.setRequired(true)
				.addChoices(
					{ name: '1', value: 1 },
					{ name: '2', value: 2 },
					{ name: '3', value: 3 },
					{ name: '4', value: 4 },
					{ name: '5', value: 5 },
					{ name: '6', value: 6 },
					{ name: '7', value: 7 },
					{ name: '8', value: 8 },
					{ name: '9', value: 9 },
					{ name: '10', value: 10 },
				))
		.addIntegerOption(option =>
			option.setName('faces').setDescription('The type of dice to roll. Default: d6')
				.addChoices(
					{ name: 'd4', value: 4 },
					{ name: 'd6', value: 6 },
					{ name: 'd10', value: 10 },
					{ name: 'd12', value: 12 },
					{ name: 'd20', value: 20 },
					{ name: 'd100', value: 100 },
				))
		.addStringOption(option =>
			option.setName('context').setDescription('Some text to give context to the dice roll.'))
		.addBooleanOption(option =>
			option.setName('exploding').setDescription('Sets the pool to be exploding. Default: False')),
	async execute(interaction) {
		let rolls = interaction.options.getInteger('dice', true);
		const faces = interaction.options.getInteger('faces') ? interaction.options.getInteger('faces') : 6;
		const exploding = interaction.options.getBoolean('exploding');
		const context = interaction.options.getString('context') ? ` ${interaction.options.getString('context')} ` : '';

		let reply = `Rolling ${exploding ? 'exploding ' : ''}${rolls}d${faces}: ${context}\n`;
		let currentRoll;
		while (rolls-- > 0) {
			currentRoll = roll(faces);
			if (exploding && currentRoll == faces) {
				++rolls;
				reply += `**[${currentRoll}]** `;
			}
			else { reply += `[${currentRoll}] `; }
		}

		await interaction.reply(reply);
	},
};