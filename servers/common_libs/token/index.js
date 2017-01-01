const crypto = require('crypto');

const secret = 'secret';

class Token{
    static createForUser(string, date = new Date()){
        const hash = crypto.createHmac('sha512', secret)
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
}

module.exports = Token;
