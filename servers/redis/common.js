
class helperMethods{
    static set_separator(){
        let array = [];
        for(let key in arguments){
            array.push(arguments[key]);
        }
        return array.join(':');
    }
}

module.exports