var utils = require('./utils');

var diceRegex = /^ *(-)?(\d+)?/i;

function DoFURolls(amount, keepHighest) {
  var result = keepHighest ? 1 : 6;
  var allDice = [];
  var current;
  for (var i = 0; i < amount; ++i) {
    current = utils.D6();
    allDice.push(current.val);
    if (keepHighest) {
      result = (result < current.val) ? current.val : result;
    } else {
      result = (result > current.val) ? current.val : result;
    }
  }
  
  switch (result) {
    case 6:
      return {'icon': ":white_check_mark: :white_check_mark:", 'str': "Yes, and...!", 'dice': allDice};
    case 5:
      return {'icon': ":white_check_mark:", 'str': "Yes.", 'dice': allDice};
    case 4:
      return {'icon': ":white_check_mark: :negative_squared_cross_mark:", 'str': "Yes, but...", 'dice': allDice};
    case 3:
      return {'icon': ":negative_squared_cross_mark: :white_check_mark:", 'str': "No, but...!", 'dice': allDice};
    case 2:
      return {'icon': ":negative_squared_cross_mark:", 'str': "No.", 'dice': allDice};
    case 1:
      return {'icon': ":negative_squared_cross_mark: :negative_squared_cross_mark:", 'str': "No, and...", 'dice': allDice};
  }
}

module.exports = function (args, message) {
  var results = diceRegex.exec(args);
  var diceAmount = results[2] ? Math.min(results[2], 10) : 1;
  var keepHighest = results[1] === undefined ? true : false;
  
  results = DoFURolls(diceAmount, keepHighest);
  
  var reply = "Rolling [" +  diceAmount + "] " + (keepHighest ? "" : "negative ") + "FU dice. Your result:\n\n`";
  
  for (var i = 0; i < results.dice.length; ++i) {
    reply += results.dice[i] + " "; 
  }
  reply += "`\n\n"+results.icon+"\n\n**"+results.str+"**";
  
  return reply;
}