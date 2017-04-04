import localStorage from './LocalStorage';
import API from './API'

function login(param) {

    API.chat.connect(param.token);

    if(localStorage.is_local_storage) {
        localStorage.setItem('login', param.login);
        localStorage.setItem('token', param.token);
    }
    return {
        type  :'LOGIN',
        params : {
            login   : param.login,
            token   : param.token
        },
    }
}

function logout() {
    API.chat.disconnect();
    if(localStorage.is_local_storage) {
        localStorage.clear();
    }
    return {
        type : 'LOGOUT'
    }
}

export default {
    logout: logout,
    login:  login
}

