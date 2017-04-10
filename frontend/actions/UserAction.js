import LoaderAction from  './LoaderAction';
import localStorage from './LocalStorage';
import API from './API'

function checkToken(token) {
    return function (dispatch, getState) {
        if(localStorage.is_local_storage) {
            if (localStorage.getItem("login") !== null) {
                const TOKEN = localStorage.getItem("token")
                const LOGIN = localStorage.getItem("login");

                let message = getState().lang.auth.loading_message;
                dispatch(LoaderAction.startLoading(message));
                API.private.getUserInfo(function (err, res) {
                    if(!err){
                        if(localStorage.is_local_storage) {
                            if (localStorage.getItem("login") !== null) {
                                const TOKEN = localStorage.getItem("token")
                                const LOGIN = localStorage.getItem("login");
                                API.chat.connect(localStorage.getItem("token"));
                                dispatch({
                                    type  :'LOGIN',
                                    params : {
                                        login   : LOGIN,
                                        token   : TOKEN
                                    },
                                });
                            }
                        }
                    } else {
                        if (localStorage.is_local_storage) {
                            localStorage.clear();
                        }
                    }
                    dispatch(LoaderAction.finishLoading());
                });
            }
        }
    }
}

function authentication(param) {
    return function (dispatch, getState) {
        let message = getState().lang.auth.loading_message;
        dispatch(LoaderAction.startLoading(message));
        API.public.auth({
                'login'    : param.login,
                'password' : param.password
            }, (err, res) => {
                if(!err){
                    const TOKEN = res.detail.token;
                    const LOGIN = res.detail.login;

                    if(localStorage.is_local_storage) {
                        localStorage.setItem('login', LOGIN);
                        localStorage.setItem('token', TOKEN);
                    }
                    API.chat.connect(TOKEN);
                    dispatch({
                        type  :'LOGIN',
                        params : {
                            login   : LOGIN,
                            token   : TOKEN
                        },
                    });
                }else {
                    //Вывод ошибки, т.к. пользователь не найден (по разным причинам)

                }
                dispatch(LoaderAction.finishLoading());
            }
        );
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
    authentication: authentication,
    checkToken: checkToken
}

