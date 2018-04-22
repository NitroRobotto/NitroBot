function BigText(text) {
    text = text.toLowerCase();
    var output = ":arrow_right:  ";
    for(var i = 0; i < text.length; ++i) {
        if (isLetter(text[i])) {
            output += ":regional_indicator_" + text[i] + ": ";    
        } else if (text[i] == ' ') {
            output += "   ";
        }
    }
    return output + " :arrow_left:";
}

function isLetter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}

module.exports = {
    "BigText" : BigText
}