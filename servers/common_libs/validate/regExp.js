let sprintf = require("sprintf-js").sprintf;

class RegExps{
    constructor(){
        this._createEmail();
        this._createPassword();
        this._createLogin();
        this._createLanguage();
    }

    _createEmail(){
        let config = {
            min: 2,
            max: 25
        };
        // /^([a-z0-9_.]{2,25})@(gmail|yandex)\.([a-z\.]{2,6})$/
        let strRegExp   = '^([a-z0-9]{%(min)s,%(max)s})@(gmail|yandex)\\.([a-z\\.]{2,6})$';
        let regExpStr   = sprintf(strRegExp, config);
        let regExp      = new RegExp(regExpStr);

        this.email = {
            regExp: regExp,
            strRegExp: strRegExp,
            config: config
        }
    }

    _createPassword(){
        let config = {
            min: 8,
            max: 25
        };

        // /^(.{8,25})$/
        let strRegExp   = '^(.{%(min)s,%(max)s})$';
        let regExpStr   = sprintf(strRegExp, config);
        let regExp      = new RegExp(regExpStr);

        this.password = {
            regExp: regExp,
            strRegExp: strRegExp,
            config: config
        }
    }

    _createLogin(){
        let config = {
            min: 3,
            max: 20
        };

        // /^([a-zA-Zа-яА-Я0-9]{3,20})$/
        let strRegExp   = '^([a-zA-Zа-яА-Я0-9]{%(min)s,%(max)s})$';
        let regExpStr   = sprintf(strRegExp, config);
        let regExp      = new RegExp(regExpStr);

        this.login = {
            regExp: regExp,
            strRegExp: strRegExp,
            config: config
        }
    }

    _createLanguage(){
        let regExp = /^(ru|en)$/;
        this.language = {
            regExp: regExp
        }
    }
}

module.exports =  new RegExps();