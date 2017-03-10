class Form{
    constructor(form){
        this.form = {};
        this.form.fields = form;
        for (const field_name in form.fields){
            this.form[field_name] = new Field(form.fields[field_name]);
        }
    }

    checkValid(){

    }


}

class Field{
    constructor(field){

    }

    setInputAction(input){
        if(!this.input) {
            this.input = input;
        }
    }

    setFormGroupAction(form_group){
        if(!this.form_group) {
            this.form_group = form_group;
        }
    }

    checkValid(){

    }

    renderField(){

    }
}

export default Field;