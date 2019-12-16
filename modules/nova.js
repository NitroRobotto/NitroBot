var diceRegex = /^ *(\d+)?/i;

function DoNovaRolls(amount) {
  var response = "";
  var dice;
  var novas = 0;
  var successes = 0;
  for (var i = 0; i < amount; ++i) {
      dice = Math.random();
      if (dice > 0.79) { //~6 in 1d6
        response += ":eight_spoked_asterisk: ";
        ++novas;
        ++successes;
      } else if (dice > 0.495) { //~4+ in 1d6
        response += ":white_check_mark: ";
        ++successes;
      } else { //3- in 1d6
        response += ":white_large_square: ";
      }
    }
    
    return {"str": response, "novas": novas, "successes": successes};
}

function NovaDice(args, message) {
    var results = diceRegex.exec(args);
    var diceAmount = results[1] ? results[1] : 1;
    
    if (diceAmount > 20) {
      return "No more than 20 dice, please!\nIf you're curious, you would've probably obtained around " + Math.round(diceAmount * 0.5) + " Successes and " + Math.round(diceAmount * 0.19) + " Novas.";
    }
    
    results = DoNovaRolls(diceAmount);
    
    var response = "**Rolling **[" + diceAmount + "]** Nova Dice:**\n" + results.str;
    
    var successes = results.successes;
    var novas = results.novas;
    
    var currentNovas = novas;
    
    var explosions = 0;
    
    while (currentNovas > 0) {
      ++explosions;
      
      results = DoNovaRolls(currentNovas);
      
      response += "\n**Rolling **[" + currentNovas + "]** Novas";
      
      for (var i = 0; i < explosions; ++i) {
        response += "!";
      }
      
      response += "**\n" + results.str;
      
      successes += results.successes;
      novas += results.novas;
      
      currentNovas = results.novas;
    }
    
    response += "\n\n**Sucesses: **["+successes+"] | **Novas: **["+novas+"]"
    
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