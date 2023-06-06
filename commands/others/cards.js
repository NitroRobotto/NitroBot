const { SlashCommandBuilder } = require('discord.js');

const suitValues = {
	'♣': 107,
	'♦': 97,
	'♥': 75,
	'♠': 65,
	'🃏': 90,
};

function decimalToHex(d, padding) {
	let hex = Number(d).toString(16);
	padding = typeof (padding) === 'undefined' || padding === null ? padding = 2 : padding;

	while (hex.length < padding) {
		hex = '0' + hex;
	}

	return hex;
}

function hexToDecimal(d) {
	return parseInt(d, 16);
}

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

	// Shuffle the deck using Fisher-Yates algorithm
	for (let i = deck.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[deck[i], deck[j]] = [deck[j], deck[i]];
	}

	return deck;
}

// Compress a deck into a string representation
function compressDeck(deck) {
	return deck.map(card => `${decimalToHex(suitValues[card.suit] + card.rank - 1, 2)}`).join('');
}

// Uncompress a deck from a string representation
function uncompressDeck(compressedDeck) {
	const uncompressedDeck = [];

	for (let i = 0; i <= compressedDeck.length; i += 2)	{
		const rank = hexToDecimal(compressedDeck.slice(i, i + 2));
		if (rank == 90) {
			uncompressedDeck.push({ suit: '🃏', rank: 1 });
		} else if (rank >= suitValues['♣']) {
			uncompressedDeck.push({ suit: '♣', rank: rank - suitValues['♣'] + 1 });
		} else if (rank >= suitValues['♦']) {
			uncompressedDeck.push({ suit: '♦', rank: rank - suitValues['♦'] + 1 });
		} else if (rank >= suitValues['♥']) {
			uncompressedDeck.push({ suit: '♥', rank: rank - suitValues['♥'] + 1 });
		} else if (rank >= suitValues['♠']) {
			uncompressedDeck.push({ suit: '♠', rank: rank - suitValues['♠'] + 1 });
		}
	}

	return uncompressedDeck;
}

function cardArrayToString(deck) {
	return deck.map(card => `${card.rank}${card.suit}`).join(' ');
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
		let deck = deckString ? uncompressDeck(deckString) : generateDeck();

		const cards = cardArrayToString(deck.slice(0, drawCount < deck.length ? drawCount : deck.length));
		deck = deck.slice(drawCount);

		let response = `Hand: ${cards}`;
		if (deck.length > 0) {
			response += `\nDeck Code *(use it when drawing more cards from this same deck)*: ${compressDeck(deck)}`
		}


		await interaction.reply({
			content: response,
		});
	},
};