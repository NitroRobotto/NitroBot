const { SlashCommandBuilder } = require('discord.js');
const { D6 } = require('../../tools/utils.js');

function DoFURolls(amount, keepHighest) {
	let result = keepHighest ? 1 : 6;
	const allDice = [];
	for (let i = 0; i < amount; ++i) {
		const current = D6();
		allDice.push(current.val);
		if (keepHighest) {
			result = (result < current.val) ? current.val : result;
		}
		else {
			result = (result > current.val) ? current.val : result;
		}
	}

	switch (result) {
	case 6:
		return { 'icon': ':white_check_mark: :white_check_mark:', 'str': 'Yes, and...!', 'dice': allDice };
	case 5:
		return { 'icon': ':white_check_mark:', 'str': 'Yes.', 'dice': allDice };
	case 4:
		return { 'icon': ':white_check_mark: :negative_squared_cross_mark:', 'str': 'Yes, but...', 'dice': allDice };
	case 3:
		return { 'icon': ':negative_squared_cross_mark: :white_check_mark:', 'str': 'No, but...!', 'dice': allDice };
	case 2:
		return { 'icon': ':negative_squared_cross_mark:', 'str': 'No.', 'dice': allDice };
	case 1:
		return { 'icon': ':negative_squared_cross_mark: :negative_squared_cross_mark:', 'str': 'No, and...', 'dice': allDice };
	}
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('fu')
		.setDescription('Rolls some freeform unlimited dice. If no dice are specified, rolls only one dice.')
		.addIntegerOption(option =>
			option.setName('dice').setDescription('How many dice do you want to roll?')
				.setMinValue(-3)
				.setMaxValue(3)
				.addChoices(
					{ name: '+3', value: 3 },
					{ name: '+2', value: 2 },
					{ name: '1', value: 1 },
					{ name: '-2', value: -2 },
					{ name: '-3', value: -3 },
				))
		.addStringOption(option =>
			option.setName('context').setDescription('Some text to give context to the dice roll.')),
	async execute(interaction) {
		const diceAmount = interaction.options.getInteger('dice') ? interaction.options.getInteger('dice') : 1;
		const context = interaction.options.getString('context') ? ` ${interaction.options.getString('context')} ` : '';

		const results = DoFURolls(Math.abs(diceAmount), diceAmount > 0);
		let reply = `Rolling ${diceAmount} **FU** dice:${context}`;

		for (let i = 0; i < results.dice.length; ++i) {
			reply += ` [${results.dice[i]}]`;
		}

		await interaction.reply(reply + `\n\n${results.icon} **${results.str}**`);
	},
};