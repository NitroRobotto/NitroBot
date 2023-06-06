const { SlashCommandBuilder } = require('discord.js');

const roll = (dice, faces) => {
	const result = {
		die: [],
		total: 0,
	};

	const dice_remaining = Math.min(dice, 20);
	for (let i = dice_remaining; i > 0; i--) {
		const die = Math.floor(Math.random() * (faces - 1)) + 1;
		result.die.push(die);
		result.total += die;
	}

	return result;
};

const _evaluate_factor = (factor) => {
	let result = {
		die: [],
		total: 0,
	};

	if (factor.length > 1 && factor.includes('d')) {
		const rollDice = factor.split('d');
		if (rollDice.length > 1) {
			result = roll(parseInt(rollDice[0]), parseInt(rollDice[1]));
		}
	}
	else {
		result.total = parseInt(factor);
		if (isNaN(result.total)) result.total = 0;
	}

	return result;
};

const _add_faces = (term, die) => {
	if (die.length < 1) return '';
	else return `[${term} = ${die}]`;
};

const _evaluate_term = (term) => {
	const terms = term.split('*');

	if (terms.length == 0) return _evaluate_factor('');

	let rollDice = _evaluate_factor(terms[0]);
	const result = {
		total: rollDice.total,
		faces: [],
	};

	if (rollDice.die.length > 0) result.faces.push(_add_faces(terms[0], rollDice.die));

	for (let index = 1; (index < terms.length && index <= 10); index++) {
		rollDice = _evaluate_factor(terms[index]);
		result.total *= rollDice.total;

		if (rollDice.die.length > 0) result.faces.push(_add_faces(terms[index], rollDice.die));
	}

	return result;
};

module.exports = {
	data: new SlashCommandBuilder()
		.setName('roll')
		.setDescription('Parse a formula and roll dice.')
		.addStringOption(option =>
			option.setName('formula').setDescription('Formula for the dice roll.')
				.setRequired(true)),
	async execute(interaction) {
		const params = interaction.options.getString('formula', true);

		const total = {
			total: 0,
			faces: [],
		};

		let max_terms = 10;

		for (const term of params.replace(' ', '').split('+')) {
			const rolled_term = _evaluate_term(term);
			total.total += rolled_term.total;
			total.faces = total.faces.concat(rolled_term.faces);
			max_terms -= 1;
			if (max_terms == 0) break;
		}

		await interaction.reply(`rolling \`\`${params}\`\` = **[${total.total}]**  / ${total.faces}`);
	},
};