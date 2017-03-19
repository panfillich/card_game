import LocalStorage from './LocalStorage';

function login(param) {
    LocalStorage.setItem('login', param.login);
    LocalStorage.setItem('token', param.token);
    return {
        type  :'login',
        params : {
            is_auth : true,
            login   : param.login,
            token   : param.token
        },
    }
}

function logout() {
    LocalStorage.clear();
    return {
        type : 'logout',
        params : {
            is_auth: false,
            login: '',
            token: ''
        }
    }
}

export default {
    logout: logout,
    login:  login
}

