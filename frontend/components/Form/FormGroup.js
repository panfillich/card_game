import React, { Component } from 'react'
import classNames from 'classnames'

class FormGroup extends Component {
    constructor(props){
        super(props);
        this.state_form = 'normal';
        this.has_success = false;
        this.has_danger  = false;

        this.setNewState  = this.setNewState.bind(this);
    }

    setNewState(state_form){
        if(state_form != this.state_form){
            switch(state_form){
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
            this.state_form = state_form;
        }
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