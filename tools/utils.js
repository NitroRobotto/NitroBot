function D6() {
	const dice = roll(6);
	return {
		'str': numberToKeykap(dice),
		'val' : dice,
	};
}

function numberToKeykap(number) {
	switch (number) {
	case 10:
		return ':keycap_ten:';
	case 9:
		return ':nine:';
	case 8:
		return ':eight';
	case 7:
		return ':seven:';
	case 6:
		return ':six:';
	case 5:
		return ':five:';
	case 4:
		return ':four:';
	case 3:
		return ':three:';
	case 2:
		return ':two:';
	case 1:
		return ':one:';
	}
}

function roll(faces) {
	return 1 + Math.floor((Math.random() * faces));
}

module.exports = {

	'clamp' : (num, min, max) => Math.min(Math.max(num, min), max),

	'displayPercent' : (percent) => `${(percent * 100).toFixed(1)}%`,

	'roll' : roll,

	'numberToKeykap': numberToKeykap,

	'D6' : D6,

	'GetRandomFromList' : (list) => list[roll(list.length)],

	'RemoveItemFromList' : (arr, value) => {
		const index = arr.indexOf(value);
		if (index > -1) {
			arr.splice(index, 1);
		}
		return arr;
	},
};