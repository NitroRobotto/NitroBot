const Discord = require('discord.js');
const client = new Discord.Client();

var Nova    = require('./modules/nova');
var FU      = require('./modules/fu');
var DDD     = require('./modules/ddd');
var Utils   = require('./modules/utils');
var Joke    = require('./modules/joke');
var _token  = require('./token');

client.on('ready', () => {
  console.log('I am ready!');
});

function Help() {
  return "**Dice Commands:**\n\tddd = Rolls 2d6 and adds them together. [Example: -ddd or -2d6]"
    +"\n\tnova {n} = Rolls n Nova Dice. [Example: -nova 7]"
    +"\n\tfu {n} = Rolls n Freeform Unlimited dice. [Example: -fu 2]"
    +"\n\n**Random Commands:**"
    +"\n\tedge = Crawls in your skin"
    +"\n\n**Utility Commands:**"
    +"\n\tset \"char\" {stat} {value} = Sets target character's HP to a certain value. [Example: -set \"Potato\" hp 3]"
    +"\n\tstatus \"char\" = Gets the status of the defined character. [Example: -status \"Potato\"";
}

/*****************
* MAIN BOT LOGIC *
*****************/

var replyFunctions = {
  'nova' : Nova,
  'ddd'  : DDD,
  '2d6'  : DDD,
  'fu'   : FU,
  'edge' : Joke.Edge,
  'mullet': Joke.Mullet
}

var sendFunctions = {
  'help'  : Help,
  'status': Utils.ShowStatus
}

var internalFunctions = {
  'set'   : Utils.SetStatus
}

// Syntax: prefix(command) (arguments)
var commandRegex = /^-([^ ]+) ?(.*)/i;
var omaeWaMou = /omae(?:.*)wa(?:.*)mou(?:.*)shindeiru/i

client.on('message', message => {
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.author.bot) return;
  
  // Handle commands
  var result = commandRegex.exec(message.content);
  
  if (result) {
    var command = result[1].toLowerCase();
    var parameters = result[2];
    if (replyFunctions[command]) {
      message.reply(replyFunctions[command](parameters, message));
    } else if (sendFunctions[command]) {
      message.channel.send(sendFunctions[command](parameters, message));
    } else if (internalFunctions[command]) {
      internalFunctions[command](parameters, message);
    }
  } else if (omaeWaMou.exec(message.content)) {
    // Special supercool command
    message.channel.send("NANI?!");
  }
  
});

client.login(_token);