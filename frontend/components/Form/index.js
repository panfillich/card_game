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
            type_message = '';

        } else {
            is_valid = false;
            type_visual = 'error';
            type_message = res_param.result;
        }



        if (field_param.result != is_valid || field_param.type_message != type_message) {
            console.log(111);

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
        if(this.components.Input) {
            this.components.Input.clearValue();
        }
    }

    setComponents(components){
        if(components.Input && !this.components.Input) {
            this.components.Input = components.Input;
            this.components.Input.setOnAction(this.changeValue)
        }

        if(components.FormGroup && !this.components.FormGroup) {
            this.components.FormGroup = components.FormGroup;
        }

        if(components.FieldMessage && !this.components.FieldMessage) {
            this.components.FieldMessage = components.FieldMessage.refs.wrappedInstance;
            this.components.FieldMessage.setFieldType(this.param.field_type);
        }
    }

    changeValue(){
        this.param.value = this.components.Input.getValue();
        // Валидация
        this.validate();
        // Специальная валидация с участием нескольких полей
        this.callCustomValidate();

        console.log(this.is_reload);
        // Обновить форму
        this.update();
        console.log(this.is_reload);


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
            // for (let component in this.components) {
            //     this.components[component].setState();
            // }

            console.log(this.components.FieldMessage);

            if(this.components.FieldMessage){
                if(this.components.FieldMessage.getMessageType() != this.param.type_message){
                    console.log(this.param.type_message);
                    this.components.FieldMessage.setMessageType(this.param.type_message);
                    this.components.FieldMessage.setState();
                }
            }

            console.log(111);

            this.is_reload = false;
        }
    }
}

export default Form;

