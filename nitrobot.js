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
  return "**Dice Commands:**\n\t2d6 = Rolls 2d6 and adds them together. [Example: -2d6,-ddd]"
    +"\n\tnova {n} = Rolls n Nova Dice. [Example: -nova, -nova 7]"
    +"\n\tfu {n} = Rolls n Freeform Unlimited dice. [Example: -fu, -fu 2]"
    +"\n\n**Random Commands:**"
    +"\n\tedge = Crawls in your skin. [Example: -edge, -edgy]"
    +"\n\tmullet = Hail to the king, baby. [Example: -mullet, -badass]"
    +"\n\thappy = owo [Example: -happy]"
    +"\n\tsombrero = Ay compadre [Example: -sombrero, -ay, -ayayay]"
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
  'edgy' : Joke.Edge,
  'mullet': Joke.Mullet,
  'badass': Joke.Mullet,
  'happy': Joke.Happy,
  'sombrero': Joke.Sombrero,
  'ayayay': Joke.Sombrero,
  'ay': Joke.Sombrero
};

var sendFunctions = {
  'help'  : Help,
  'status': Utils.ShowStatus
};

var internalFunctions = {
  'set'   : Utils.SetStatus
};

// Syntax: prefix(command) (arguments)
var commandRegex = /^-([^ ]+) ?(.*)/i;
var omaeWaMou = /omae(?:.*)wa(?:.*)mou(?:.*)shindeiru/i;
var goodBot = /(?:(?:good)|(?:thanks)|(?:domo))(?:.*)bot/i;

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
  } else if (goodBot.exec(message.content)) {
    message.reply(Joke.Happy());
  }
  
});

client.login(_token);