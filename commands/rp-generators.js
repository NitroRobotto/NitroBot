const { SlashCommandBuilder } = require('discord.js');
const { GetRandomFromList } = require('../tools/utils.js');

const fabulaOpportunities = [
	'**[Advantage]** - *The next Check made by you or an ally will receive a +3 bonus.*',
	'**[Affliction]** - *Another creature suffers a status effect of your choice.*',
	'**[Bonding]** - *You create a bond towards someone or something or add an emotion to one of your existing bonds.*',
	'**[Faux Pas]** - *Choose a creature present on the scene: they make a compromising statement chosen by the person who controls them.*',
	'**[Favor]** - *Your actions earn you someone’s support or admiration.*',
	'**[Information]** - *You spot a useful clue or detail. The Game Master may tell you what it is, or ask you to introduce that detail yourself.*',
	'**[Lost Item]** - *An item is destroyed, lost, stolen or left behind.*',
	'**[Progress]** - *You may fill or erase one section of a clock.*',
	'**[Plot Twist!]** - *Someone or something of your choice suddenly appears on the scene.*',
	'**[Scan]** - *You discover one Vulnerability or one trait of a creature you can see.*',
	'**[Unmask]** - *You learn the goals and motivations of a creature of your choice.*',
];

const fabulaSurrender = [
	'**[Darkness]** - *	You must change your theme to one of the following: Anger, Doubt, Guilt or Vengeance - your choice.',
	'**[Despair]** - * A person, group or community loses all faith in you or in the heroes as a whole. Their trust will not be easily regained.',
	'**[Loss]** - *	Something incredibly precious, such as a magical artifact, a loved person, or an ancient and important heirloom, is taken from you.',
	'**[Resentment]** - * You are forced to erase one of your bonds and replace it with a bond towards a character chosen by the Game Master. This new bond must be of Hatred, Inferiority or Mistrust - your choice.',
	'**[Separated]** - * You are no longer with your allies. You might be captured, dragged away, lost or stranded in some unknown location.*',
];

const attribute = [
	'Dark', 'Bright',
	'Dangerous', 'Peaceful',
	'Harsh', 'Cozy',
	'Deep', 'Shallow',
	'Horrid', 'Charming',
	'Mysterious', 'Hidden',
];

const natureName = [
	'Village', 'City',
	'Countryside', 'Road', 'Prairie',
	'Forest', 'Hill', 'River',
	'Swamp', 'Sea', 'Mountain',
	'Desert', 'Tundra', 'Jungle', 'Volcano',
];

const climate = [
	'Clear', 'Cloudy', 'Drizzle', 'Rain', 'Downpour', 'Thunderstorm',
];

const cliamteOdds = [0, 0, 0, 1, 1, 1, 2, 2, 3, 3, 4, 5];
const travelDangers = [
	'**[Random Encounter]** - *Look out, trouble!*',
	'**[Roadblock]** - *The path ahead is sealed! You will have to take a long detour, or find some way through it.*',
	'**[Thievery]** - *You lost some money or other type of resources. Or maybe it was stolen?*',
	'**[Harsh Environment]** - *The environment caused *',
	'**[Bad Climate]** - *The climate took a turn for the worse.*',
];

module.exports = {
	data: new SlashCommandBuilder()
		.setName('generator')
		.setDescription('Generates content, perfect for roleplay stuff.')
		.addSubcommandGroup(subcommandgroup =>
			subcommandgroup.setName('fabula-ultima')
				.setDescription('Commands used for Fabula Ultima content.')
				.addSubcommand(subcommand =>
					subcommand.setName('opportunity').setDescription('A random opportunity.'))
				.addSubcommand(subcommand =>
					subcommand.setName('surrender').setDescription('A random surrender penalty.')),
		)
		.addSubcommand(subcommand =>
			subcommand.setName('location').setDescription('Random environment.'))
		.addSubcommand(subcommand =>
			subcommand.setName('climate').setDescription('Random climate.'))
		.addSubcommand(subcommand =>
			subcommand.setName('dangers').setDescription('Random travel danger.')),
	async execute(interaction) {
		let reply = '';
		switch (interaction.options.getSubcommand()) {
		case 'opportunity':
			reply = GetRandomFromList(fabulaOpportunities);
			break;
		case 'surrender':
			reply = GetRandomFromList(fabulaSurrender);
			break;
		case 'location':
			reply = `${GetRandomFromList(attribute)} ${GetRandomFromList(natureName)}`;
			break;
		case 'climate':
			reply = climate[GetRandomFromList(cliamteOdds)];
			break;
		case 'dangers':
			reply = GetRandomFromList(travelDangers);
			break;
		}

		await interaction.reply(reply);
	},
};