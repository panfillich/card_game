const config = require('./config.json')

const current_folder = __dirname;
const fs = require('fs');

let data = [];

config.data.forEach(function (folder) {
    fs.readdirSync(current_folder + '/' + folder).forEach(file => {
        data.push(require('./' + folder + '/' + file));
    });
});

module.exports = data;




