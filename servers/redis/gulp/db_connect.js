//Устанавливаем/проверяем соединение с БД
let orm = require("../../db");

module.exports = function (callback) {
    orm.sequelize.sync().then(function () {
        console.log('Connect to DB is ready');
        callback();
    });
};
