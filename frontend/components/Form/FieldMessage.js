import React, { Component } from 'react'
import { connect } from 'react-redux'

class FieldMessage extends Component {
    constructor(props){
        super(props);
        // Тип поля
        this._type_field = '';
        if(props['type_field']){
            this._type_field = props['type_field'];
        }

        // Тип сообщения
        this._type_message = '';

        // Действия с сообщением
        this._messageFunc   = function () {return '';}
        this.getMessage     = this.getMessage.bind(this);
        this.setMessageType = this.setMessageType.bind(this);
        this.getMessageType = this.getMessageType.bind(this);
    }

    getMessage(){
        return this._messageFunc();
    }

    setMessageType(type_message){
        let type_field = this._type_field;
        this._type_message = type_message;

        if(['valid', 'required'].indexOf(type_message) != -1){
            this._messageFunc = function () {
                return this.props.lang.validate[type_message];
            };
        } else if(type_message == 'invalid'){
            this._messageFunc = function () {
                return this.props.lang.validate[type_message][type_field];
            };
        } else {
            this._messageFunc = function () {
                return function () {return '';}
            };
        }
    }

    getMessageType(){
        return this._type_message;
    }

    render() {
        return (
            <div className="form-control-feedback">
                {this.getMessage()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        lang: state.lang
    }
}

export default connect(mapStateToProps, null, null, { withRef: true })(FieldMessage);