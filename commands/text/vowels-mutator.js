const { ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');

const vowelLowercaseRegex = /[aeiouáéíóúàèìòùâêîôûäëïöü]/gm;
const vowelUppercaseRegex = /[AEIOUÁÉÍÓÚÀÈÌÒÙÂÊÎÔÛÄËÏÖÜ]/gm;
const vowelsLowercase = ['a', 'e', 'i', 'o', 'u'];
const vowelsUppercase = ['A', 'E', 'I', 'O', 'U'];

module.exports = {
	data: new ContextMenuCommandBuilder()
		.setName('Vowel Swap')
		.setType(ApplicationCommandType.Message),
	async execute(interaction) {
		const vowel = Math.floor((Math.random() * 5));
		let { content } = interaction.targetMessage;
		content = content.replace(vowelLowercaseRegex, vowelsLowercase[vowel]);
		content = content.replace(vowelUppercaseRegex, vowelsUppercase[vowel]);

		await interaction.reply(content);
	},
};