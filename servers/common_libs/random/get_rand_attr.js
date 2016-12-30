let getRandomInt = require('../random/get_rand_int');

module.exports = function (object) {
    let values = [];

    for (let attr in object){
        values.push(object[attr]);
    }

    let rand_position = getRandomInt(0, values.length - 1);

    return values[rand_position];
}
