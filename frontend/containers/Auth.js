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
        this.form = {
            email: {
                name: "email",
                id: 'auth_email',
                type: 'email',
                required: true,
                type_message: '',
                message: '',
                type_visual: 'normal',
                is_valid: false,
                value: ''
            },
            pass: {
                name: "pass",
                id: 'auth_pass',
                type: 'password',
                required: true,
                type_message: '',
                message: '',
                type_visual: 'normal',
                is_valid: false,
                value: ''
            }
        };

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
                    <p className="text-muted">{lang.tagline}</p>

                    <div className="alert alert-success" role="alert">
                         <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                         </button>
                         <strong>Holy guacamole!</strong> 111
                    </div>

                    <form action="#" id="auth-form">
                        <FormGroup type_visual = {email.type_visual}>
                            <Label for  = {email.id} text = {lang.form.email.label} />
                            <InputText id={email.id}
                                ref={(input) => {email.field = input}}
                                name_field = {email.name}
                                type_field = {email.type}
                                type_visual= {email.type_visual}
                                required   = {email.required}
                                placeholder= {lang.form.email.placeholder}
                                handleElemChange={this.handleElemChange}
                            />
                            <Message text={email.message}/>
                            <Small text={lang.form.email.text}/>
                        </FormGroup>

                        <FormGroup type_visual={pass.type_visual}>
                            <Label for={pass.id} text={lang.form.pass.label}/>
                            <InputText id={pass.id}
                                ref={(input) => {pass.field = input}}
                                name_field = {pass.name}
                                type_field = {pass.type}
                                type_visual= {email.type_visual}
                                required   = {pass.required}
                                placeholder= {lang.form.pass.placeholder}
                                handleElemChange={this.handleElemChange}
                            />
                            <Message text={pass.message}/>
                            <Small text={lang.form.pass.text}/>
                        </FormGroup>
                        <button
                            type="submit" className="btn btn-primary"
                            onClick={this.sendForm}
                        >
                            {lang.form.button.name}
                        </button>
                    </form>
                </Content>
            </div>
        );
    }
}

Auth.childContextTypes = {
    name: React.PropTypes.string.isRequired
};


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