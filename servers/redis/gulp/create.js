const KEY   = require('../key');

let log   = console.log;
let hLog  = function (message) {
    log('\x1b[33m%s\x1b[0m: ', 'Creating cash', message);  //yellow
}

let Users = require('../../models/users');

class CreatingCash{
    start(client, db, callback){
        //Переключаем модель на базу
        Users.switchToRedis(client);
        Users.switchToDB(db);
        this.client = client;

        hLog('start');

        //users:emails  - список всех email
        //users:logins  - список всех login
        //users:count   - список всех пользователей
        //users:in_game - список всех пользователей в игре
        this._users(function () {
            hLog('created successfully');
            callback();
        });
    }

    //Множества: все login, email
    //Счетчики:  все пользователи
    _users(callback){
        let client = this.client;

        let all_users = 5000000;
        let pack_size = 25000;
        let count_users = 0;

        let finishFunction = function () {
            log('multiply emails added (' + count_users + ')');
            log('multiply logins added (' + count_users + ')');
            client.multi([
                ['set', KEY.USERS.COUNT, count_users],
                ['set', KEY.USERS.IN_GAME, 0]
            ]).exec(function (err, repl) {
                if (!err) {
                    log('counters added');
                    if(callback) {
                       callback();
                    }
                } else {
                    log(err);
                }
            });
        };

        let setNewPack = function (offset, limit, callback) {
            Users.getAllEmailAndLogin(offset, limit, function (err, result) {
                if(!err){
                    let pack_emails = [];
                    let pack_logins = [];

                    count_users += result.length;

                    result.forEach(function (user) {
                        pack_emails.push(user.email)
                        pack_logins.push(user.login)
                    });

                    if(pack_emails.length == 0 || pack_logins.length == 0){
                        finishFunction();
                    } else {

                        client.sadd(
                            KEY.USERS.LOGINS, pack_logins, function (err, res) {
                            if (!err) {
                                client.sadd(  KEY.USERS.LOGINS, pack_logins, function (err, res) {
                                    if (!err) {
                                        log('[users cash]: ' + (count_users * 100 / all_users).toFixed(2) + '%');
                                        if (result.length == pack_size) {
                                            setNewPack(count_users, pack_size, callback);
                                        } else {
                                            finishFunction();
                                        }
                                    } else {
                                        log(err);
                                    }
                                });
                            } else {
                                log(err);
                            }
                        });
                     }
                }
            });
        };
        setNewPack(0, pack_size, callback);
    }
}

module.exports = new CreatingCash();