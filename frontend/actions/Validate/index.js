let CommonValidate = require('../../../servers/common_libs/validate');
import store from '../../store';

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
    // Возвращает true, если форма валидна
    static validForm(form){
        let is_valid = true;

        // Мы не делеаем валидацию аналогично валидации поля
        // т.к. она скорее всего УЖЕ была проведена, смотрим на результат
        for (let field in form) {
            // Есть ошибки или поле обязательно для заполнения, но не заполненно
            if(!form[field].is_valid){
                is_valid = false;

                if(form[field].type_visual != 'error'){
                    //Меняем состояние поля
                    form[field].type_visual = 'error';
                    form[field].type_message = 'required';

                    let fake_form = {};
                    fake_form[field.name] = form[field];
                    Validate.createMessage(fake_form);
                }
            }
        }
        return is_valid;
    }

    // Изменяем состояние формы
    static changeState(form, result){
        // Устанавливаем/меняем типы сообщений
        // и заменяем предыдущий результат валидации
        const fields = result.detail.fields;
        for (const field in form){
            form[field].is_valid = false;
            const result = fields[field].result;
            const value  = fields[field].value;
            if (result == 'valid'){
                form[field].is_valid = true;
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
        // Устанавливаем/меняем сообщения на текущем языке
        Validate.createMessage(form);
    }

    static createMessage(form){
        let current_state_store = store.getState();
        const lang = current_state_store.lang.validate;
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



