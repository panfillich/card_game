let sprintf = require("sprintf-js").sprintf;
let regExp = require('./regExp');

class Validate{
    //fields = [
    //   {type: 'email', value:'test1@gmail.com'},
    //   {type: 'password', value:'12346578'}
    //];
    static _checkValidField(field){
        let is_valid = regExp[field.type].regExp.test(field.value);
        if(!is_valid){
            return false
        }
        return true;
    };

    //fields = [
    //   {value: 'str', type: 'email', name:'some_email', required: true},
    //   {value: 'str', type: 'password', name:'some_password', required: true}
    //];
    static checkFullValidate(fields=[]){

        let empty_fields = [];
        let invalid_fields = [];
        let res_fields = {};

        fields.forEach(function (field) {
            res_fields[field.name] = {
                type:  field.type,
                value: field.value
            };

            // Проверка на пустоту
            let is_empty = ([undefined, null, ''].indexOf(field.value) != -1);

            // Обязательное ли поле для ввода
            if(field.required && is_empty){
                empty_fields.push(field.name);
                res_fields[field.name]['result'] = 'required';
                return;
            }

            // Если поле не пустое
            if(!is_empty) {
                let is_valid = Validate._checkValidField(field);
                if (!is_valid) {
                    invalid_fields.push(field.name);
                    res_fields[field.name]['result'] = 'invalid';
                    return;
                }
            }

            res_fields[field.name]['result'] = 'valid';
        });

        if(invalid_fields.length != 0 || empty_fields.length != 0){
            return {
                is_valid : false,
                detail: {
                    empty_fields: empty_fields,
                    invalid_fields: invalid_fields,
                    fields : res_fields
                }
            }
        }

        return {
            is_valid : true,
            detail: {
                fields : res_fields
            }
        }
    }
}

module.exports = Validate;