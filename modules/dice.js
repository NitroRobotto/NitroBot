var utils = require('./utils');

function butts(parameter) {
    var modifier = parseInt(parameter);
    if (!modifier) {
        modifier = 0;
    }
    
    var diceOne = utils.D6();
    var diceTwo = utils.D6();
    return "**Result:** " + diceOne.val + " -" + diceTwo.val + (modifier != 0 ? (modifier < 0 ? " " : " +") + modifier : '') + " = **[" + (diceOne.val - diceTwo.val + modifier) + "]**";
}

module.exports = {
   'Butts' : butts
}