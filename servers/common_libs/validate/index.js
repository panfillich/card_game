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


    static _checkGetValueField(obj, field_name){
        let value = obj[field_name];
        return {
            is_value: ([undefined, null, ''].indexOf(value) != -1),
            value: value
        };
    }

    //fields = [
    //   {type: 'email', name:'some_email', required: true},
    //   {type: 'password', name:'some_password', required: true}
    //];
    static checkFullValidate(obj, fields){

        let empty_fields = [];
        let invalid_fields = [];
        let all_fields = {};

        fields.forEach(function (field) {
            all_fields[field.name] = {
                type: field.type
            };

            let result = Validate._checkGetValueField(obj, field.name);
            let is_value = result.is_value;

            if(field.required && is_value){
                empty_fields.push(field.name);
                all_fields[field.name]['result'] = 'required';
                return;
            }

            field.value = result.value;
            let is_valid = Validate._checkValidField(field);
            if(!is_valid){
                invalid_fields.push(field.name);
                all_fields[field.name]['result'] = 'invalid';
                return;
            }

            all_fields[field.name]['result'] = 'valid';
        });

        if(invalid_fields.length != 0 || empty_fields.length != 0){
            return {
                is_valid : false,
                detail: {
                    empty_fields: empty_fields,
                    invalid_fields: invalid_fields,
                    all_fields : all_fields
                }
            }
        }

        return {
            is_valid : true,
            detail: {
                all_fields : all_fields
            }
        }
    }
}

module.exports = Validate;