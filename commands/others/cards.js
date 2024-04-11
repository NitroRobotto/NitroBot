const { SlashCommandBuilder } = require('discord.js');

const suitValues = {
	'♣': 0,
	'♦': 10,
	'♥': 20,
	'♠': 30,
	'🃏': 40,
};

const suitArray = ['♣', '♦', '♥', '♠', '🃏'];

// Generate a default poker deck
function generateDeck() {
	const ranks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	const suits = ['♠', '♥', '♦', '♣'];
	const deck = [];
	for (const suit of suits) {
		for (const rank of ranks) {
			deck.push({ suit: suit, rank: rank });
		}
	}

	// Add jokers to the deck
	deck.push({ suit: '🃏', rank: 1 });
	deck.push({ suit: '🃏', rank: 2 });

	return shuffle(deck);
}

// Shuffle the deck using Fisher-Yates algorithm
function shuffle(deck) {
	for (let i = deck.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[deck[i], deck[j]] = [deck[j], deck[i]];
	}

	return deck;
}

/**
 * Compresses a deck into a byte buffer.
 * @param {suit, rank} deck The uncompressed deck.
 * @returns A buffer containing the deck as bytes.
 */
function compressDeck(deck) {
	const buffer = Buffer.alloc(6);

	for (const card of deck) {
		const cardIndex = suitValues[card.suit] + (card.rank - 1);
		const byteIndex = Math.floor(cardIndex / 8);
		const bitIndex = cardIndex % 8;

		buffer[byteIndex] |= (1 << bitIndex);
	}

	return buffer;
}

/**
 * Uncompress a deck from a buffer.
 * @param {Buffer} compressedDeck A byte array of the deck.
 * @returns Array of { suit: string, rank:integer }
 */
function uncompressDeck(compressedDeck) {
	const uncompressedDeck = [];

	for (let cardIndex = 0; cardIndex < compressedDeck.length * 8; cardIndex++) {
		const byteIndex = Math.floor(cardIndex / 8);
		const bitIndex = cardIndex % 8;

		if ((compressedDeck[byteIndex] & (1 << bitIndex))) {
			uncompressedDeck.push({ suit: suitArray[Math.floor(cardIndex / 10)], rank: (cardIndex % 10) + 1 });
		}
	}

	return shuffle(uncompressedDeck);
}

function cardArrayToString(deck) {
	return deck.map(card => (card.suit == '🃏' ? '|🃏|' : `|${card.rank}${card.suit}|`)).join(' ');
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('draw')
		.setDescription('Draws cards from a deck of 42 cards: ♥♦♣♠ ranked from 1 to 10, and two jokers.')
		.addIntegerOption(option =>
			option.setName('cards').setDescription('How many cards will you draw?')
				.setRequired(true)
				.setMinValue(1)
				.setMaxValue(10)
				.addChoices(
					{ name: '1', value: 1 },
					{ name: '2', value: 2 },
					{ name: '3', value: 3 },
					{ name: '4', value: 4 },
					{ name: '5', value: 5 },
					{ name: '6', value: 6 },
					{ name: '7', value: 7 },
					{ name: '8', value: 8 },
					{ name: '9', value: 9 },
					{ name: '10', value: 10 },
				))
		.addStringOption(option =>
			option.setName('deck').setDescription('The deck code changes every time you draw cards.')),
	async execute(interaction) {
		const drawCount = interaction.options.getInteger('cards', true);
		const deckString = interaction.options.getString('deck', false);

		const deck = deckString ? uncompressDeck(Buffer.from(deckString, 'base64')) : generateDeck();
		const cards = cardArrayToString(deck.slice(0, drawCount < deck.length ? drawCount : deck.length));

		let response = `**Your Hand:** \`\`${cards}\`\``;
		if (deck.length > drawCount) {
			response += `\n*Deck Code:* \`\`${compressDeck(deck.slice(drawCount)).toString('base64')}\`\``;
		}

		await interaction.reply({
			content: response,
		});
	},
};