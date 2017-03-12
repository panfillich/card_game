import React, { Component } from 'react'

class FormGroup extends Component {
    constructor(props){
        super(props);
        this.state = 'normal';
        this.has_success = false;
        this.has_danger  = false;

        this.setNewState  = this.setNewState.bind(this);
    }

    setNewState(state){
        if(state != this.state){
            switch(state){
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
            this.state = state;
        }

        this.has_success = false;
        this.has_danger  = false;
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