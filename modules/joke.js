var Utils = require('./utils');

var edgeStarters = [
    "\\*teleports behind you\\*",
    "\\*teleports behind you and draws a katana\\*",
    "\\*draws a katana\\*",
    "\\*leans against wall\\*",
    "\\*looks at you as if you were nothing\\*",
    "\\*teleports behind you\\* psch...",
    "\\*laughs maniatically\\*",
    "\\*smiles sadistically, eyes wide\\*",
    "\\*smirks\\*",
    "\\*covers himself with a cape\\*",
    "\\*kills you\\*",
    "\\*buils the wall\\*",
    "\\*stops time\\*",
    "\\*reaches its final form\\*",
    "\\*moves so fast that you can't see it comming\\*",
    "\\*charges up power\\*",
    "\\*disappears and you hear a voice echo\\*",
    "\\*its power level suddenly increases\\*",
    "\\*is surrounded by a dark aura\\*",
    "\\*its hair turns white and its eyes glow red\\*"
];

var edgePhrases = [
    "I am death. You are merely still living.",
    "Death was my begining: It will be your end.",
    "You're already dead.",
    "Misery is my nourishment... And I feel hungry.",
    "Pain? You don't know pain. Luckily for you, I'm an excellent teacher.",
    "Time waits for no one... And yours is up.",
    "You're but another scratch on my blade.",
    "I'm the nightmare you can't wake up from.",
    "Do you know what lurks in the shadows? Too bad...",
    "That sound? It was your life comming to an end.",
    "I will make you fade away.",
    "I am a wolf. You're merely a sheep.",
    "I may be dead inside, but you will be dead all over.",
    "My soul may be black, but yours will never shine again.",
    "Life is only an illussion. Let me help you wake up.",
    "I'm what gazes back from the abyss.",
    "Were you even alive in the first place?",
    "Nothin personnel... Kid.",
    "We have a name for your kind: Prey.",
    "Your life I can end, but the monsters within myself cannot be defeated."
];

function edge() {
    return Utils.GetRandomFromList(edgeStarters)
        + "***" + Utils.GetRandomFromList(edgePhrases) + "***";
}

module.exports = {
    'Edge' : edge
};