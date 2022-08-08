var utils = require('./utils');

var diceRegex = /^ *d?(\d+) *d?(\d+) *(.*)/i;

function FabulaCrit(args, message) {
  let results = diceRegex.exec(args);
  if (results.length < 2) {
    return "Fabula Rolls require two dice (e.g. ``fabula d6 d8``)."
  }
  
  const smallDice = utils.clamp(Math.min(results[1], results[2]), 2, 20);
  const bigDice = utils.clamp(Math.max(results[1], results[2]), 2, 20);

  let fumble = 0; // equal dice, 1
  let crit = 0; //equal dice, 6+
  let easy = 0; //7+
  let normal = 0; //10+
  let hard = 0; //13+
  let veryHard = 0; //16+

  let possibilities = bigDice*smallDice;

  for (let diceA = 1; diceA <= bigDice; ++diceA) {
    for (let diceB = 1; diceB <= smallDice; ++diceB) {
      if (diceA == diceB) {
        // Crits & fumbles
        if (diceA == 1) ++fumble;
        else if (diceA >= 6) ++crit;
      }
      // Hitting Difficulties
      if ((diceA + diceB) >= 16) ++veryHard;
      if ((diceA + diceB) >= 13) ++hard;
      if ((diceA + diceB) >= 10) ++normal;
      if ((diceA + diceB) >= 7) ++easy;
    }
  }

  /*
  // Chance of getting a specific number * chance of geteting a specific number.
  var fumbleChance = (1/results[1]) * (1/results[2])
  // Chance of getting any number of 6+ * chance of getting a specific number.

  var critChance = (Math.max(0,smallDice-5)/smallDice) * 1/bigDice
  */
  return "With d"+bigDice+" + d"+smallDice+", your odds are:" + 
        "\n\t- Critical Success: " + utils.displayPercent(crit/possibilities) +
        "\n\t- Fumble: " + utils.displayPercent(fumble/possibilities) +
        "\n\t- Easy Task: " + utils.displayPercent(easy/possibilities) +
        "\n\t- Normal Task: " + utils.displayPercent(normal/possibilities) +
        "\n\t- Hard Task: " + utils.displayPercent(hard/possibilities) +
        "\n\t- Very Hard Task: " + utils.displayPercent(veryHard/possibilities);
}
function FabulaRoll(args, message) {
  var results = diceRegex.exec(args);
  if (results.length < 2) {
    return "Fabula Rolls require two dice (e.g. ``fabula d6 d8``)."
  }
  var firstDiceFaces = utils.clamp(results[1], 2, 20)
  var secondDiceFaces = utils.clamp(results[2], 2, 20)

  var firstDice = utils.roll(firstDiceFaces);
  var secondDice = utils.roll(secondDiceFaces);
  var total = firstDice + secondDice
  var critical = (firstDice == secondDice) && (firstDice >= 6)
  var botch = (firstDice == 1) && (secondDice == 1)

  // Header
  var reply = "Rolled Fabula Ultima dice (d"+firstDiceFaces+" + d"+secondDiceFaces+"): " + results[3] + "\n";

  // Dice
  if (critical || botch) reply += "\t\t\t【**" +  firstDice + "**】+【**" + secondDice + "**】= **" + total + "**\n" 
  else reply += "\t\t\t【" +  firstDice + "】+【" + secondDice + "】 = **" + total + "**\n"

  // Total

  if (botch) {
    reply += "***Fumble!***\nThe action automatically fails, you gain 1 **Fabula Point**, and the opposition gets an **Opportunity**.\n"
  } else if (critical) {
    reply += "***Critical Success!***\nThe action automatically succeeds, and you get an **Opportunity**!\n"
  } else {
    if (total < 7) reply += "*Bad...*";
    else if (total < 10) reply += "*Poor* *(Success vs Easy)*";
    else if (total < 13) reply += "Good *(Success vs Normal)*";
    else if (total < 16) reply += "**Excelent!** *(Success vs Hard)*";
    else reply += "***Incredible!!!*** *(Success vs Very Hard)*";
  }

  message.delete({ timeout: 100 }).catch((reason) => {});
  
  return reply;
}

module.exports = {
  'reply': {
      'fabula' :  FabulaRoll,
      'fa' : FabulaRoll,
      'fabulastats' : FabulaCrit
  },
  'send': {},
  'internal': {},
  'direct': [],
  'help' : "fabula {a} {b} = Rolls fabula dice with the specified faces. [Example: ``-fabula 6 8``, ``-fa d6 d8 MIG+STR``]\n"+
            "fabulastats {a} {b} = Tells you the likelihood to get a critical success or a fumble with those two dice."
}