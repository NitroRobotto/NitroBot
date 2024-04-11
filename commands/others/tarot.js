const { SlashCommandBuilder } = require('discord.js');
const { GetRandomFromList, RemoveItemFromList } = require('../../tools/utils.js');

const arcana = {
	'major': [
		{
			'name': '``0``: *The Fool* 🃏',
			'upright': 'New beginnings, spontaneity, opportunities.',
			'reversed': 'Carelessness, recklessness, naivety.',
		},
		{
			'name': '``I``: *The Magician* 🎩',
			'upright': 'Manifestation, power, resourcefulness.',
			'reversed': 'Deception, manipulation, missed opportunities.',
		},
		{
			'name': '``II``: *The High Priestess* 📖',
			'upright': 'Intuition, mystery, hidden knowledge.',
			'reversed': 'Secrets, confusion, uncertainty.',
		},
		{
			'name': '``III``: *The Empress* 🌿',
			'upright': 'Nurturing, abundance, fertility.',
			'reversed': 'Overbearing, dependency, stagnation.',
		},
		{
			'name': '``IV``: *The Emperor* 👑',
			'upright': 'Authority, leadership, structure.',
			'reversed': 'Tyranny, control, domination.',
		},
		{
			'name': '``V``: *The Hierophant* ⛪',
			'upright': 'Tradition, spirituality, guidance.',
			'reversed': 'Conformity, dogma, restriction.',
		},
		{
			'name': '``VI``: *The Lovers* 💖',
			'upright': 'Love, harmony, partnerships.',
			'reversed': 'Disharmony, choices, conflicts.',
		},
		{
			'name': '``VII``: *The Chariot* 🏇',
			'upright': 'Determination, victory, success.',
			'reversed': 'Defeat, obstacles, lack of direction.',
		},
		{
			'name': '``VIII``: *Strength* 💪',
			'upright': 'Courage, inner strength, compassion.',
			'reversed': 'Weakness, inner conflicts, self-doubt.',
		},
		{
			'name': '``IX``: *The Hermit* 🏔️',
			'upright': 'Solitude, inner reflection, wisdom.',
			'reversed': 'Isolation, withdrawal, loneliness.',
		},
		{
			'name': '``X``: *Wheel of Fortune* 🎡',
			'upright': 'Luck, change, destiny.',
			'reversed': 'Misfortune, cycles, chaos.',
		},
		{
			'name': '``XI``: *Justice* ⚖️',
			'upright': 'Fairness, balance, truth.',
			'reversed': 'Injustice, legal issues, unfairness.',
		},
		{
			'name': '``XII``: *The Hanged Man* 🌀',
			'upright': 'Surrender, sacrifice, new perspectives.',
			'reversed': 'Stagnation, indecision, feeling trapped.',
		},
		{
			'name': '``XIII``: *Death* 💀',
			'upright': 'Transformation, rebirth, endings.',
			'reversed': 'Resistance to change, stagnation, decay.',
		},
		{
			'name': '``XIV``: *Temperance* ❄️',
			'upright': 'Balance, harmony, moderation.',
			'reversed': 'Imbalance, excess, conflict.',
		},
		{
			'name': '``XV``: *The Devil* 🔗',
			'upright': 'Release, liberation, overcoming vices.',
			'reversed': 'Temptation, addiction, or being trapped by unhealthy patterns.',
		},
		{
			'name': '``XVI``: *The Tower* ⚡',
			'upright': 'Sudden change, liberation, chaos.',
			'reversed': 'Disaster, resistance to change, chaos.',
		},
		{
			'name': '``XVII``: *The Star* 🌟',
			'upright': 'Hope, inspiration, guidance.',
			'reversed': 'Lost hope, despair, lack of inspiration.',
		},
		{
			'name': '``XVIII``: *The Moon* 🌙',
			'upright': 'Illusions, intuition, inner turmoil.',
			'reversed': 'Deception, confusion, anxiety.',
		},
		{
			'name': '``XIX``: *The Sun* ☀️',
			'upright': 'Joy, success, enlightenment.',
			'reversed': 'Lack of clarity, ego, overconfidence.',
		},
		{
			'name': '``XX``: *Judgment* 🎺',
			'upright': 'Rebirth, redemption, awakening.',
			'reversed': 'Regret, refusal to change, denial.',
		},
		{
			'name': '``XXI``: *The World* 🌍',
			'upright': 'Completion, fulfillment, achievement.',
			'reversed': ' Incompletion, unfinished business, stagnation.',
		},
	],
	'minor': [
		{
			'name': 'Ace of Cups 💧',
			'description': 'Emotional beginnings, love, pure feelings.',
		},
		{
			'name': 'Two of Cups 💧',
			'description': 'Partnerships, unity, deep connections.',
		},
		{
			'name': 'Three of Cups 💧',
			'description': 'Joy, celebration, friendships.',
		},
		{
			'name': 'Four of Cups 💧',
			'description': 'Contemplation, introspection, missed opportunities.',
		},
		{
			'name': 'Five of Cups 💧',
			'description': 'Loss, grief, regret.',
		},
		{
			'name': 'Six of Cups 💧',
			'description': 'Nostalgia, innocence, memories.',
		},
		{
			'name': 'Seven of Cups 💧',
			'description': 'Choices, dreams, illusions.',
		},
		{
			'name': 'Eight of Cups 💧',
			'description': 'Abandonment, seeking a higher purpose, moving on.',
		},
		{
			'name': 'Nine of Cups 💧',
			'description': 'Wishes fulfilled, contentment, satisfaction.',
		},
		{
			'name': 'Ten of Cups 💧',
			'description': 'Harmony, emotional fulfillment, happy families.',
		},
		{
			'name': 'Page of Cups 💧',
			'description': 'Imagination, artistic expression, emotional beginnings.',
		},
		{
			'name': 'Knight of Cups 💧',
			'description': 'Romance, chivalry, following the heart.',
		},
		{
			'name': 'Queen of Cups 💧',
			'description': 'Empathy, intuition, emotional depth.',
		},
		{
			'name': 'King of Cups 💧',
			'description': 'Compassion, emotional mastery, wisdom.',
		},
		{
			'name': 'Ace of Pentacles 💰',
			'description': ' New opportunities, financial growth, stability.',
		},
		{
			'name': 'Two of Pentacles 💰',
			'description': 'Balance, juggling priorities, adaptability.',
		},
		{
			'name': 'Three of Pentacles 💰',
			'description': 'Collaboration, craftsmanship, skill development.',
		},
		{
			'name': 'Four of Pentacles 💰',
			'description': 'Financial security, possessiveness, conservatism.',
		},
		{
			'name': 'Five of Pentacles 💰',
			'description': 'Hardship, poverty, material loss.',
		},
		{
			'name': 'Six of Pentacles 💰',
			'description': 'Generosity, charity, giving and receiving.',
		},
		{
			'name': 'Seven of Pentacles 💰',
			'description': 'Evaluation, patience, reaping what you\'ve sown.',
		},
		{
			'name': 'Eight of Pentacles 💰',
			'description': 'Dedication, craftsmanship, attention to detail.',
		},
		{
			'name': 'Nine of Pentacles 💰',
			'description': 'Self-sufficiency, luxury, material well-being.',
		},
		{
			'name': 'Ten of Pentacles 💰',
			'description': 'Legacy, family wealth, financial abundance.',
		},
		{
			'name': 'Page of Pentacles 💰',
			'description': 'New opportunities, practicality, learning.',
		},
		{
			'name': 'Knight of Pentacles 💰',
			'description': 'Responsibility, dedication, reliability.',
		},
		{
			'name': 'Queen of Pentacles 💰',
			'description': 'Nurturing, abundance, practical wisdom.',
		},
		{
			'name': 'King of Pentacles 💰',
			'description': 'Financial acumen, stability, material success.',
		},
		{
			'name': 'Ace of Swords 🗡️',
			'description': 'Clarity, truth, a breakthrough.',
		},
		{
			'name': 'Two of Swords 🗡️',
			'description': 'Choices, indecision, balancing opposing forces.',
		},
		{
			'name': 'Three of Swords 🗡️',
			'description': 'Heartbreak, sorrow, emotional pain.',
		},
		{
			'name': 'Four of Swords 🗡️',
			'description': 'Rest, recuperation, contemplation.',
		},
		{
			'name': 'Five of Swords 🗡️',
			'description': 'Defeat, conflict, winning at a cost.',
		},
		{
			'name': 'Six of Swords 🗡️',
			'description': 'Transition, moving forward, recovery.',
		},
		{
			'name': 'Seven of Swords 🗡️',
			'description': 'Deception, sneakiness, avoiding conflict.',
		},
		{
			'name': 'Eight of Swords 🗡️',
			'description': 'Feeling trapped, self-imposed limitations, a need for liberation.',
		},
		{
			'name': 'Nine of Swords 🗡️',
			'description': 'Anxiety, nightmares, inner turmoil.',
		},
		{
			'name': 'Ten of Swords 🗡️',
			'description': 'Rock bottom, betrayal, hitting a breaking point.',
		},
		{
			'name': 'Page of Swords 🗡️',
			'description': 'Curiosity, honesty, learning.',
		},
		{
			'name': 'Knight of Swords 🗡️',
			'description': 'Ambition, determination, swift action.',
		},
		{
			'name': 'Queen of Swords 🗡️',
			'description': 'Clarity, resilience, intellectual strength.',
		},
		{
			'name': 'King of Swords 🗡️',
			'description': 'Authority, logic, fair judgment.',
		},
		{
			'name': 'Ace of Wands 🔥',
			'description': 'Creative inspiration, new opportunities, a burst of energy.',
		},
		{
			'name': 'Two of Wands 🔥',
			'description': 'Planning, choices, exploration.',
		},
		{
			'name': 'Three of Wands 🔥',
			'description': 'Expansion, progress, foresight.',
		},
		{
			'name': 'Four of Wands 🔥',
			'description': 'Celebration, harmony, a significant event.',
		},
		{
			'name': 'Five of Wands 🔥',
			'description': 'Competition, conflict, rivalry.',
		},
		{
			'name': 'Six of Wands 🔥',
			'description': 'Victory, recognition, achievements.',
		},
		{
			'name': 'Seven of Wands 🔥',
			'description': 'Courage, perseverance, standing your ground.',
		},
		{
			'name': 'Eight of Wands 🔥',
			'description': 'Swiftness, rapid progress, communication.',
		},
		{
			'name': 'Nine of Wands 🔥',
			'description': 'Resilience, perseverance, inner strength.',
		},
		{
			'name': 'Ten of Wands 🔥',
			'description': 'Burden, responsibility, hard work.',
		},
		{
			'name': 'Page of Wands 🔥',
			'description': 'Enthusiasm, exploration, new ideas.',
		},
		{
			'name': 'Knight of Wands 🔥',
			'description': 'Determination, adventure, leadership.',
		},
		{
			'name': 'Queen of Wands 🔥',
			'description': 'Charisma, confidence, influence.',
		},
		{
			'name': 'King of Wands 🔥',
			'description': 'Authority, vision, bold action.',
		},
	],
};

function card_to_text(deck, uprightChance) {
	return deck.map((card) => {
		if (card.description) {
			// Minor arcana have a "description" field
			return `* **${card.name}**: ${card.description}`;
		}
		else {
			// Major Arcana don't
			const upright = Math.random() < uprightChance;
			return `* **${card.name}${upright ? '' : ' *(Reversed)*'}:** ${upright ? card.upright : card.reversed}`;
		}
	}).join('\n');
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('tarot')
		.setDescription('Draws tarot cards to describe a scene.')
		.addIntegerOption(option =>
			option.setName('cards').setDescription('How many cards will you draw?')
				.setRequired(true)
				.setMinValue(1)
				.setMaxValue(5)
				.addChoices(
					{ name: '1', value: 1 },
					{ name: '2', value: 2 },
					{ name: '3', value: 3 },
					{ name: '4', value: 4 },
					{ name: '5', value: 5 },
				))
		.addIntegerOption(option =>
			option.setName('mode').setDescription('How should we draw the Major Arcana? Default: Normal Draw.')
				.setRequired(true)
				.setMinValue(0)
				.setMaxValue(5)
				.addChoices(
					{ name: 'Normal', value: 0 },
					{ name: 'Only Minor', value: 1 },
					{ name: 'Only Arcana', value: 2 },
					{ name: 'Only Upright Arcana', value: 3 },
					{ name: 'Only Reversed Arcana', value: 4 },
				)),
	async execute(interaction) {
		let cardsToDraw = interaction.options.getInteger('cards', true);
		const mode = interaction.options.getInteger('mode', false);

		let uprightChance = 0.5;
		let deck = [];

		switch (mode) {
		case 1:
			deck = deck.concat(arcana.minor);
			break;
		case 2:
			deck = deck.concat(arcana.major);
			break;
		case 3:
			deck = deck.concat(arcana.major);
			uprightChance = 1;
			break;
		case 4:
			deck = deck.concat(arcana.major);
			uprightChance = 0;
			break;
		case 0:
		default:
			uprightChance = 0.5;
			deck = deck.concat(arcana.major, arcana.minor);
		}

		let tempCard;
		const cards = [];

		while (cardsToDraw-- > 0) {
			tempCard = GetRandomFromList(deck);
			deck = RemoveItemFromList(deck, tempCard);
			cards.push(tempCard);
		}

		const response = '**Result:**\n' + card_to_text(cards, uprightChance);

		await interaction.reply({
			content: response,
		});
	},
};