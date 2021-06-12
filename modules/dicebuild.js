var utils = require('./utils');
var diceRegex = /^ *(\d+)?[ d](.*)/i;
var alternateRegex = /^ *(.*)/i;

function parseDicebuildCommand(params) {
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
	
	var faces = results[2].indexOf(';') == -1 ? results[2].split(' ') : results[2].split(';');
	faces.forEach((item, index, list) => {list[index] = item.trim();});
	faces = faces.filter(Boolean);
	
	if (faces.length < 2)
	{
		return "You need to specify at least two faces.";
	}
	
	return {'faces': faces, 'dice': diceAmount}
}

function rollFacesNoRepeat(params, msg) {
	var command = parseDicebuildCommand(params);
	if (typeof faces == "string") return faces;
	
	var diceAmount = command.dice;
	var faces = command.faces;
	
	if (diceAmount < 2)
	{
		return "You need to roll at least two dice.";
	}
	
	if (diceAmount > faces.length) diceAmount = faces.length;
	
	var results = "**DicebuildOnce: **" + diceAmount + "  ×**「**";
	
	faces.forEach((item) => { results += item + ";"; });
	
	results = results.slice(0,-1) + "**」**\n***Results:***";
	
	var tempResult;
	while (diceAmount-- > 0)
	{
		tempResult = utils.GetRandomFromList(faces);
		faces = utils.RemoveItemFromList(faces, tempResult);
		results += "「" + tempResult + "」";
	}
	
	msg.delete({ timeout: 100 }).catch((reason) => {});
	
    return results;
}

function rollFaces(params, msg) {
	var command = parseDicebuildCommand(params);
	if (typeof faces == "string") return faces;
	
	var diceAmount = command.dice;
	var faces = command.faces;
	
	if (diceAmount < 1)
	{
		return "You need to roll at least one dice.";
	}
	
	var results = "**Dicebuild: **" + diceAmount + "  ×**「**";
	
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
	  'dicebuildonce': rollFacesNoRepeat,
	  'customdie' : rollFaces,
	  'customdieonce' : rollFacesNoRepeat,
	  'faces' : rollFaces,
	  'facesonce' : rollFacesNoRepeat
  },
  'send': {
      
  },
  'internal': {
      
  },
  'direct': [
      
    ],
  'help': "dicebuild {n} {a},{b},{c}... : Roll n dice. The dice's faces are comprised of the parameters a,b,c, and any others. They can be semicolon or space separated. Use dicebuildonce if you're rolling more than one dice and want each face to turn up exactly once. [Examples: -dicebuild 5 :skull: :white_medium_square: :white_medium_square: :knife: :knife: :sparkles: ; or -dicebuild 3 Yes,,No]"
}