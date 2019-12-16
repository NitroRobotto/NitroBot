//var utils = require('./utils');

var testFunctionHelp = "Help for Test Function";
function testFunction(params, msg) {
    return params;
}

var testRegex = /^Test!/i;

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