import fetch from 'isomorphic-fetch'
import encodeForm from '../encodeForm'
import useUniversalHandler from '../useUniversalHandler'

const SERVER = 'http://localhost:3000/pub-api';
// const SERVER = 'http://localhost:3003';

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

        useUniversalHandler(URL, CONFIG, callback);
    }

    static articles(params, callback){
        let page = 1;
        if(params.page){
            if(Number(params.page)>0 && Number(params.page)<5000){
                page = params.page;
            }
        }

        let lang = 'en';
        if(params.lang){
            if(params.lang.length <= 3){
                lang = params.lang;
            }
        }

        const URL = SERVER +'/articles?page=' + page + '&language=' + lang;

        const CONFIG = {
            method: 'GET',
        };

        useUniversalHandler(URL, CONFIG, callback);
    }

    static article(params, callback){
        const URL = SERVER +'/articles/' + params.article_id;

        const CONFIG = {
            method: 'GET',
        };

        useUniversalHandler(URL, CONFIG, callback);
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

