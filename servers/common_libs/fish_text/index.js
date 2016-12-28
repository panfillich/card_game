// использование Math.round() даст неравномерное распределение!
function getRandomInt(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = function (count, type = 'food', language='en') {
    let words = require('./'+type+'.json');
    let length = words.length;
    let randomWorlds = [];
    let currentStep = 1;
    while(currentStep<=count){
        let randomIndex = getRandomInt(0, length - 1);
        randomWorlds.push(words[randomIndex][language]);
        currentStep++;
    }
    randomWorlds[0] = randomWorlds[0][0].toUpperCase()+randomWorlds[0].substr(1);
    return randomWorlds.join(' ');
}