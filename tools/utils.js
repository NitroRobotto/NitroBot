module.exports = {

	'clamp' : (num, min, max) => Math.min(Math.max(num, min), max),

	'displayPercent' : (percent) => `${(percent * 100).toFixed(1)}%`,

	'roll' : function(faces) {
		return 1 + Math.floor((Math.random() * faces));
	},

	'D6' : function() {
		const response = {
			'str': '',
			'val' : 1 + Math.floor((Math.random() * 6)),
		};

		switch (response.val) {
		case 6:
			response.str = ':six:';
			break;
		case 5:
			response.str = ':five:';
			break;
		case 4:
			response.str = ':four:';
			break;
		case 3:
			response.str = ':three:';
			break;
		case 2:
			response.str = ':two:';
			break;
		case 1:
			response.str = ':one:';
			break;
		}

		return response;
	},
	'GetRandomFromList' : function(list) {
		return list[Math.floor(Math.random() * list.length)];
	},
	'RemoveItemFromList' : function(arr, value) {
		const index = arr.indexOf(value);
		if (index > -1) {
			arr.splice(index, 1);
		}
		return arr;
	},
};