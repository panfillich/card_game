import localStorage from '../LocalStorage';

export default function () {
    if(localStorage.is_local_storage) {
        const TOKEN = localStorage.getItem('token');
        if(TOKEN){
            return TOKEN;
        }
    }
    return false;
}
