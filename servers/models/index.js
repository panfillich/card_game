const current_folder = __dirname;
const current_file   = __filename;
const fs = require('fs');

let models = [];

fs.readdirSync(current_folder).forEach(file => {
    if((current_folder+'/'+file) == current_file || (file.slice(-3) != '.js')){
        return;
    }
    models.push(file);
});

let list_models = {};

module.exports = function (db) {
    models.forEach(file => {
        let Model = require('./' + file);
        list_models[file.substring(0, file.length - 3)] = new Model(db);
    });
    return list_models;
}

