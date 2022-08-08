const utils = require('./utils');
const diceRegex = /^ *(-)?(\d+)?/i;
const questionRegex = /^Hey NitroBot, +¿?.+\?/i;

function DoFURolls(amount, keepHighest) {
  let result = keepHighest ? 1 : 6;
  const allDice = [];
  let current;
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

function FU(args, message) {
  let results = diceRegex.exec(args);
  const diceAmount = results[2] ? Math.min(results[2], 10) : 1;
  const keepHighest = results[1] === undefined ? true : false;
  
  results = DoFURolls(diceAmount, keepHighest);
  let reply = "Rolling [" +  diceAmount + "] " + (keepHighest ? "" : "negative ") + "FU dice: `";
  
  for (var i = 0; i < results.dice.length; ++i) {
    reply += results.dice[i] + " "; 
  }
  reply += "`\n\n"+results.icon+"** - "+results.str+"**";
  
  message.delete({ timeout: 100 }).catch((reason) => {});
  
  return reply;
}

function FU_Alternative(message) {
  return FU("1", message);
}

module.exports = {
  'reply': {
      'fu' :  FU,
  },
  'send': {
    
  },
  'internal': {
    
  },
  'direct': [
    {'regex': questionRegex, 'function': FU_Alternative, 'type': 'reply'}
  ],
  'help' : "fu {n} = Rolls n Freeform Unlimited dice. [Example: -fu, -fu 2]"
}