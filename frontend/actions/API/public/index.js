import fetch from 'isomorphic-fetch'
import encodeForm from '../encodeForm'
const SERVER = 'http://localhost:3000/pub-api';

class Public{
    static auth(form, callback){
        const URL = SERVER +'/auth';

        let form_body = encodeForm(form);

        const CONFIG = {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded; charset=utf-8',
                'Accept': 'application/json'
            },
            body: form_body
        };

        fetch(URL, CONFIG).then(function(res){
            if(res.status){
                switch (res.status) {
                    case 200:
                        return res.json();
                    case 404:
                        return Promise.reject('not_found');
                }
            }
            return Promise.reject('serv_error');
        }).then(function(data) {
            callback(null, data);
        }).catch(function (reason) {
            callback(reason, null);
        });
    }





    static checkApi(callback) {
        fetch(SERVER + '/reg', {
            method: 'GET',
            // headers: {
            //     'Accept': 'application/json',
            //     'Authorization': Config.token
            // },
            // credentials: 'same-origin', // you need to add this line
            // body: JSON.stringify(data),
        }).then(function(req){
            // console.log(req.json());
            // callback(req);
            return req.json();
        }).then(function(data) {
            callback(data);
        });
    }
}

export default Public;

// export function checkApi(callback) {
//     let text = '';
//     text = fetch('http://localhost:3000/pub-api/reg')
//         .then(function(req){
//             callback(req);
//         });
// }
