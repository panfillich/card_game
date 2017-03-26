import { browserHistory } from 'react-router'

class LocalStorage{

    constructor(){
        try {
            this.is_local_storage = 'localStorage' in window && window['localStorage'] !== null;
        } catch (e) {
            this.is_local_storage = false;
        }
        if(this.is_local_storage) {
            this.localStorage = window.localStorage;
        }
        // browserHistory.push('/link');
    }

    // Проверяем наличие localStorage в браузере
    isLocalStorage(){
        return this.is_local_storage;
    }

    clear(){
        this.localStorage.clear();
    }

    setItem(key, value){
        this.localStorage.setItem(key, value);
    }

    getItem(key){
        return this.localStorage.getItem(key);
    }
}

export default new LocalStorage;