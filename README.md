Simple Discord Bot programmed in NodeJS that provides roleplaying utilities.

Build using the Discord.JS library.

How to use:
1.  Clone repository and run ''npm install'' on the root folder.
2.  Create a file in the root folder named "token.js". Paste the following code inside: ''module.exports = "<YOUR_BOT_TOKEN_HERE>";''
3.  Run ''node nitrobot.js''.

To create new functions:
1. Create a new file in the "modules" folder (you may also clone module_template.js)
2. Program your commands as functions. The first parameter is the string of text following the command, the second paramete is discord.js message object. The function return will be the reply body.
```js
function helloWorld(params, message) {
    return "Hello World!" + params;
}
```
3. At the end of the file, add each command to the module.exports, along with a help string for that module:
```js
module.exports = {
  'reply': {
      'commandName' : testFunction,
  },
  'send': {
      'commandNameReply' : testFunction,
      'commandAlias' : testFunction
  },
  'internal': {
      'commandNameInternal' : testFunction,
  },
  'direct': [
      {'regex': testRegex, 'function': testFunction, 'type': 'send'}
    ],
  'help': "Help Message with a list of what this module does and what commands it has."
}
```
4. Open nitrobot.js and add the name of your module file (without the .js termination) to the "modules" list.
5. Start the bot and try it out!

*  The command is the key in the dictionary.
*  Functions in 'reply' will @ the user who triggered the command.
*  Functions in 'send' are the same as 'reply' but it won't @ the user.
*  Functions in 'internal' will NOT send any message. The 'return' string here is ignored.
*  Functions in 'direct' are special: Any message that is not a command will be parsed against all 'direct' regexes until one hits. If it does, the function will be triggered (only the message is passed and only as the first parameter as of now). Type can be 'send' or 'reply'.
*  The string in 'help' will print when the user uses the -help command.
