let CommonValidate = require('../../../servers/common_libs/validate');
import store from '../../store';

class Validate{
    // Валидируем и меняем состояние
    static validField(field){
        let param = field.param;
        // Валидируем
        const result = CommonValidate.checkFullValidate(
            [{  value     : param.value,
                name      : param.name,
                type      : param.type,
                required  : param.required
            }]
        );
        Validate.changeFieldState(field, result);
    }

    static changeFieldState(field, result){
        let field_param = field.param;
        let res_param   = result.detail.fields[field_param.name];

        // Устанавливаем/меняем типы сообщений
        // и заменяем предыдущий результат валидации
        let is_valid, type_visual, type_message;

        if (res_param.result == 'valid'){
            is_valid = true;
            type_visual = 'normal';
            type_message = 'valid';

        } else {
            is_valid = false;
            type_visual = 'error';
            type_message = res_param.result;
        }


        if (field_param.is_valid != is_valid || field_param.type_message != type_message) {

            field_param.is_valid     = is_valid;
            field_param.type_visual  = type_visual;
            field_param.type_message = type_message;

            if(!field.is_reload) {
                field.is_reload = true;
            }
        }
    }

    // Валидируем форму и меняем состояние
    // Возвращает true, если форма валидна
    static validForm(form){

        let is_valid = true;

        return is_valid;
    }
}

class Form{
    constructor(form){
        this.components = {};
        this.fields = {};

        for (let field in form.fields) {
            form.fields[field]['name'] = field;
            this.fields[field] = new Field({
                field: form.fields[field],
                form: this
            });
        }
    }

    checkValid(){
        let is_valid = true;
        for (let field_name in this.fields) {
            let field = this.fields[field_name];
            if(!field.param.is_valid){
               if(is_valid){
                   is_valid = false;
               }

               if(field.param.type_visual = 'normal'){
                   field.validate();
                   field.update();
               }
            }
        }
        return is_valid;
    }

    setButtonComponent(Button){
        this.components.Button = Button;
    }

    clearForm(){
        for (let field in this.fields) {
            this.fields[field].clearField();
        }
    }

    setComponents(components){
        if(components.Message) {
            this.components.Message = components.Message;
        }
    }
}

class Field{
    constructor(prop){
        this.components = {};

        this.form = prop.form;
        this.param = prop.field;
        this.changeValue = this.changeValue.bind(this);
    }

    clearField(){
        this.is_reload            = true;
        this.param.value          = this.param.def_value;
        this.param._is_reset_on_action = true;
        this.param.type_visual    = 'normal';
        this.param.type_message   = '';


        this.update();
    }

    setComponents(components){
        if(components.Input && !this.components.Input) {
            this.components.Input = components.Input;
            this.components.Input.setOnAction(this.changeValue)
        }

        // Вид(цвет) валидируемого поля
        if(components.FormGroup && !this.components.FormGroup) {
            this.components.FormGroup = components.FormGroup;
        }

        // Сообщение валидатора
        if(components.FieldMessage && !this.components.FieldMessage) {
            this.components.FieldMessage = components.FieldMessage.refs.wrappedInstance;
        }

        // Кнопка отправки формы
        if(components.SendFormButton && !this.components.SendFormButton) {
            this.components.SendFormButton = components.SendFormButton;
        }
    }

    changeValue(){
        this.param.value = this.components.Input.getValue();
        // Валидация
        this.validate();
        // Специальная валидация с участием нескольких полей
        this.callCustomValidate();

        // Обновить форму
        this.update();
    }

    validate(){
        Validate.validField(this);
    }

    setCustomValidate(){

    }

    callCustomValidate(){

    }

    update(){
        if(this.is_reload) {
            //Если значение изменилось при валидации
            if(this.components.Input){
                let is_set_state = false;

                if(this.components.Input.getValue() != this.param.value){
                    this.components.Input.setValue(this.param.value);
                    if(!is_set_state){
                        is_set_state = true;
                    }
                }

                if(this.param._is_reset_on_action){
                    this.param._is_reset_on_action = false;
                    this.components.Input.resetOnAction();
                    if(!is_set_state){
                        is_set_state = true;
                    }
                }

                if(is_set_state){
                    this.components.Input.setState();
                }
            }

            // Тип сообщения формы
            if(this.components.FieldMessage){
                if(this.components.FieldMessage.getMessageType() != this.param.type_message){
                    this.components.FieldMessage.setMessageType(this.param.type_message);
                    this.components.FieldMessage.setState();
                }
            }

            // Вид(цвет) поля формы
            if(this.components.FormGroup.getFieldState() != this.param.type_visual){
                this.components.FormGroup.setFieldState(this.param.type_visual);
                this.components.FormGroup.setState();
            }

            this.is_reload = false;
        }
    }
}

export default Form;

