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

module.exports = function NovaDice(message) {
    var results = diceRegex.exec(message);
    var diceAmount = results[1] ? results[1] : 1;
    
    if (diceAmount > 20) {
      return "No more than 20 dice, please!\nIf you're curious, you would've probably obtained around " + Math.round(diceAmount * 0.5) + " Successes and " + Math.round(diceAmount * 0.19) + " Novas.";
    }
    
    results = DoNovaRolls(diceAmount);
    
    var response = "**Rolling **[" + diceAmount + "]** Nova Dice:**\n\n" + results.str;
    var successes = results.successes;
    var novas = results.novas;
    
    var currentNovas = novas;
    
    var explosions = 0;
    
    while (currentNovas > 0) {
      ++explosions;
      
      results = DoNovaRolls(currentNovas);
      
      response += "\n\n**Rolling **[" + currentNovas + "]** Novas";
      
      for (var i = 0; i < explosions; ++i) {
        response += "!";
      }
      
      response += "**\n\n" + results.str;
      
      successes += results.successes;
      novas += results.novas;
      
      currentNovas = results.novas;
    }
    
    if (successes == 0) {
      response += "\n\nBetter luck next time!";
    } else if (successes == 1) {
      response += "\n\nThat's **1 Success**!";
    } else {
      response += "\n\nThat's **" + successes +  " Successes**!";
    }
    
    if (novas > 0) {
      response += " You got **" + novas + " Novas** in total!";
    }
    
  return response;
}