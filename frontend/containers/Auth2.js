import React, { Component } from 'react'
import Helmet from "react-helmet"
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import Content from '../containers/Content'
import Form, {FormGroup, Label, Message, Small, InputText} from '../components/Form'
import Validate from '../actions/Validate'
import Loader from '../actions/LoaderAction'
import API from '../actions/API'


class Auth extends Component {
    constructor(props) {
        super(props);

        // Cостояние формы по умолчанию
        let form = {
            type: "auth",
            message: '',
            fields: [
                {
                    name: "email",
                    id: 'auth_email',
                    type: 'email',
                    required: true,
                    type_message: '',
                    type_visual: 'normal',
                    is_valid: false,
                    value: ''
                },
                {
                    name: "pass",
                    id: 'auth_pass',
                    type: 'password',
                    required: true,
                    type_message: '',
                    message: '',
                    type_visual: 'normal',
                    is_valid: false,
                    value: ''
                }]
        };

        // Поля формы
        let fields = {

        }

        // Порядок полей

        this.form = form;

        // текущий язык
        this.current_language = props.lang.lang;

        this.handleElemChange = this.handleElemChange.bind(this);
        this.sendForm = this.sendForm.bind(this);
    }


    // Срабатывает при изменении поля
    //
    // Можем получить параметры и так
    // param = this.form.email.field.getInfo()
    handleElemChange(param){
        // Поле формы, где произошло изменение
        let form = this.form;
        let field = form[param.name];

        // Записываем значение поля в форме в this.form (состояние)
        field.value = param.value;

        // Изменяет поле (this.form.field) и меняет состояние
        Validate.validField(field);

        // Применяем изменения
        this.setState();
    }

    setForm(){

    }

    // Отправка формы
    sendForm(){
        // Валидируем форму еще раз
        const is_valid = Validate.validForm(this.form);

        if(is_valid) {
            // Запускаем отображение процесса загрузки + блокируем экран
            const {lang, startLoading, finishLoading} = this.props;

            startLoading(lang.auth.loading_message);
            API.public.auth({
                    'login' : this.form.email.value,
                    'password'  : this.form.pass.value
                }, (err, res) => {
                    if(!err){
                        browserHistory.push('/link');
                    }else {
                        browserHistory.push('/auth');
                    }
                    finishLoading();
                }
            );
        } else {
            // Отображаем ошибки валидации (применяем изменения)
            this.setState();
        }
    }


    render() {
        const lang = this.props.lang.auth;

        let form  = this.form;
        let email = form.email;
        let pass  = form.pass;

        //Проверяем изменился ли язык
        if(this.current_language != this.props.lang.lang){
            //Если изменился, то меняем сообщения валидации
            Validate.createMessage(form);
            this.current_language = this.props.lang.lang;
        }

        return (
            <div>
                <Helmet
                    title={lang.title}
                />
                <Content>
                    <h2>
                        {lang.header}
                    </h2>


                </Content>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        lang: state.lang
    }
}

function mapDispatchToProps(dispatch) {
    return {
        startLoading:  bindActionCreators(Loader.startLoading, dispatch),
        finishLoading: bindActionCreators(Loader.finishLoading, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Auth);