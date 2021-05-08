var diceRegex = /^ *(\d+)?/i;

function DoNovaRolls(amount) {
  var dice;
  var string = "";
  var novas = 0;
  var successes = 0;
  for (var i = 0; i < amount; ++i) {
      dice = Math.random();
      if (dice > 0.79) { //~6 in 1d6
        string += ":eight_spoked_asterisk: ";
        ++novas;
        ++successes;
      } else if (dice > 0.495) { //~4+ in 1d6
        string += ":white_check_mark: ";
        ++successes;
      } else {
        string += ":white_large_square: "
      }
    }
    
    var strings = [{"dice": amount, "str": string}];
    
    // Nova re-rolls
    if (novas > 0) {
      var explosions = DoNovaRolls(novas);
      novas += explosions["novas"];
      successes += explosions["successes"];
      strings = strings.concat(explosions["rolls"]);
    }
    
    return {"novas": novas, "successes": successes, "rolls": strings};
}

function NovaDice(args, message) {
    var results = diceRegex.exec(args);
    var diceAmount = results[1] ? results[1] : 1;
    
    if (diceAmount > 20) {
      return "No more than 20 dice, please!\nIf you're curious, you would've probably obtained around " + Math.round(diceAmount * 0.5) + " Successes and " + Math.round(diceAmount * 0.19) + " Novas.";
    }
    
    results = DoNovaRolls(diceAmount);
    
    var response = "";
    
    for (var explosion = 0; explosion < results.rolls.length; ++explosion) {
      response += "\n**Rolling **["+ results.rolls[explosion].dice + "]** Nova Dice";
      for (var i = 0; i < explosion; ++i) {
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
      'nova' : NovaDice
  },
  'send': {},
  'internal': {},
  'direct': [],
  'help': "nova {n} = Rolls n Nova Dice. [Example: -nova, -nova 7]."
}