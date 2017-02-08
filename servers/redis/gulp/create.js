let Users   = require('../../models/users');
let client  = require('../client');
const KEY   = require('../key');

let log   = console.log;
let hLog  = function (message) {
    log('\x1b[33m%s\x1b[0m: ', 'Creating cash', message);  //yellow
}

class CreatingCash{

    static start(callback){
        //users:emails  - список всех email
        //users:logins  - список всех login
        //users:count   - список всех пользователей
        //users:in_game - список всех пользователей в игре
        CreatingCash._users(callback);
    }


    //Множества: все login, email
    //Счетчики:  все пользователи
    static _users(callback){
        let pack_size = 20000;
        let all_users = 0;

        let finishFunction = function () {
            log('multiply emails added (' + all_users + ')');
            log('multiply logins added (' + all_users + ')');

            client.multi([
                ['set', KEY.USERS.COUNT, all_users],
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
            Users.getAllEmailAndLogin(offset,limit,function (err, result) {
                if(!err){
                    let pack_emails = [];
                    let pack_logins = [];

                    all_users += result.length;

                    result.forEach(function (user) {
                        pack_emails.push(user.email)
                        pack_logins.push(user.login)
                    });

                    if(pack_emails.length == 0 || pack_logins.length == 0){
                        finishFunction();
                    } else {
                        client.multi([
                            ['sadd', KEY.USERS.EMAILS, pack_emails],
                            ['sadd', KEY.USERS.LOGINS, pack_logins]
                        ]).exec(function (err, repl) {
                            if (!err) {
                                if (result.length == pack_size) {
                                    setNewPack(all_users, pack_size, callback);
                                } else {
                                    finishFunction();
                                }
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

let create = function (callback) {
    hLog('start');
    CreatingCash.start(function () {
        hLog('finish');
        if(callback){
            callback();
        }
    });
};


module.exports = create;