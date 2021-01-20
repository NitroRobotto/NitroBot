var utils = require('./utils');
var diceRegex = /^ *(\d+) (.*)/i;

function rollFaces(params, msg) {
	var results = diceRegex.exec(params);
	if (results == null || results.length < 3)
	{
		return "Insufficient parameters. The format is 1 number followed by any number of faces, separated by a spaces or semicolons.";
	}
	
	var diceAmount = results[1];
	if (diceAmount < 1)
	{
		return "You need to roll at least one dice.";
	}
	
	var faces = results[2].indexOf(';') == -1 ? results[2].split(' ') : results[2].split(';');
	faces.forEach((item, index, list) => {list[index] = item.trim();});
	faces = faces.filter(Boolean);
	
	if (faces.length < 2)
	{
		return "You need to specify at least two faces.";
	}
	
	results = "**Rolling **[" + diceAmount + "] **dice with the following faces:** ";
	
	faces.forEach((item) => { results += "[" + item + "], "; });
	
	results = results.slice(0,-2) + "\n\n";
	
	while (diceAmount-- > 0)
	{
		results += "[" + utils.GetRandomFromList(faces) + "] ";
	}
	
	msg.delete({ timeout: 100 }).catch((reason) => {});
	
    return results;
}

module.exports = {
  'reply': {
      'dicebuild' : rollFaces,
	  'customdie' : rollFaces,
	  'faces' : rollFaces
  },
  'send': {
      
  },
  'internal': {
      
  },
  'direct': [
      
    ],
  'help': "dicebuild {n} {a},{b},{c}... : Roll n dice. The dice's faces are comprised of the parameters a,b,c, and any others. They can be semicolon or space separated. [Example: -dicebuild 5 :skull: :white_medium_square: :white_medium_square: :knife: :knife: :sparkles: ; or -dicebuild 3 Yes,,No]"
}