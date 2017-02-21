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
        this.form = {
            email: {
                name: "email",
                id: 'auth_email',
                type: 'email',
                required: true,
                message: ''
            },
            pass: {
                name: "pass",
                id: 'auth_pass',
                type: 'password',
                message: ''
            }
        };

        this.state = {};
        for (const field in this.form) {
            this.state[field] = {
                type_visual: 'normal',
                type_message: ''
            }
        }

        this.handleElemChange = this.handleElemChange.bind(this);
        this.sendForm = this.sendForm.bind(this);
    }

    // Срабатывает при изменении поля
    handleElemChange(param){
        // param = this.form.email.field.getInfo()
        const result = Validate.checkField(param);
        const state  = Validate.createStates(result)[0];
        this.setState(state);
    }

    // Отправка формы
    sendForm(){
        const { lang, startLoading, finishLoading} = this.props;
        //Запускаеи ожидание
        startLoading(lang.auth.loading_message);
        API.checkApi((req) => {
            console.log(req.json());
            finishLoading();
        });
    }

    render() {
        const { lang } = this.props;

        //Меняем язык сообщений
        for (const field in this.form) {
            const type_message = this.state[field].type_message;
            const message = Validate.createMessage(type_message, this.form[field].type, lang);
            this.form[field].message = message;
        }

        return (
            <div>
                <Helmet
                    title={lang.auth.title}
                />
                <Content>
                    <h2>
                        {lang.auth.header}
                    </h2>
                    <p className="text-muted">{lang.auth.tagline}</p>

                    <form id="auth-form">
                        <FormGroup type_visual={this.state.email.type_visual}>
                            <Label for={this.form.email.id} text={lang.auth.form.email.label}/>
                            <InputText
                                ref={(input) => {this.form.email.field = input}}
                                name_field={this.form.email.name} type_field={this.form.email.type}
                                id={this.form.email.id} required={true}
                                handleElemChange={this.handleElemChange}
                                placeholder={lang.auth.form.email.placeholder}
                            />
                            <Message text={this.form.email.message}/>
                            <Small text={lang.auth.form.email.text}/>
                        </FormGroup>

                        <FormGroup type_visual={this.state.pass.type_visual}>
                            <Label for={this.form.pass.id} text={lang.auth.form.pass.label}/>
                            <InputText
                                ref={(input) => {this.form.pass.field = input}}
                                name_field={this.form.pass.name} type_field={this.form.pass.type}
                                id={this.form.pass.id} required={true}
                                handleElemChange={this.handleElemChange}
                                placeholder={lang.auth.form.pass.placeholder}
                            />
                            <Message text={this.form.pass.message}/>
                            <Small text={lang.auth.form.pass.text}/>
                        </FormGroup>
                        <button
                            type="submit" className="btn btn-primary"
                            onClick={this.sendForm}
                        >
                            {lang.auth.form.button.name}
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