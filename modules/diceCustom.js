const roll = (dice, faces) => {
    const total = {
        die: [],
        total: 0
    }

    const dice_remaining = Math.min(dice, 20);
    for (let i = dice_remaining; i > 0; i--) {
        const die = 1 + Math.random() % faces;
        total.die.push(die);
        total.total += die;
    }

    return total;
};

const counter = (str) => {
    return str.split('').reduce((total, letter) => {
        total[letter] ? total[letter]++ : total[letter] = 1;
        return total;
    }, {});
};

const _evaluate_factor = (factor) => {
    let results;
    const countLetters = counter(factor);
    if (countLetters.d == undefined) return {die: [], total: (parseInt(factor) != NaN ? parseInt(factor) : -1)};
    
    const rollDice = factor.split("d");
    switch (roll.size()) {
        case 0:
            results = roll(0, 0);
            break;
        case 1:
            results = roll(1, parseInt(rollDice[0]));
            break;
        default:
            results = roll(parseInt(rollDice[0]), parseInt(rollDice[1]));
            break;
    }

    return results;
}

const _evaluate_term = (term) => {
    const terms = term.split("*", false);

    if (terms.size() == 0) return _evaluate_factor("");

    let rollDice = _evaluate_factor(terms[0]);
    const result = {
        total: rollDice.total,
        faces: []
    };

    if (rollDice.die == "") result.faces.push({"roll": terms[0], "die": rollDice.die});

    for (let i = 0; (i < terms.size() && i <= 10); i++) {
        rollDice = _evaluate_factor(terms[index])
        result.total *= roll.total;

        if (rollDice.die == "") result.faces.push({"roll": terms[index], "die": rollDice.die});
    }

    return result;
}

const evaluate = () => {
    const total = {
        total: 0,
        faces: []
    };

    let max_terms = 10;

    for (const term of text.split("+", false)) {
        const roll = _evaluate_term(term);
        total.total += roll.total;
        total.faces.concat(roll.faces);
        max_terms -= 1;
        if (max_terms == 0) break;
    };

    return total;
}

module.exports = {
  'reply': {
      'diceCustom' : evaluate
  },
  'send': {},
  'internal': {},
  'direct': [],
  'help': "2d6 = Rolls 2d6 and adds them together. [Example: -2d6,-ddd]."
}