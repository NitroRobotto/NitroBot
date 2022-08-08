const utils = require('./utils');

module.exports = function (args, message) {
  let result = "";
  let total = 0;
  let current;
  for (var i = 0; i < 4; ++i) {
    current = utils.D6().val;
    switch (current) {
        case 6:
        case 5:
          result += "[+] ";
          ++total;
          break;
        case 4:
        case 3:
          result += "[ ] ";
          break;
        case 2:
        case 1:
          result += "[-] ";
          --total;
          break;
    }
  }
  
  return "Your **FATE** is...\n\n``" + result + "``\n\n**Total:** `" + total + "`";
}