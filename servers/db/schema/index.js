const current_folder = __dirname;
const current_file   = __filename;
const fs = require('fs');

let schemas = [];

fs.readdirSync(current_folder).forEach(file => {
    if((current_folder+'/'+file) == current_file){
        return;
    }
    schemas.push(file);
});

module.exports = function (Sequelize, DataTypes) {
    let list_schemas = [];
    schemas.forEach(schema => {
        list_schemas.push(
            require('./' + schema).get_schema(Sequelize, DataTypes)
        );
    });
    return list_schemas;
}

