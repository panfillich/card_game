import localStorage from '../LocalStorage';

export default function () {
    if(localStorage.is_local_storage) {
        return localStorage.getItem('token');
    }
    return '';
}
