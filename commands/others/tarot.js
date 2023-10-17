const { SlashCommandBuilder } = require('discord.js');

const arcana = {
	'major': [
		{
			'name': '0: The Fool',
			'upright': 'Unexpected opportunities or discoveries.',
			'reversed': 'Poor judgment or recklessness leading to setbacks.',
		},
		{
			'name': 'I: The Magician',
			'upright': 'Mastery of skills or resources to achieve goals.',
			'reversed': 'Manipulation or misuse of power causing obstacles.',
		},
		{
			'name': 'II: The High Priestess',
			'upright': 'Intuition and hidden knowledge guiding the way.',
			'reversed': 'Ignoring instincts or failing to see the truth.',
		},
		{
			'name': 'III: The Empress',
			'upright': 'Abundance, creativity, and nurturing support.',
			'reversed': 'Overindulgence or lack of nurturing leading to depletion.',
		},
		{
			'name': 'IV: The Emperor',
			'upright': 'Authority, structure, and order.',
			'reversed': 'Tyranny, control, or lack of leadership.',
		},
		{
			'name': 'V: The Hierophant',
			'upright': 'Wisdom, tradition, and guidance from mentors.',
			'reversed': 'Rebellion against traditions or dogmatic thinking.',
		},
		{
			'name': 'VI: The Lovers',
			'upright': 'Deep connections, harmony, and choices aligned with love.',
			'reversed': 'Disharmony, difficult choices, or strained relationships.',
		},
		{
			'name': 'VII: The Chariot',
			'upright': 'Determination, victory, and overcoming obstacles.',
			'reversed': 'Lack of direction, conflicts, or feeling stuck.',
		},
		{
			'name': 'VIII: Strength',
			'upright': 'Inner strength, courage, and resilience.',
			'reversed': 'Lack of confidence or struggle to overcome challenges.',
		},
		{
			'name': 'IX: The Hermit',
			'upright': 'Solitude, reflection, and seeking inner guidance.',
			'reversed': 'Isolation, withdrawal, or feeling lost without direction.',
		},
		{
			'name': 'X: Wheel of Fortune',
			'upright': 'Favorable changes, luck, and positive outcomes.',
			'reversed': 'Unexpected setbacks or cycles of misfortune.',
		},
		{
			'name': 'XI: Justice',
			'upright': 'Fairness, balance, and resolution of conflicts.',
			'reversed': 'Injustice, legal issues, or imbalances in decision-making.',
		},
		{
			'name': 'XII: The Hanged Man',
			'upright': 'Sacrifice, letting go, and gaining new perspectives.',
			'reversed': 'Feeling stuck, resistance to change, or delays.',
		},
		{
			'name': 'XIII: Death',
			'upright': 'Transformation, rebirth, and embracing new beginnings.',
			'reversed': 'Fear of change, stagnation, or inability to let go.',
		},
		{
			'name': 'XIV: Temperance',
			'upright': 'Balance, moderation, and harmony in all aspects.',
			'reversed': 'Imbalance, extremes, or lack of patience.',
		},
		{
			'name': 'XV: The Devil',
			'upright': 'Awareness of desires, self-empowerment, and breaking free.',
			'reversed': 'Temptation, addiction, or being trapped by unhealthy patterns.',
		},
		{
			'name': 'XVI: The Tower',
			'upright': 'Sudden change, liberation, and breaking through illusions.',
			'reversed': 'Resistance to change, avoiding necessary upheaval, or prolonged chaos.',
		},
		{
			'name': 'XVII: The Star',
			'upright': 'Hope, inspiration, and healing after difficult times.',
			'reversed': 'Lack of faith, pessimism, or feeling lost in darkness.',
		},
		{
			'name': 'XVIII: The Moon',
			'upright': 'Intuition, dreams, and navigating the subconscious.',
			'reversed': 'Deception, confusion, or being lost in illusions.',
		},
		{
			'name': 'XIX: The Sun',
			'upright': 'Joy, vitality, and success in all endeavors.',
			'reversed': 'Temporary setbacks, lack of clarity, or overshadowed happiness.',
		},
		{
			'name': 'XX: Judgment',
			'upright': 'Awakening, renewal, and a fresh start.',
			'reversed': 'Self-doubt, avoidance of self-reflection, or missed opportunities.',
		},
		{
			'XXI: name': 'The World',
			'upright': 'Completion, fulfillment, and integration of all aspects.',
			'reversed': 'Lack of closure, unfinished tasks, or feeling stuck in a cycle.',
		},
	],
	'minor': [
		[
			{
				'name': 'Ace of Cups',
				'description': 'New emotional connections, creative inspiration, or a fresh start in relationships.',
			},
			{
				'name': 'Two of Cups',
				'description': 'Harmonious partnerships, balanced relationships, or mutual love and support.',
			},
			{
				'name': 'Three of Cups',
				'description': 'Celebration, friendship, or joyful gatherings.',
			},
			{
				'name': 'Four of Cups',
				'description': 'Contemplation, introspection, or missed opportunities due to complacency.',
			},
			{
				'name': 'Five of Cups',
				'description': 'Loss, disappointment, or grief.',
			},
			{
				'name': 'Six of Cups',
				'description': 'Nostalgia, innocence, or reconnecting with pleasant memories.',
			},
			{
				'name': 'Seven of Cups',
				'description': 'Choices, dreams, or illusions.',
			},
			{
				'name': 'Eight of Cups',
				'description': 'Soul-searching, leaving behind the familiar, or embarking on a spiritual journey.',
			},
			{
				'name': 'Nine of Cups',
				'description': 'Wishes fulfilled, contentment, or emotional satisfaction.',
			},
			{
				'name': 'Ten of Cups',
				'description': 'Domestic harmony, fulfillment in relationships, or a happy family life.',
			},
			{
				'name': 'Page of Cups',
				'description': 'Emotional messages, intuition, or creative endeavors.',
			},
			{
				'name': 'Knight of Cups',
				'description': 'Romance, chivalry, or pursuing emotional quests.',
			},
			{
				'name': 'Queen of Cups',
				'description': 'Compassion, empathy, or nurturing relationships.',
			},
			{
				'name': 'King of Cups',
				'description': 'Emotional stability, wisdom, or balanced leadership.',
			},
		],
		[
			{
				'name': 'Ace of Pentacles',
				'description': 'New opportunities, material abundance, or the beginning of a prosperous endeavor.',
			},
			{
				'name': 'Two of Pentacles',
				'description': 'Balance, adaptability, or juggling multiple responsibilities.',
			},
			{
				'name': 'Three of Pentacles',
				'description': 'Collaboration, craftsmanship, or recognition for skills and talents.',
			},
			{
				'name': 'Four of Pentacles',
				'description': 'Stability, possessiveness, or holding onto material possessions.',
			},
			{
				'name': 'Five of Pentacles',
				'description': 'Financial hardship, adversity, or seeking assistance.',
			},
			{
				'name': 'Six of Pentacles',
				'description': 'Generosity, charity, or receiving help and support.',
			},
			{
				'name': 'Seven of Pentacles',
				'description': 'Patience, perseverance, or waiting for the fruits of labor.',
			},
			{
				'name': 'Eight of Pentacles',
				'description': 'Dedication, craftsmanship, or skill enhancement.',
			},
			{
				'name': 'Nine of Pentacles',
				'description': 'Financial independence, luxury, or enjoying the rewards of hard work.',
			},
			{
				'name': 'Ten of Pentacles',
				'description': 'Wealth, legacy, or a prosperous and stable family life.',
			},
			{
				'name': 'Page of Pentacles',
				'description': 'Ambition, practicality, or the pursuit of knowledge and skills.',
			},
			{
				'name': 'Knight of Pentacles',
				'description': 'Responsibility, dependability, or steady progress toward goals.',
			},
			{
				'name': 'Queen of Pentacles',
				'description': 'Abundance, practicality, or nurturing and providing for others.',
			},
			{
				'name': 'King of Pentacles',
				'description': 'Prosperity, success, or wise and practical leadership.',
			},
		],
		[
			{
				'name': 'Ace of Swords',
				'description': 'Mental clarity, new ideas, or a breakthrough in communication.',
			},
			{
				'name': 'Two of Swords',
				'description': 'Indecision, stalemate, or the need to make a difficult choice.',
			},
			{
				'name': 'Three of Swords',
				'description': 'Heartbreak, betrayal, or emotional pain.',
			},
			{
				'name': 'Four of Swords',
				'description': 'Rest, recuperation, or temporary retreat for self-reflection.',
			},
			{
				'name': 'Five of Swords',
				'description': 'Conflict, competition, or a need to assert oneself.',
			},
			{
				'name': 'Six of Swords',
				'description': 'Transition, moving on, or finding solace after a challenging time.',
			},
			{
				'name': 'Seven of Swords',
				'description': 'Deception, trickery, or hidden agendas.',
			},
			{
				'name': 'Eight of Swords',
				'description': 'Feeling trapped, self-imposed limitations, or a need for liberation.',
			},
			{
				'name': 'Nine of Swords',
				'description': 'Anxiety, nightmares, or mental anguish.',
			},
			{
				'name': 'Ten of Swords',
				'description': 'Defeat, betrayal, or hitting rock bottom before a fresh start.',
			},
			{
				'name': 'Page of Swords',
				'description': 'Intellectual curiosity, honesty, or seeking the truth.',
			},
			{
				'name': 'Knight of Swords',
				'description': 'Ambition, assertiveness, or taking decisive action.',
			},
			{
				'name': 'Queen of Swords',
				'description': 'Clarity, independence, or using intellect and logic.',
			},
			{
				'name': 'King of Swords',
				'description': 'Intellectual power, leadership, or making fair and just decisions.',
			},
		],
		[
			{
				'name': 'Ace of Wands',
				'description': 'New opportunities, creative inspiration, or the beginning of a passionate endeavor.',
			},
			{
				'name': 'Two of Wands',
				'description': 'Personal power, future planning, or making choices aligned with passions.',
			},
			{
				'name': 'Three of Wands',
				'description': 'Expansion, progress, or seeing one\'s efforts come to fruition.',
			},
			{
				'name': 'Four of Wands',
				'description': 'Celebration, harmony, or a joyous occasion.',
			},
			{
				'name': 'Five of Wands',
				'description': 'Conflict, competition, or a need for compromise.',
			},
			{
				'name': 'Six of Wands',
				'description': 'Victory, recognition, or public acclaim.',
			},
			{
				'name': 'Seven of Wands',
				'description': 'Courage, perseverance, or defending one\'s position.',
			},
			{
				'name': 'Eight of Wands',
				'description': 'Swiftness, progress, or fast-paced developments.',
			},
			{
				'name': 'Nine of Wands',
				'description': 'Resilience, persistence, or the need to protect what\'s been achieved.',
			},
			{
				'name': 'Ten of Wands',
				'description': 'Burden, overextension, or feeling overwhelmed by responsibilities.',
			},
			{
				'name': 'Page of Wands',
				'description': 'Enthusiasm, exploration, or the emergence of new passions.',
			},
			{
				'name': 'Knight of Wands',
				'description': 'Action, adventure, or pursuing one\'s passions boldly.',
			},
			{
				'name': 'Queen of Wands',
				'description': 'Energy, confidence, or embracing leadership roles.',
			},
			{
				'name': 'King of Wands',
				'description': 'Vision, charisma, or utilizing creative and entrepreneurial abilities.',
			},
		],
	],
};

function get_random(list) {
	return list[Math.floor((Math.random() * list.length))];
}

function major_arcana_to_text(deck) {
	return deck.map((card) => {
		const upright = Math.random() < 0.5;
		return `* **${card.name}${upright ? '' : ' *(Reversed)*'}:** ${upright ? card.upright : card.reversed}`;
	}).join('\n');
}

function minor_arcana_to_text(deck) {
	return deck.map((card) => `* **${card.name}**: ${card.description}`).join('\n');
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('tarot')
		.setDescription('Draws tarot cards to describe a scene.')
		.addIntegerOption(option =>
			option.setName('major').setDescription('How many Major Arcana cards will you draw?')
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
			option.setName('minor').setDescription('How many Minor Arcana cards will you draw?')
				.setRequired(true)
				.setMinValue(0)
				.setMaxValue(5)
				.addChoices(
					{ name: '0', value: 0 },
					{ name: '1', value: 1 },
					{ name: '2', value: 2 },
					{ name: '3', value: 3 },
					{ name: '4', value: 4 },
					{ name: '5', value: 5 },
				)),
	async execute(interaction) {
		let majorCards = interaction.options.getInteger('major', true);
		let minorCards = interaction.options.getInteger('minor', true);

		let cards = [];
		let response = '';

		while (majorCards > 0) {
			cards.push(get_random(arcana.major));
			majorCards -= 1;
		}

		response += major_arcana_to_text(cards);

		cards = [];
		while (minorCards > 0) {
			cards.push(get_random(get_random(arcana.minor)));
			minorCards -= 1;
		}
		response += '\n' + minor_arcana_to_text(cards);

		await interaction.reply({
			content: response,
		});
	},
};