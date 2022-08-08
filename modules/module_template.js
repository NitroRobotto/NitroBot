//var utils = require('./utils');
const testRegex = /^Test!/i;

function testFunction(params, msg) {
    return params;
}

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