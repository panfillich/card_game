let pm2 = require('pm2');

let gulp = require('gulp');

class Pm2_task{
    constructor(fullName, shortName) {
        this.is_reload = false;

        this._fullName  = null;
        this._shortName = null;

        if(fullName) {
            this.fullName = fullName;
        }
        if(shortName) {
            this.shortName = shortName;
        }
    }

    get fullName() {
        if(!this._fullName){
            console.log('Pm2_task ERROR: Не задано полное имя процесса!');
            return null;
        }
        return this._fullName;
    }

    get shortName(){
        if(!this._shortName){
            console.log('Pm2_task ERROR: Не задано полное имя процесса!');
            return null;
        }
        return this._shortName;
    }

    set fullName(fullName) {
        if(typeof fullName == 'string'){
            this._fullName = fullName;
        } else {
            console.log("Pm2_task ERROR: passed parameter 'fullName' isn't a string!");
        }
    }

    set shortName(shortName) {
        if(typeof shortName == 'string') {
            this._shortName = shortName;
        } else {
            console.log("Pm2_task ERROR: passed parameter 'shortName' isn't a string!");
        }
    }

    start(){
        let fullName = this.fullName;
        let shortName = this.shortName;

        if (!fullName){
            return false;
        }

        let startName = fullName + '_start';

        //start processes
        gulp.task(startName, function () {
            pm2.connect(true, function () {
                pm2.start({
                    name: shortName,
                    script: 'servers/'+fullName+'/start.js',
                    env: {
                        "NODE_ENV": "dev"
                    },
                    autorestart : false
                }, function (err) {

                });

                // http://pm2.keymetrics.io/docs/usage/use-pm2-with-cloud-providers/
                pm2.streamLogs(shortName, 0);
            });
        });

        this.startName = startName;
    }

    reload(){
        let fullName = this.fullName;
        let shortName = this.shortName;

        if (!fullName){
            return false;
        }

        let reload_task = function () {
            let is_reload = false
            function reload() {
                if(!is_reload) {
                    is_reload = true
                    pm2.connect(true, function () {
                        pm2.restart(shortName, function (err, app) {
                             is_reload = false
                            if (err) throw err
                        });
                    });
                }
            }
            return reload;
        }

        //reload processes
        gulp.task(fullName + '_reload', reload_task());
    }

    watch(){
        let fullName = this.fullName;

        if (!fullName){
            return false;
        }

        gulp.watch(
            [
                __dirname+'/servers/'+fullName+'/**/*.*',
                __dirname+'/servers/database/**/*.*'
            ],
            [
                fullName + '_reload'
            ]
        );
    }
}

module.exports = Pm2_task;

