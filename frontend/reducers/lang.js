const en_lang = require('../lang/en');
const ru_lang = require('../lang/ru');


const initialState = en_lang;

function setLanguage(result={}, lang) {
    let property;
    for(property in lang){
        result[property] = lang[property];
    }
    return result;
}

/*export default function page(state = initialState) {
 return state
 }*/

export default function lang(state = initialState, action) {
    let result_lang;
    switch (action.type) {
        case 'en':
            result_lang = {state};
            setLanguage(result_lang, en_lang);
            return result_lang;

        case 'ru':
            result_lang = {state};
            setLanguage(result_lang, ru_lang);
            return result_lang;

        default:
            return state;
    }
}

