const STR = 'str'
import {CHECK, LOGIN} from './constants'

let api = []

api[CHECK] = {
    url: '/check',
    method: 'GET',
    header: {
        req: null,
        res: null
    },
    title: 'Проверяем работоспособность public-API'
}

api[LOGIN] = {
    url : '/login',
    method : 'POST',
    header : {
        req : null,
        res : null
    },
    title : 'Логирование',
    structure : {
        user : STR,
        pass : STR
    }
}

export default api



