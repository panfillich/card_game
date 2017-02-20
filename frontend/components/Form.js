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
        this.state ={
            onChange: new Function,
            onBlur: this.onBlur.bind(this)
        };
        this.onChange = this.onChange.bind(this);
        this.getInfo  = this.getInfo.bind(this);
    }

    onBlur(){
        this.setState({
            onChange: this.onChange,
            onBlur:   new Function,
        });
        this.props.handleElemChange(this.getInfo());
    }

    onChange(){
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

    render()
    {
        return (
            <input  type="text" className="form-control" id={this.props.id}
                    placeholder={this.props.placeholder}
                    value={this.state.value}
                    onBlur={this.state.onBlur}
                    onChange={this.state.onChange}
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