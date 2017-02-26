import React, { Component } from 'react'
import ClassNames from 'classnames'

class Button extends Component {

    constructor(props){
        super(props);
        this.disabled = false;

        if(props.disabled){
            this.disabled = true;
        }

        this.setDisabled = this.setDisabled.bind(this);
        this.unSetDisabled = this.unSetDisabled.bind(this);
        this.callActive = this.callActive.bind(this);
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

    // Действие
    callActive(){
        if(!this.disabled) {
            this.props.action();
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
                onClick={this.callActive}
            >
                {this.props.text}
            </button>
        );
    }
}

export default Button;