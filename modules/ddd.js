var utils = require('utils');

module.exports = function () {
   var diceOne = utils.D6();
   var diceTwo = utils.D6();
   return "**Rolling** 2d6:\n\n"
    + diceOne.str + " " + diceTwo.str
    + "\n\n**Total:** " + (diceOne.val + diceTwo.val);
}