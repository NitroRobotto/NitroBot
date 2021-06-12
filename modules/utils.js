var _charData = {};

var statusRegex = /^ *"?([^"]*)/i;
var setRegex = /^ *"([^"]+)" ([^ ]+) (.+)/i;

function GetRandomFromList(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function RemoveItemFromList(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

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

module.exports = {
  
    'D6' : function () {
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
    },
    
    'SetStatus' : function (args, message) {
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
    },
    
    'ShowStatus' : function (args, message) {
      var results = statusRegex.exec(args);
      var id = GetDatabaseID(message);
      
      if (results) {
        if (_charData[id] && _charData[id][results[1]]) {
          return ShowCharacterStatus(_charData[id][results[1]]);
        }
      }
      
      return "Couldn't find that character! Possible reasons:\n- Your spelling could be wrong (names are case sensitive!)\n- The bot has reset (data is lost on bot restarts)";
    },
    
    'GetRandomFromList' : GetRandomFromList,
	'RemoveItemFromList' : RemoveItemFromList

}