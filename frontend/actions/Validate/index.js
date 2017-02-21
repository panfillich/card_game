let CommonValidate = require('../../../servers/common_libs/validate');

class Validate{

    // Валидируем и меняем состояние
    static validField(field){
        // Валидируем
        const result = CommonValidate.checkFullValidate(
            [{value: field.value,
              name : field.name,
              type : field.type,
              required: field.required
            }]
        );

        // Меняем состояние
        let fake_form = {};
        fake_form[field.name] = field;
        Validate.changeState(fake_form, result);
    }

    // Валидируем форму и меняем состояние
    static validForm(form){
        //Массив с настройками всех полей
        let fields_props = [];

        //Убираем лишнее
        for (let field in form) {
            fields_props.push({
                value: form[field].value,
                name : form[field].name,
                type : form[field].type,
                required: form[field].required
            });
        }

        const result = CommonValidate.checkFullValidate(fields_props);
        return result;
    }

    // Изменяем состояние формы
    static changeState(form, result){
        const fields = result.detail.fields;
        for (const field in form){
            const result = fields[field].result;
            const value  = fields[field].value;
            if (result == 'valid'){
                // Поле необязательное
                // ошибки нет
                // подтверждения валидности нет
                if(value==''){
                    form[field].type_visual = 'normal';
                    form[field].type_message = '';
                }else {
                    form[field].type_visual = 'success';
                    form[field].type_message = 'valid';
                }
            } else {
                form[field].type_visual = 'error';
                form[field].type_message = result;
            }
        }
    }

    static createMessage(form, lang){
        for (const field in form) {
            const type_message = form[field].type_message;
            const type = form[field].type;
            if(['valid', 'required'].indexOf(type_message) != -1){
                form[field].message = lang[type_message];
            }

            if(type_message == 'invalid'){
                form[field].message = lang[type_message][type];
            }
            // form[field].message = '';
        }
    }
}

export default Validate;



