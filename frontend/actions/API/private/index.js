import fetch from 'isomorphic-fetch'
import useUniversalHandler from '../useUniversalHandler'
import getToken from '../getToken'

const SERVER = 'http://localhost:3000/priv-api';
// const SERVER = 'http://localhost:3002';

class Private{
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
}

export default Private;

