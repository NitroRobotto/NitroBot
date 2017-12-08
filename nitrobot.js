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
  'edge' : Joke.Edge
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

client.login(_token);