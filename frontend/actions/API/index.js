import fetch from 'isomorphic-fetch';
import Private from './private'
import Public from './public'


let API = {
    public  : Public,
    private : Private
}

export default API

export function checkApi() {
    let text = '';
    text = fetch('http://localhost:3000/pub-api/').then(req => req)
    console.log(text)
}
