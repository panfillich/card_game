
function randomInteger(min, max) {
    var rand = min + Math.random() * (max - min)
    rand = Math.round(rand);
    return rand;
}

let data = [];

let index = 0;
let lenght = 10;

for(index=1; index<=lenght; index++){
    data.push({
        id : index,
        name : 'Name_' + index,
        phone : '+' + randomInteger(10000000, 99999999)
    });
}

module.exports = data;

