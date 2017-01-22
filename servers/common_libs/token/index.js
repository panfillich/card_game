const crypto = require('crypto');

const secret_for_token = 'secret';
const secret_for_pass = 'pass_secret';

class Token{
    static createForUser(string, date = new Date()){
        const hash = crypto.createHmac('sha512', secret_for_token)
            .update(date+string)
            .digest('hex');
        return {
            hash: hash,
            date: date
        };
    }

    static checkForUser(string, date, hash){
        const token = Token.createForUser(string, date);
        return token.hash === hash;
    }

    static createForEmail(){
        return crypto.randomBytes(64).toString('hex');
    }

    static createForUserPass(string){
        console.log(string);
        const hash = crypto.createHmac('sha512', secret_for_pass)
            .update(string)
            .digest('hex');
        return {
            hash: hash
        };
    }
}

module.exports = Token;
