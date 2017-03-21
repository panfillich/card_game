let path      = require('path');
let Sequelize = require('sequelize');
let config    = require('./config.json').development;
let db        = {};

config.logging = console.log;

module.exports = function () {
    let sequelize = new Sequelize(config.database, config.username, config.password, config);

    let file = 'addiction.js';

    let models = sequelize['import'](path.join(__dirname, file));

    models.forEach(function (model) {
        db[model.name] = model;
    });

    Object.keys(db).forEach(function(modelName) {
        if (db[modelName].associate) {
            db[modelName].associate(db);
        }
    });

    db.sequelize = sequelize;
    db.Sequelize = Sequelize;

    return db;
};

