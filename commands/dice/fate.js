const { SlashCommandBuilder } = require('discord.js');
const { D6 } = require('../../tools/utils.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('fate')
		.setDescription('Rolls some FATE dice.'),
	async execute(interaction) {
		let result = '';
		let total = 0;
		for (let i = 0; i < 4; ++i) {
			switch (D6().val) {
			case 6:
			case 5:
				result += '[+] ';
				++total;
				break;
			case 4:
			case 3:
				result += '[ ] ';
				break;
			case 2:
			case 1:
				result += '[-] ';
				--total;
				break;
			}
		}

		await interaction.reply(`Your **FATE** is...\n\n\`\`${result.trimEnd()}\`\`\n\n**Total:** \`${total}\``);
	},
};