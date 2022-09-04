const { ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');
const letterRegex = /[a-z]/i;

function isLetter(str) {
	return str.length === 1 && str.match(letterRegex);
}

module.exports = {
	data: new ContextMenuCommandBuilder()
		.setName('Big Text')
		.setType(ApplicationCommandType.Message),
	async execute(interaction) {
		let { content } = interaction.targetMessage;

		content = content.toLowerCase();
		let output = ':arrow_right:  ';
		for (let i = 0; i < content.length; ++i) {
			if (isLetter(content[i])) {
				output += ':regional_indicator_' + content[i] + ': ';
			}
			else if (content[i] == ' ') {
				output += '   ';
			}
		}
		output += ' :arrow_left:';

		await interaction.reply(output);
	},
};