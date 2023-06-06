const { SlashCommandBuilder } = require('discord.js');
const { roll, displayPercent } = require('../../tools/utils.js');

function FabulaStats(diceOne, diceTwo, extendedCrit) {
	const smallDice = Math.min(diceOne, diceTwo);
	const bigDice = Math.max(diceOne, diceTwo);

	// equal dice, 1
	let fumble = 0;
	// equal dice, 6+
	let crit = 0;
	// 7+
	let easy = 0;
	// 10+
	let normal = 0;
	// 13+
	let hard = 0;
	// 16+
	let veryHard = 0;

	const possibilities = bigDice * smallDice;

	for (let diceA = 1; diceA <= bigDice; ++diceA) {
		for (let diceB = 1; diceB <= smallDice; ++diceB) {
			if (diceA == diceB) {
			// Crits & fumbles
				if (diceA == 1) ++fumble;
				else if (diceA >= 6 || extendedCrit) ++crit;
			}
			// Hitting Difficulties
			if ((diceA + diceB) >= 16) ++veryHard;
			if ((diceA + diceB) >= 13) ++hard;
			if ((diceA + diceB) >= 10) ++normal;
			if ((diceA + diceB) >= 7) ++easy;
		}
	}

	/*
	// Chance of getting a specific number * chance of geteting a specific number.
	var fumbleChance = (1/results[1]) * (1/results[2])
	// Chance of getting any number of 6+ * chance of getting a specific number.

	var critChance = (Math.max(0,smallDice-5)/smallDice) * 1/bigDice
	*/
	return { content: `With d${bigDice} + d${smallDice}, your odds are:
	\t- Critical Success: ${displayPercent(crit / possibilities)}
	\t- Fumble: ${displayPercent(fumble / possibilities)}
	\t- Easy Task: ${displayPercent(easy / possibilities)}
	\t- Normal Task: ${displayPercent(normal / possibilities)}
	\t- Hard Task: ${displayPercent(hard / possibilities)}
	\t- Very Hard Task: ${displayPercent(veryHard / possibilities)}`, ephemeral: true };
}

function FabulaRoll(diceOne, diceTwo, extendedCrit, context) {
	const firstDice = roll(diceOne);
	const secondDice = roll(diceTwo);
	const total = firstDice + secondDice;
	const critical = (firstDice == secondDice) && (firstDice >= 6 || extendedCrit);
	const botch = (firstDice == 1) && (secondDice == 1);

	// Header
	let reply = `Rolling **Fabula Ultima** dice (d${diceOne} + d${diceTwo}):${context}\n`;

	// Dice
	if (critical || botch) reply += `\t\t\t【**${firstDice}**】+【**${secondDice}**】= **${total}**\n`;
	else reply += `\t\t\t【${firstDice}】+【${secondDice}】= **${total}**\n`;

	// Total

	if (botch) {
		reply += '***Fumble!***\nThe action automatically fails, you gain 1 **Fabula Point**, and the opposition gets an **Opportunity**.\n';
	}
	else if (critical) {
		reply += '***Critical Success!***\nThe action automatically succeeds, and you get an **Opportunity**!\n';
	}
	else if (total < 7) {reply += '*Bad...*';}
	else if (total < 10) {reply += '*Poor* *(Success vs Easy)*';}
	else if (total < 13) {reply += 'Good *(Success vs Normal)*';}
	else if (total < 16) {reply += '**Excelent!** *(Success vs Hard)*';}
	else {reply += '***Incredible!!!*** *(Success vs Very Hard)*';}

	return reply;
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('fabula')
		.setDescription('Rolls some Fabula Ultima dice!')
		.addIntegerOption(option =>
			option.setName('first').setDescription('Type of the first dice.')
				.setRequired(true)
				.addChoices(
					{ name: 'd2', value: 2 },
					{ name: 'd4', value: 4 },
					{ name: 'd6', value: 6 },
					{ name: 'd8', value: 8 },
					{ name: 'd10', value: 10 },
					{ name: 'd12', value: 12 },
					{ name: 'd20', value: 20 },
				))
		.addIntegerOption(option =>
			option.setName('second').setDescription('Type of the second dice.')
				.setRequired(true)
				.addChoices(
					{ name: 'd2', value: 2 },
					{ name: 'd4', value: 4 },
					{ name: 'd6', value: 6 },
					{ name: 'd8', value: 8 },
					{ name: 'd10', value: 10 },
					{ name: 'd12', value: 12 },
					{ name: 'd20', value: 20 },
				))
		.addBooleanOption(option =>
			option.setName('extendedcrits').setDescription('If true, you can get a critical from any non-1 pair of dice.'))
		.addStringOption(option =>
			option.setName('context').setDescription('Some text to give context to the dice roll.'))
		.addBooleanOption(option =>
			option.setName('simulate').setDescription('If true, calculates the odds for that dice pair: Only you can see the result.')),
	async execute(interaction) {
		const firstDice = interaction.options.getInteger('first', true);
		const secondDice = interaction.options.getInteger('second', true);
		const extendedCrit = interaction.options.getBoolean('extendedcrits');
		const context = interaction.options.getString('context') ? ` ${interaction.options.getString('context')} ` : '';
		const simulate = interaction.options.getBoolean('simulate');

		await interaction.reply(simulate ? FabulaStats(firstDice, secondDice, extendedCrit) : FabulaRoll(firstDice, secondDice, extendedCrit, context));
	},
};