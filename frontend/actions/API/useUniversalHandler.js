export default function (URL, CONFIG, callback) {
    fetch(URL, CONFIG).then(function(res){
        if(res.status){
            switch (res.status) {
                case 200:
                    return res.json();
                case 404:
                    return Promise.reject('not_found');
                case 403:
                    return Promise.reject('forbidden');
            }
        }
        return Promise.reject('serv_error');
    }).then(function(data) {
        callback(null, data);
    }).catch(function (reason) {
        callback(reason, null);
    });
}