const vowelLowercaseRegex = /[aeiouáéíóúàèìòùâêîôûäëïöü]/gm;
const vowelUppercaseRegex = /[AEIOUÁÉÍÓÚÀÈÌÒÙÂÊÎÔÛÄËÏÖÜ]/gm;
const vowelsLowercase = ["a", "e", "i", "o", "u"];
const vowelsUppercase = ["A", "E", "I", "O", "U"];

function replaceVowels(args, message) {
    const vowel = Math.floor((Math.random() * 5));
    let reply = args.replace(vowelLowercaseRegex, vowelsLowercase[vowel]);
    reply = reply.replace(vowelUppercaseRegex, vowelsUppercase[vowel]);
    
    return reply;
}

function BigText(text) {
    text = text.toLowerCase();
    let output = ":arrow_right:  ";
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