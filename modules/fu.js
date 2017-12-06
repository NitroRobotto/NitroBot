var utils = require('utils');

var diceRegex = /^ *(\d+)?/i;

function DoFURolls(amount) {
  var highest = 1;
  var current;
  for (var i = 0; i < amount; ++i) {
    current = utils.D6();
    highest = (highest < current.val) ? current.val : highest;
  }
  switch (highest) {
    case 6:
      return {'icon': ":white_check_mark: :white_check_mark:", 'str': "Yes, and...!"};
    case 5:
      return {'icon': ":white_check_mark:", 'str': "Yes."};
    case 4:
      return {'icon': ":white_check_mark: :negative_squared_cross_mark:", 'str': "Yes, but..."};
    case 3:
      return {'icon': ":negative_squared_cross_mark: :white_check_mark:", 'str': "No, but...!"};
    case 2:
      return {'icon': ":negative_squared_cross_mark:", 'str': "No."};
    case 1:
      return {'icon': ":negative_squared_cross_mark: :negative_squared_cross_mark:", 'str': "No, and..."};
  }
}

module.exports = function (args, message) {
  var results = diceRegex.exec(args);
  var diceAmount = results[1] ? Math.min(results[1], 10) : 1;
  
  results = DoFURolls(diceAmount);
  
  return "Rolling [" + diceAmount + "] FU dice. Your result:\n\n"+results.icon+"\n\n**"+results.str+"**";
}