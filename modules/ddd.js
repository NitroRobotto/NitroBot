var utils = require('./utils');

function DDD() {
   var diceOne = utils.D6();
   var diceTwo = utils.D6();
   return "**Rolling** 2d6:\n\n"
    + diceOne.str + " " + diceTwo.str
    + "\n\n**Total:** " + (diceOne.val + diceTwo.val);
}

module.exports = {
  'reply': {
      'ddd' : DDD,
      '2d6': DDD
  },
  'send': {},
  'internal': {},
  'direct': [],
  'help': "2d6 = Rolls 2d6 and adds them together. [Example: -2d6,-ddd]."
}