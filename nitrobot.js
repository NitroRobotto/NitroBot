const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log('I am ready!');
});

/**
 * Data
 */

var _charData = {};

/**
 *  Regexes
 */
var diceRegex = /^ *(\d+)?/i;
var statusRegex = /^ *"?([^"]*)/i;
var setRegex = /^ *"([^"]+)" ([^ ]+) (.+)/i;

/**
 * Aux functions
 */
 
function GetDatabaseID(message) {
  switch (message.channel.type) {
    case 'group':
    case 'text':
      return message.channel.id;
    case 'dm':
      return message.author.id;
    default:
      return null;
  }
}

function D6() {
  var dice = 1 + Math.floor((Math.random() * 6));
  var str = "ERROR";
  
  switch (dice) {
    case 6:
      str = ":six:";
      break;
    case 5:
      str = ":five:";
      break;
    case 4:
      str = ":four:";
      break;
    case 3:
      str = ":three:";
      break;
    case 2:
      str = ":two:";
      break;
    case 1:
      str = ":one:";
      break;
  }
  
  return {"str" : str, "val" : dice};
}

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

function SymbolDisplay(value, symbol) {
  var response = "";
  if (value > 5) {
    response += symbol + " *x" + value + "*";
  } else {
    for (var i = 0; i < value; i++) {
      response += symbol;
    }
  }
  return response;
}

function ShowCharacterStatus(character) {
  var response = "**[__"+character.name+"__]**";
  
  if (character.hp) {
    response += "\n- **HP:** " + SymbolDisplay(character.hp, ":heart: ");
    if (character.maxhp) response += SymbolDisplay(character.maxhp - character.hp, ":black_heart: ");
  } else if (character.maxhp) {
    response += "\n- **HP:** " + SymbolDisplay(character.maxhp, ":black_heart: ");
  }
  
  if (character.mp) {
    response += "\n- **MP:** " + SymbolDisplay(character.mp, ":zap:");
  }
  
  if (character.status) {
    response += "\n\n*" + character.status + "*";
  }
  return response;
}

function DoFURolls(amount) {
  var highest = 1;
  var current;
  for (var i = 0; i < amount; ++i) {
    current = D6();
    highest = (highest < current.val) ? current.val : highest;
  }
  switch (highest) {
    case 6:
      return {'icon': ":white_check_mark: :white_check_mark:", 'str': "Yes, and...!"};
    case 5:
      return {'icon': ":white_check_mark:", 'str': "Yes."};
    case 4:
      return {'icon': ":white_check_mark: :negative_squared_cross_mark:", 'str': "Yes, but..."};
    case 3:
      return {'icon': ":negative_squared_cross_mark: :white_check_mark:", 'str': "No, but...!"};
    case 2:
      return {'icon': ":negative_squared_cross_mark:", 'str': "No."};
    case 1:
      return {'icon': ":negative_squared_cross_mark: :negative_squared_cross_mark:", 'str': "No, and..."};
  }
}

/**
 * Commands
 */
function CheckNovaStats(amount) {
  var results = DoNovaRolls(amount);
  
  return "After " + amount + " rolls, I've obtained:"
     + "\n>Success: "+(results.successes/amount)*100 + "%"
     + "\n>Novas: "+  (results.novas    /amount)*100 + "%";
}

function NovaDice(message) {
    var results = diceRegex.exec(message);
    var diceAmount = results[1] ? results[1] : 1;
    
    if (diceAmount > 20) {
      return "No more than 20 dice, please!\nIf you're curious, you would've probably obtained around " + Math.round(diceAmount * 0.5) + " Successes and " + Math.round(diceAmount * 0.19) + " Novas.";
    }
    
    var results = DoNovaRolls(diceAmount);
    
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

function dddDice() {
   var diceOne = D6();
   var diceTwo = D6();
   return "**Rolling** 2d6:\n\n"
    + diceOne.str + " " + diceTwo.str
    + "\n\n**Total:** " + (diceOne.val + diceTwo.val);
}

function Help() {
  return "Commands:\n\tddd = Rolls 2d6 and adds them together. [Example: -ddd]"
    +"\n\tnova {n} = Rolls n Nova Dice. [Example: -nova 7]"
    +"\n\tset \"char\" {stat} {value} = Sets target character's HP to a certain value. [Example: -set \"Potato\" hp 3]"
    +"\n\tstatus \"char\" = Gets the status of the defined character. [Example: -status \"Potato\"";
}

function ShowStatus(args, message) {
  var results = statusRegex.exec(args);
  var id = GetDatabaseID(message);
  
  if (results) {
    if (_charData[id] && _charData[id][results[1]]) {
      return ShowCharacterStatus(_charData[id][results[1]]);
    }
  }
  
  return "Couldn't find that character! Possible reasons:\n- Your spelling could be wrong (names are case sensitive!)\n- The bot has reset (data is lost on bot restarts)";
}

function SetStatus(args, message) {
  var id = GetDatabaseID(message);
  var results = setRegex.exec(args);
  
  if (results) {
    if (!_charData[id]) {
      _charData[id] = {};
    }
    
    if (!_charData[id][results[1]]) {
      _charData[id][results[1]] = {'name' : results[1]};
    }
     
    _charData[id][results[1]][results[2]] = results[3];
  }
}

function FuDice(args, message) {
  var results = diceRegex.exec(args);
  var diceAmount = results[1] ? Math.min(results[1], 10) : 1;
  
  results = DoFURolls(diceAmount);
  
  return "Rolling [" + diceAmount + "] FU dice. Your result:\n\n"+results.icon+"\n\n**"+results.str+"**";
}

/*****************
* MAIN BOT LOGIC *
*****************/

var replyFunctions = {
  'nova' : NovaDice,
  'ddd'  : dddDice,
  'fu'   : FuDice
}

var sendFunctions = {
  'help'  : Help,
  'status': ShowStatus
}

var internalFunctions = {
  'set'   : SetStatus
}

var commandRegex = /^-([^ ]+) ?(.*)/i;

client.on('message', message => {
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.author.bot) return;
  
  // Handle commands
  var command = commandRegex.exec(message.content);
  
  if (command) {
    if (replyFunctions[command[1]]) {
      message.reply(replyFunctions[command[1]](command[2], message));
    } else if (sendFunctions[command[1]]) {
      message.channel.send(sendFunctions[command[1]](command[2], message));
    } else if (internalFunctions[command[1]]) {
      internalFunctions[command[1]](command[2], message);
    }
  }
});

client.login('***REMOVED***');