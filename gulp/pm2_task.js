let pm2 = require('pm2');

let gulp = require('gulp');

class Pm2_task{
    constructor(fullName, shortName) {
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

    run(){
        let fullName = this.fullName;
        let shortName = this.shortName;

        if (!fullName){
            return false;
        }

        //start processes
        gulp.task(fullName + '_start', function () {
            pm2.connect(true, function () {
                pm2.start({
                    name: shortName,
                    script: 'servers/'+fullName+'/start.js',
                    env: {
                        "NODE_ENV": "dev"
                    }
                });
                pm2.streamLogs(shortName, 0);
            });
        });

        //reload processes
        gulp.task(fullName + '_reload', function () {
            pm2.connect(true, function () {
                pm2.restart(shortName,  function(err, apps) {
                    pm2.disconnect();   // Disconnect from PM2
                    if (err) throw err
                });
                pm2.streamLogs(shortName, 0);
            });
        });
    }

    watch(){
        let fullName = this.fullName;

        if (!fullName){
            return false;
        }

        gulp.watch(__dirname + '/servers/'+fullName+'/**/*.*', [fullName + '_reload']);
    }
}

module.exports = Pm2_task;

