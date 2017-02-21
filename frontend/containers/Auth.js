import React, { Component } from 'react'
import Helmet from "react-helmet"
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import Content from '../containers/Content'
import Form, {FormGroup, Label, Message, Small, InputText} from '../components/Form'
import Validate from '../actions/Validate'
import Loader from '../actions/LoaderAction'
import API from '../actions/API/public'

class Auth extends Component {
    constructor(props) {
        super(props);

        // Cостояние формы
        this.form = {
            email: {
                name: "email",
                id: 'auth_email',
                type: 'email',
                required: true,
                type_message: '',
                message: '',
                type_visual: 'normal',
                validate: 'invalid',
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
                validate: 'invalid',
                value: ''
            }
        };

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


    // Отправка формы
    sendForm(){
        //Запускаем глобальную валидацию
        // console.dir(this.form);

        Validate.ckeckFieldsByForm(this.form);

        const { lang, startLoading, finishLoading} = this.props;
        //Запускаем отображение процесса загрузки + блокируем экран
        startLoading(lang.auth.loading_message);
        API.checkApi((req) => {
            console.log(req.json());
            finishLoading();
        });
    }

    render() {
        const lang = this.props.lang.auth;
        
        let form = this.form;
        let email = form.email;
        let pass = form.pass;

        // создаем сообщения
        Validate.createMessage(form, this.props.lang.validate);

        console.log(form);

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

                    <form id="auth-form">
                        <FormGroup type_visual = {email.type_visual}>
                            <Label
                                for  = {email.id}
                                text = {lang.form.email.label}
                            />
                            <InputText id={email.id}
                                ref={(input) => {email.field = input}}
                                name_field = {email.name}
                                type_field = {email.type}
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