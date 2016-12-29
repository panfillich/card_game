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

module.exports = {
    up: function (queryInterface, Sequelize) {
        schemas.forEach(schema =>{
            require('./'+schema).up(queryInterface, Sequelize);
            // console.log(schema);
        });
    },

    down: function (queryInterface, Sequelize) {
        schemas.forEach(schema => {
            require('./' + schema).down(queryInterface, Sequelize);
            // console.log(schema);
        });
    }
}