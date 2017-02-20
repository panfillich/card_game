import fetch from 'isomorphic-fetch';

function get() {

}

class Public{
    static checkApi(callback) {
    fetch('http://localhost:3000/pub-api/reg')
        .then(function(req){
            callback(req);
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
