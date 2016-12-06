import fetch from 'isomorphic-fetch';
import Private from './private'
import Public from './public'


class API{
    static get public(){
        return Public;
    }

    static get private(){
        return Private;
    }
}

export default API

export function checkApi() {
    let text = '';
    text = fetch('http://localhost:3000/pub-api/').then(req => req)
    console.log(text)
}
