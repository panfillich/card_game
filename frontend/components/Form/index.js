class Validate{

}

class Form{
    constructor(form){
        this.components = {};
        this.fields = {};


        for (let field in form.fields) {
            this.fields[field] = new Field({
                fields: form.fields[field],
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
        if(components.Input) {
            this.components.Input = components.Input;
        }

        if(components.FormGroup) {
            this.components.FormGroup = components.FormGroup;
        }
    }

    changeValue(value, callback){
        this.param.value = value;
        // Валидация
        this.validate();
        // Специальная валидация
        this.form.spec_valid();
        
        callback();
    }

    validate(){

    }
}

export default Form;

