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

// Compress a deck into a string representation
function compressDeck(deck) {
	const buffer = Buffer.alloc(6);

	for (const card of deck) {
		const cardIndex = suitValues[card.suit] + (card.rank - 1);
		const byteIndex = Math.floor(cardIndex / 8);
		const bitIndex = cardIndex % 8;

		buffer[byteIndex] |= (1 << bitIndex);
	}

	return buffer.toString('base64');
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
	return deck.map(card => (card.suit == '🃏' ? '🃏' : `${card.rank}${card.suit}`)).join(' ');
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('draw')
		.setDescription('Draws cards from a deck.')
		.addIntegerOption(option =>
			option.setName('cards').setDescription('How many cards will you draw?')
				.setRequired(true)
				.setMinValue(1)
				.setMaxValue(10))
		.addStringOption(option =>
			option.setName('deck').setDescription('Your previous deck, if you had one.')),
	async execute(interaction) {
		const drawCount = interaction.options.getInteger('cards', true);
		const deckString = interaction.options.getString('deck', false);
		let deck = deckString ? uncompressDeck(Buffer.from(deckString, 'base64')) : generateDeck();

		const cards = cardArrayToString(deck.slice(0, drawCount < deck.length ? drawCount : deck.length));
		deck = deck.slice(drawCount);

		let response = `**Your Hand:** \`\`${cards}\`\``;
		if (deck.length > 0) {
			response += `\n*Deck Code:* \`\`${compressDeck(deck)}\`\``;
		}


		await interaction.reply({
			content: response,
		});
	},
};