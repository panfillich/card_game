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

        if(final_config.body){
            final_config.body = JSON.stringify(final_config.body);
        }

        final_config.headers.token = token;
        let final_url = this.SERVER + '/' + url;
        return useUniversalHandler(final_url, final_config, callback);
    }

    getUserInfo(callback){
        this.send('user/me', {method: 'GET'}, callback);
    }


    // --- Работа с коллекцией ---

    // Получить всю коллекцию
    getCollection(callback){
        this.send('collection', {method: 'GET'}, callback);
    }

    // Удалить карту из коллекции
    delCardInCollection(cardId, callback){
        this.send('collection/card/' + cardId, {method: 'DELETE'}, callback);
    }

    // --- Работа с колодами ---

    // Получить краткую информацию о всех колодах
    getDecksInfo(callback){
        this.send('decks', {method: 'GET'}, callback);
    }

    // Получить детальную информацию о колоде
    getDeckInfoDetail(deck_num, callback){
        this.send('decks/' + deck_num, {method: 'GET'}, callback);
    }

    // Cохранить новую колоду
    saveNewDeck(deck_num, body, callback){
        this.send('decks/' + deck_num, {method: 'POST', body: body}, callback);
    }

    // Полностью обновить старую колоду
    updateOldDeck(deck_num, body, callback){
        this.send('decks/' + deck_num, {method: 'PUT', body: body}, callback);
    }

    // Удалить старую колоду
    deleteDeck(deck_num, callback){
        this.send('decks/' + deck_num, {method: 'DELETE'}, callback);
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

