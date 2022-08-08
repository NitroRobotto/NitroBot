const diceRegex = /^ *(\d+)? *(\d+)? *(.*)?/i;

function DoNovaRolls(amount, critRange) {
  let roll = NovaQuestion(amount, critRange);
  const result = {"novas": roll.novas, "successes": roll.successes, "rolls": [{"dice": amount, "str": roll.string}]};

  while (roll.novas > 0 && result.successes < 30)
  {
    roll = NovaQuestion(roll.novas, critRange);
    result.novas += roll.novas;
    result.successes += roll.successes;
    result.rolls.push({"dice": roll.novas, "str": roll.string});
  }

  return result;
}

function NovaQuestion(amount, critRange) {
  const roll = {
    novas: 0,
    successes: 0,
    string: "",
  }

  for (let i = 0; i < amount; ++i) {
    const diceInt = Math.floor(Math.random() * 6 + 1);

    if (diceInt >= critRange) {
      roll.string += ":eight_spoked_asterisk: ";
      ++roll.novas;
      ++roll.successes;
    } else if (diceInt >= 4) {
      roll.string += ":white_check_mark: ";
      ++roll.successes;
    } else {
      roll.string += ":white_large_square: "
    }
  }

  return roll;
}

function NovaDiceCrit(args, message) {
    let regexResult = diceRegex.exec(args);
    let diceAmount = regexResult[1] ? regexResult[1] : 1;
    let critRange = regexResult[2] ? Math.max(2, regexResult[2]) : 6;

    if (diceAmount > 20) {
      return "No more than 20 dice, please!\nIf you're curious, you would've probably obtained around " + Math.round(diceAmount * 0.5) + " Successes and " + Math.round(diceAmount * 0.19) + " Novas.";
    }

    const novaRoll = DoNovaRolls(diceAmount, critRange);

    let response = `**Rolling **[${diceAmount}]** Nova Dice**`;
    if (critRange < 6) response += ` (Enhanced Crits! ${critRange}+)`
    if (regexResult[3]) response += `: ${regexResult[3]}`;

    for (let explosion = 0; explosion < novaRoll.rolls.length; ++explosion) {
      if (explosion > 0)
      {
        response += `**Rolling **[${novaRoll.rolls[explosion-1].dice}]** Nova Dice`;
        for (let exclamation = 0; exclamation < explosion; exclamation++) response += '!';
        response += '**'
      }
      response += `\n${novaRoll.rolls[explosion].str}\n`;
    }

    response += "\n**Sucesses: **["+novaRoll.successes+"] | **Novas: **["+novaRoll.novas+"]"

	message.delete({ timeout: 100 }).catch((reason) => {});

	return response;
}

module.exports = {
  'reply': {
      'nova' : NovaDiceCrit
  },
  'send': {},
  'internal': {},
  'direct': [],
  'help': "nova {dice} = Rolls n Nova Dice. [Example: -nova, -nova 7]. Optionally, add another number after the amount of dice to specify a greater nova range (from 2 to 5, 2 being the greatest)."
} 