const { SlashCommandBuilder } = require('discord.js');

function DoNovaRolls(amount, critRange) {
	let roll = NovaQuestion(amount, critRange);
	const result = { 'novas': roll.novas, 'successes': roll.successes, 'rolls': [{ 'dice': amount, 'str': roll.string }] };

	while (roll.novas > 0 && result.successes < 30) {
		roll = NovaQuestion(roll.novas, critRange);
		result.novas += roll.novas;
		result.successes += roll.successes;
		result.rolls.push({ 'dice': roll.novas, 'str': roll.string });
	}

	return result;
}

function NovaQuestion(amount, critRange) {
	const roll = {
		novas: 0,
		successes: 0,
		string: '',
	};

	for (let i = 0; i < amount; ++i) {
		const diceInt = Math.floor(Math.random() * 6 + 1);

		if (diceInt >= critRange) {
			roll.string += ':eight_spoked_asterisk: ';
			++roll.novas;
			++roll.successes;
		}
		else if (diceInt >= 4) {
			roll.string += ':white_check_mark: ';
			++roll.successes;
		}
		else {
			roll.string += ':white_large_square: ';
		}
	}

	return roll;
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('nova')
		.setDescription('Rolls the specified ammount of nova dice.')
		.addIntegerOption(option =>
			option.setName('dicecount').setDescription('How many nova dice to roll?')
				.setRequired(true)
				.setMinValue(1)
				.setMaxValue(50))
		.addIntegerOption(option =>
			option.setName('critrange').setDescription('If you get this or above, this triggers a dice explosion. Defaults to 6.')
				.setMinValue(2)
				.setMaxValue(6)
				.addChoices(
					{ name: '6+', value: 6 },
					{ name: '5+', value: 5 },
					{ name: '4+', value: 4 },
					{ name: '3+', value: 3 },
					{ name: '2+', value: 2 },
				))
		.addStringOption(option =>
			option.setName('context').setDescription('Some text to give context to the dice roll.')),
	async execute(interaction) {
		const diceAmount = interaction.options.getInteger('dicecount', true);
		const critRange = interaction.options.getInteger('critrange') ? interaction.options.getInteger('critrange') : 6;
		const context = interaction.options.getString('context');

		const novaRoll = DoNovaRolls(diceAmount, critRange);

		let response = `**Rolling **[${diceAmount}]** Nova Dice**`;
		if (critRange < 6) response += ` (Enhanced Crits! ${critRange}+)`;
		if (context) response += `: ${context}`;

		for (let explosion = 0; explosion < novaRoll.rolls.length; ++explosion) {
			if (explosion > 0) {
				response += `**Rolling **[${novaRoll.rolls[explosion - 1].dice}]** Nova Dice`;
				for (let exclamation = 0; exclamation < explosion; exclamation++) response += '!';
				response += '**';
			}
			response += `\n${novaRoll.rolls[explosion].str}\n`;
		}

		response += `\n**Sucesses: **[${novaRoll.successes}] | **Novas: **[${novaRoll.novas}]`;

		await interaction.reply(response);
	},
};