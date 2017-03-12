import React, { Component } from 'react'
import { connect } from 'react-redux'

class FieldMessage extends Component {
    constructor(props){
        super(props);
        // Язык сообщения
        this.lang =  '';
        // Само сообщение
        this.message = '';
        // Тип сообщения
        this.type_message = '';
        // Тип поля
        this.type_field = '';

        this.getMessage

        this.createMessageOnCurrentLanguage = this.createMessageOnCurrentLanguage.bind(this);
        this.check = this.check.bind(this);
    }



    createMessageOnCurrentLanguage(){
        let lang = this.props.lang.validate;
        let type_field = this.type_field;
        let type_message = this.type_message;

        if(['valid', 'required'].indexOf(type_message) != -1){
            this.message = lang[type_message];
        } else if(type_message == 'invalid'){
            this.message = lang[type_message][type_field];
        }
    }

    //Срабатывает перед рендерингом
    check(){
        // Текущий язык приложения
        let cur_lang = this.props.lang.cur_lang;

        // Проверяем изменился ли язык или тип сообщения
        // если нет, то берем из состояния, если да, то заново генерируем сообщение
        if(this.type_message != this.props.type_message || this.type_field != this.props.type_field) {
            this.type_message = this.props.type_message;
            this.type_field   = this.props.type_field;
            this.createMessageOnCurrentLanguage();
        } else if(this.lang != cur_lang){
            this.lang =  cur_lang;
            this.createMessageOnCurrentLanguage();
        }
    }

    render() {
        this.check();
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

export default connect(mapStateToProps)(FieldMessage);