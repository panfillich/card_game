import fetch from 'isomorphic-fetch'
import useUniversalHandler from '../useUniversalHandler'
import getToken from '../getToken'

const SERVER = 'http://localhost:3000/priv-api';


class Private{
    constructor(){
        this.SERVER = 'http://localhost:3000/priv-api';
        //this.SERVER = 'http://localhost:3002';
        this.DEF_CONFIG = {
            headers: {
                "Content-Type": "application/json"
            }
        }
    }

    send(url, config, callback){
        let final_config = Object.assign(config, this.DEF_CONFIG);
        let token = getToken();
        if(!token){
            return callback(new Error('invalid_token'),null)
        }
        final_config.headers.token = token;
        let final_url = this.SERVER + '/' + url;
        useUniversalHandler(final_url, final_config, callback);
    }

    getUserInfo(callback){
        this.send('user/me', {method: 'GET'}, callback);
    }
}

/*class Private{
    // Получить информацию по конкретному пользователю
    static getUserInfo(callback){
        const URL = SERVER +'/user/me';

        // get token from local storage
        const TOKEN = getToken();
        if(!TOKEN){
            return callback(new Error('invalid_token'),null)
        }

        const CONFIG = {
            method: 'GET',
            headers: {
                token: getToken()
            }
        };

        useUniversalHandler(URL, CONFIG, callback);
    }

    static getUserCollection(callback){

    }
}*/

export default new Private();

