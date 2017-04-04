let log = require('../common_libs/logger')(module);

// Проверяем соединение с Redis / создаем клиента
let client = require('../redis/client');

// Устанавливаем/проверяем соединение с БД
let bd = require("../db");

//Связываем модели с базой, redis
require('../models')(bd, client);

// Определяем Express приложение
let app = require('./app');

// Определяем сервер
let server = require('./server');

// Навешиваем слушатель событий + определяем класс для работы с socket.io
let io = require('./io');

// Запускаем сервер
server.listen(3004, function() {
    log.info('Chat server listening on port %d', 3004);
});

// Навешиваем обработчики событий socket.io
require('./socket');



