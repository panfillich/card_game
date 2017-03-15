import React, { Component } from 'react'
import ClassNames from 'classnames'

class Button extends Component {

    constructor(props){
        super(props);

        this.disabled = false;
        if(props.disabled){
            this.disabled = true;
        }

        this.action = new Function;
        if(props.action){
            this.action = props.action;
        }

        this.setDisabled    = this.setDisabled.bind(this);
        this.unSetDisabled  = this.unSetDisabled.bind(this);
        this.callAction     = this.callAction.bind(this);
        this.setAction      = this.setAction.bind(this);
    }

    // Включить кнопку
    unSetDisabled(){
        this.disabled = false;
        this.setState();
    }

    // Отключить кнопку
    setDisabled(){
        this.disabled = true;
        this.setState();
    }

    // Установить действие
    setAction(action){
        this.action = action;
    }

    // Вызвать действие
    callAction(){
        if(!this.disabled) {
            this.action();
        }
    }

    render() {
        let class_name = ClassNames({
            "btn": true,
            "btn-primary": true,
            "disabled": this.disabled
        });
        return (
            <button
                type={this.props.type || ''}
                className={class_name}
                onClick={this.callAction}
            >
                {this.props.text}
            </button>
        );
    }
}

export default Button;