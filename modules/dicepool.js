const utils = require('./utils');
const diceRegex = /^ *(\d+) *(\d*) *(\d*)/i;

function rollPool(faces) {
    let results = "";
    while (faces > 0) {
        let roll = utils.D6();
        if (roll.val < 6) faces -= 1;
        results += `${roll.str} `;
    }
    return results;
}

function rollDicePool(params, msg) {
    const regexResult = diceRegex.exec(params);
    const poolOne = regexResult[1] ? Math.min(regexResult[1], 10) : null;
    const poolTwo = regexResult[2] ? Math.min(regexResult[2], 10) : null;
    const poolThree = regexResult[3] ? Math.min(regexResult[3], 10) : null;

    if (poolOne === null) return "You need to roll at least one pool.";
	
	let results = `**Rolling dice pools:** ${params}\n\n`;
    results += `:muscle: **:** ${rollPool(poolOne)}\n`;
    if (poolTwo !== null) {
        results += `:heart: **:** ${rollPool(poolTwo)}\n`;
    }
    if (poolThree !== null) {
        results += `:bulb: **:** ${rollPool(poolThree)}\n`;
    }
	
	msg.delete({ timeout: 100 }).catch((reason) => {});
	
    return results;
}

module.exports = {
  'reply': {
      'dicepool' : rollDicePool
  },
  'send': {
      
  },
  'internal': {
      
  },
  'direct': [
      
    ],
  'help': "dicepool {body} {heart} {mind}: Roll your dice pools. If heart or mind are missing, the result will be a generic dice pool."
}