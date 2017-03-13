import React, { Component } from 'react'

class InputText extends Component {
    constructor(props) {
        super(props);

        this.action ={
            onChange : false,
            onBlur   : true
        };

        this._fieldChange   = new Function;

        this._onChange      = this._onChange.bind(this);
        this._onBlur        = this._onBlur.bind(this);

        this.getValue       = this.getValue.bind(this);
        this.setValue       = this.setValue.bind(this);
        this.clearValue     = this.clearValue.bind(this);

        this.setOnAction    = this.setOnAction.bind(this);
        this.resetOnAction  = this.resetOnAction.bind(this);
    }

    _onChange(){
        if(this.action.onChange){
            this._fieldChange();
        }
    }

    _onBlur(){
        if(this.action.onBlur){
            this.action.onBlur = false;
            this.action.onChange = true;
            this._fieldChange();
        }
    }

    // Получить значение поля
    getValue(){
        return this.input.value;
    }

    // Установить новое значение для поля
    setValue(new_value){
        this.input.value = new_value;
    }

    // Очистить поле
    clearValue(){
        this.input.value = '';
    }

    //Установить событие которое будет вызываться при изменении поля
    setOnAction(action){
        this._fieldChange = function () {
            action(this);
        };
    }

    // Убрать проверку после каждого изменения поля,
    // проверка произойдет только после потери фокуса и установит событие onChange
    resetOnAction(){
        this.action.onBlur = false;
        this.action.onChange = true;
    }

    render(){
        return (
            <input
                type = "text" className="form-control" id={this.props.id}
                placeholder = {this.props.placeholder}
                onBlur = {this._onBlur}
                onChange = {this._onChange}
                ref = {(input) => {this.input = input}}
            />
        );
    }
}

export default InputText;