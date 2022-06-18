const Discord = require('discord.js');
const client = new Discord.Client();

var _token  = require('./token');

client.on('ready', () => {
  console.log('NitroBot ONLINE!');
});

/*******************************
* LIST YOUR MODULE NAMES HERE  *
*******************************/
var modules = [
  'nova',
  'fu',
  'ddd',
  'joke',
  'dicebuild',
  'fabula',
  'diceCustom'
];

/*****************
* MODULE LOADING *
******************/
var replyFunctions = {};
var sendFunctions = {};
var internalFunctions = {};
var directMessages = [];
var help = "";

console.log("[Loading Modules]");

modules.forEach((module) => {
  var loadedModule = require("./modules/" + module);
  replyFunctions = Object.assign({}, replyFunctions, loadedModule.reply);
  sendFunctions = Object.assign({}, sendFunctions, loadedModule.send);
  internalFunctions = Object.assign({}, internalFunctions, loadedModule.internal);
  directMessages = directMessages.concat(loadedModule.direct);
  help = help + "**["+ module + "]**```" + loadedModule.help + "```";
  console.log("Module " + module + " loaded.");
});

function Help(args, command) {
  return help;
}

replyFunctions["help"] = Help;

console.log("[All Modules Loaded]");

/*****************
* MAIN BOT LOGIC *
*****************/

// Syntax: prefix(command) (arguments)
var commandRegex = /^-([^ ]+) ?(.*)/i;

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
  } else {
    directMessages.some((direct) => {
      result = direct.regex.exec(message.content);
      if (result) {
        switch(direct.type) {
          case 'send':
            message.channel.send(direct.function(message));
            return true;
          case 'reply':
            message.reply(direct.function(message));
            return true;
        }
      }
      return false;
    });
  }
  
});

client.login(_token);