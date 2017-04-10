import LoaderAction from  './LoaderAction';
import localStorage from './LocalStorage';
import API from './API'


function authentication(param) {
    return function (dispatch, getState) {
        dispatch(LoaderAction.startLoading());
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
                    dispatch({
                        type  :'LOGIN',
                        params : {
                            login   : LOGIN,
                            token   : TOKEN
                        },
                    });
                    API.chat.connect(res.token.token);
                }else {

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
    authentication: authentication
}

