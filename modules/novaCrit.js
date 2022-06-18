const diceRegex = /^ *(\d+)?/i;

function DoNovaRolls(amount, novaDice) {
  const roll = NovaQuestion(amount, novaDice);
  let strings = [{"dice": amount, "str": roll.string}];

  return {"novas": roll.novas, "successes": roll.successes, "rolls": strings};
}

function NovaQuestion(amount, novaDice) {
  let amountFor = amount;
  const roll = {
    novas: 0,
    successes: 0,
    string: "",
  }

  for (let i = 0;(i < amountFor && i <= 20); ++i) {
    const dice = Math.random();
    const diceInt = Math.round((dice * 100)/15); 

    if (diceInt >= novaDice) { //~6 in 1d6
      roll.string += ":eight_spoked_asterisk: ";
      ++roll.novas;
      ++roll.successes;
      ++amountFor;
    } else if ((novaDice > 4) && (diceInt >= 4)) { //~4+ in 1d6
      roll.string += ":white_check_mark: ";
      ++roll.successes;
    } else {
      roll.string += ":white_large_square: "
    }
  }
  
  return roll;
}

function NovaDiceCrit(args, message) {
    let results = diceRegex.exec(args);
    let diceAmount = results[2] ? results[2] : 1;
    let diceNovaDice = results[1] ? results[1] : 6;
    
    if (diceAmount > 20) {
      return "No more than 20 dice, please!\nIf you're curious, you would've probably obtained around " + Math.round(diceAmount * 0.5) + " Successes and " + Math.round(diceAmount * 0.19) + " Novas.";
    }
    
    results = DoNovaRolls(diceAmount, diceNovaDice);
    
    let response = "";
    
    for (let explosion = 0; explosion < results.rolls.length; ++explosion) {
      response += "\n**Rolling **["+ results.rolls[explosion].dice + "]** Nova Dice";
      for (let i = 0; i < explosion; ++i) {
        response += "!";
      }
      response += "**\n" + results.rolls[explosion].str;
    }
    
    response += "\n\n**Sucesses: **["+results.successes+"] | **Novas: **["+results.novas+"]"
    
	message.delete({ timeout: 100 }).catch((reason) => {});
	
	return response;
}

module.exports = {
  'reply': {
      'novaCrit' : NovaDiceCrit
  },
  'send': {},
  'internal': {},
  'direct': [],
  'help': "nova {n} = Rolls n Nova Dice. [Example: -nova, -nova 7]."
}