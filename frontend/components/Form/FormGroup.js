import React, { Component } from 'react'
import classNames from 'classnames'

class FormGroup extends Component {
    constructor(props){
        super(props);
        this.state_field = 'normal';
        this.has_success = false;
        this.has_danger  = false;

        this.setFieldState = this.setFieldState.bind(this);
        this.getFieldState = this.getFieldState.bind(this);
    }

    setFieldState(state_field){
        if(state_field != this.state_field){
            switch(state_field){
                case 'success':
                    this.has_success = true;
                    this.has_danger  = false;
                    break;
                case 'error':
                    this.has_success = false;
                    this.has_danger  = true;
                    break;
                default:
                    this.has_success = false;
                    this.has_danger  = false;
            }
            this.state_field = state_field;
        }
    }

    getFieldState(){
        return this.state_field;
    }

    render() {
        let classes = {
            "form-group":  true,
            "has-success": this.has_success,
            "has-danger":  this.has_danger
        }

        let class_name = classNames(classes);

        return (
            <div className={class_name}>
                {this.props.children}
            </div>
        );
    }
}

export default FormGroup;