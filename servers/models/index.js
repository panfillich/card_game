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


module.exports = function (db, client) {
    models.forEach(file => {
        let Model = require('./' + file);

        if(typeof Model.switchToRedis != 'undefined'){
            Model.switchToRedis(client);
        }

        if(typeof Model.switchToDB != 'undefined'){
            Model.switchToDB(db);
        }
    });
};

