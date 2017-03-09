class Form{
    constructor(form){
        this.components = {};
        this.form = fields;
    }

    checkValid(){

    }

    setButtonComponent(Button){
        this.components.Button = Button;
    }

    setFormMessageComponent(FormMessage){
        this.components.FormMessage = FormMessage;
    }

    setComponents(components){
        if(components.Message) {
            this.components.Message = components.Message;
        }

        if(components.FormGroup) {
            this.components.FormGroup = components.FormGroup;
        }
    }

}

class Field{
    constructor(field){
        this.components = {};
    }

    checkValid(){

    }

    setComponents(components){
        if(components.Input) {
            this.components.Input = components.Input;
        }

        if(components.FormGroup) {
            this.components.FormGroup = components.FormGroup;
        }
    }
}

