let Users = require('../../models/users');
let client = require('../client');

let log   = console.log;
let hLog  = function (message) {
    log('\x1b[33m%s\x1b[0m: ', 'Creating cash', message);  //yellow
}



class CreatingCash{
    //Множества: все login, email
    //Счетчики:  все пользователи
    static users(callback){
        let pack_size = 20000;
        let all_users = 0;

        let finishFunction = function () {
            log('multiply emails added ('+ all_users +')');
            log('multiply logins added ('+ all_users +')');
            callback();
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
                            ['sadd', 'all_emails', pack_emails],
                            ['sadd', 'all_logins', pack_logins]
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
    CreatingCash.users(function () {
        hLog('finish');
        callback();
    });
};


module.exports = create;