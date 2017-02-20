let CommonValidate = require('../../../servers/common_libs/validate');

class Validate{
    static checkField(props){
        const result = CommonValidate.checkFullValidate(
            [{value: props.value,
              name : props.name,
              type : props.type,
              required: props.required }]
        );
        return result;
    }

    // fields_props = [props, props, ...]
    static ckeckFields(fields_props){

    }

    static createStates(result){
        let states = [];
        const fields = result.detail.fields;
        for (const field in fields){
            let state = {};
            const result = fields[field].result;
            const value  = fields[field].value;
            if (result == 'valid'){
                // Поле необязательное
                // ошибки нет
                // подтверждения валидности нет
                if(value==''){
                    state[field] = {
                        type_visual: 'normal',
                        type_message: ''
                    };
                }else {
                    state[field] = {
                        type_visual: 'success',
                        type_message: 'valid'
                    };
                }
            } else {
                state[field] = {
                    type_visual: 'error',
                    type_message: result
                };
            }
            states.push(state);
        }
        return states;
    }

    static createMessage(type_message, type_field, lang){

        if(['valid', 'required'].indexOf(type_message) != -1){
            return lang.validate[type_message];
        }

        if(type_message == 'invalid'){
            return lang.validate[type_message][type_field];
        }

        return '';
    }
}

export default Validate;



