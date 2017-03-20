let log = require('../common_libs/logger')(module);

//Проверяем соединение с Redis / создаем клиента
let client = require('../redis/client');

//Устанавливаем/проверяем соединение с БД
let bd = require("../db");

//Связываем модели с базой, redis
require('../models')(bd, client);

//Определяем Express приложение
let app = require('./app');
//Устанавливаем настройки
require('./config');

//Фильтры
require('./check_token');

//Устанавливаем обработчики событий (контроллеры)
require('./controllers');
//Устанавливаем обработчики ошибок
require('./errors');
//Запускаем сервер
require('./server');

