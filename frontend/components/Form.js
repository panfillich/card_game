import React, { Component } from 'react'
import classNames from 'classnames'

class FormGroup extends Component {
    render() {
        let classes = {
            "form-group":  true,
            "has-success": false,
            "has-danger":  false
        }
        switch(this.props.type_visual){
            case 'success':
                classes['has-success'] = true;
                classes['has-danger']  = false;
                break;
            case 'error':
                classes['has-success'] = false;
                classes['has-danger']  = true;
                break;
            default:
                classes['has-success'] = false;
                classes['has-danger']  = false;
        }

        let class_name = classNames(classes);

        return (
            <div className={class_name}>
                {this.props.children}
            </div>
        );
    }
}

class InputText extends Component {

    constructor(props) {
        super(props);
        this.action ={
            onChange: new Function,
            onBlur: new Function
        };
        this.callTransFunc = this.callTransFunc.bind(this);
        this.getInfo  = this.getInfo.bind(this);
    }

    callTransFunc(){
        this.props.handleElemChange(this.getInfo());
    }

    getInfo(){
        let info = {
            value: this.input.value,
            type:  this.props.type_field,
            name:  this.props.name_field,
            required: false
        };

        if(this.props.required){
            info.required = true;
        }

        return info;
    }

    render(){
        if(this.props.type_visual != 'normal'){
            this.action.onBlur   = new Function;
            this.action.onChange = this.callTransFunc;
        } else {
            this.action.onBlur   = this.callTransFunc;
            this.action.onChange = new Function;
        }
        return (
            <input  type="text" className="form-control" id={this.props.id}
                    placeholder={this.props.placeholder}
                    onBlur={this.action.onBlur}
                    onChange={this.action.onChange}
                    ref={(input) => {this.input = input}}
            />
         );
    }
}

class Label extends Component {
    render() {
        return (
            <label className="form-control-label" htmlFor={this.props.for}>
                {this.props.text}
            </label>
        );
    }
}

class Message extends Component {
    render() {
        return (
            <div className="form-control-feedback">{this.props.text}</div>
        );
    }
}

class Small extends Component {
    render() {
        return (
            <small className="form-text text-muted">{this.props.text}</small>
        );
    }
}



let Form = {
    FormGroup: FormGroup,
    Label: Label,
    Message: Message,
    Small: Small,
    InputText: InputText
}

module.exports = Form;