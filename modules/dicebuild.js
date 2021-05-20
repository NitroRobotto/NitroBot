var utils = require('./utils');
var diceRegex = /^ *(\d+)?[ d](.*)/i;
var alternateRegex = /^ *(.*)/i;

function rollFaces(params, msg) {
	var results = diceRegex.exec(params);
	if (results == null || results.length < 2)
	{
		results = alternateRegex.exec(params);
		if (results == null || results.length < 1)
			return "Insufficient parameters. The format is -dicebuild [number] [faces], space or semicolon separated.";
		
		results[2] = results[1]
		results[1] = 1
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
	
	results = "**Dicebuild: **" + diceAmount + "  ×**「**";
	
	faces.forEach((item) => { results += item + ";"; });
	
	results = results.slice(0,-1) + "**」**\n***Results:***";
	
	while (diceAmount-- > 0)
	{
		results += "「" + utils.GetRandomFromList(faces) + "」";
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