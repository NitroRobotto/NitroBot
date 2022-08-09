const Discord = require('discord.js');
const client = new Discord.Client();

const _token  = require('./token');

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
  'diceCustom',
  'dicepool'
];

/*****************
* MODULE LOADING *
******************/
let replyFunctions = {};
let sendFunctions = {};
let internalFunctions = {};
let directMessages = [];
let help = "";

console.log("[Loading Modules]");

modules.forEach((module) => {
  const loadedModule = require("./modules/" + module);
  replyFunctions = Object.assign({}, replyFunctions, loadedModule.reply);
  sendFunctions = Object.assign({}, sendFunctions, loadedModule.send);
  internalFunctions = Object.assign({}, internalFunctions, loadedModule.internal);
  directMessages = directMessages.concat(loadedModule.direct);
  help = help + "**["+ module + "]**```" + loadedModule.help + "```";
  console.log("Module " + module + " loaded.");
});

replyFunctions["help"] = (args, command) => { return help; }

console.log("[All Modules Loaded]");

/*****************
* MAIN BOT LOGIC *
*****************/

// Syntax: prefix(command) (arguments)
const commandRegex = /^-([^ ]+) ?(.*)/i;

client.on('message', message => {
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.author.bot) return;
  
  // Handle commands
  let result = commandRegex.exec(message.content);
  
  if (result) {
    const command = result[1].toLowerCase();
    const parameters = result[2];
    
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