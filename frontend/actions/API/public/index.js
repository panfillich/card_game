import fetch from 'isomorphic-fetch';

function get() {

}

class Public{

    static checkAPI(){

    }
}

export function checkApi() {
    let text = '';
    text = fetch('http://localhost:3000/pub-api/').then(req => req)
    console.log(text)
}
