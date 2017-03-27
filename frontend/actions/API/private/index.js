import fetch from 'isomorphic-fetch'
import useUniversalHandler from '../useUniversalHandler'
import getToken from '../getToken'

const SERVER = 'http://localhost:3000/priv-api';
// const SERVER = 'http://localhost:3002';

class Private{
    // Получить информацию по конкретному пользователю
    static me(callback){
        const URL = SERVER +'/user/me';

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

