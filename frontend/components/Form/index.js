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

    sendForm(){

    }

    sendButton(){

    }

    clearForm(){

    }

}

class Field{
    constructor(field){
        this.components = {};
    }

    checkValid(){

    }

    setInputComponent(Input){
        this.components.Input = Input;
    }

    setFormGroupComponent(FormGroup){
        this.components.FormGroup = FormGroup;
    }

}

