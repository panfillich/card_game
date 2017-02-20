import React, { Component } from 'react'
import Helmet from "react-helmet"
import { connect } from 'react-redux'
import classNames from 'classnames'
import Content from '../containers/Content'
import ReactDOM from 'react-dom';
import Form, {FormGroup, Label, Message, Small, InputText} from '../components/Form'

let Validate = require('../../servers/common_libs/validate');

class Auth extends Component {

    constructor(props) {
        super(props);
        this.state ={
            email: {
                type: 'error',
                messages: []
            },
            pass: {
                type: 'normal',
                messages: []
            }
        };

        this.form = {
            email: {
                id: "auth-email",
                type: "email",
            }
        };
        this.handleElemChange = this.handleElemChange.bind(this);
        // this.getChildContext = this.getChildContext.bind(this);
    }

    getChildContext() {
        return {name: 'hhh'};
    }

    // param = {
    //    name
    //    type,
    //    value
    // }
    handleElemChange(param){

    }

    handleElemChange1(e){
        // console.log(this.refs['auth-email'])

        console.log(this.input.getValue());


        //Узнаем id элемента
        let id = e.target.id;
        //Значение элемента
        let value = e.target.value;

        let result;
        switch (id) {
            case 'auth-email':
                result = Validate.checkFullValidate(
                    { email: value},
                    [{ name : 'email', type : 'email', required: true }]
                );

                break;
            case 'auth-pass':
                result = Validate.checkFullValidate(
                    { pass: value},
                    [{ name : 'pass', type : 'password', required: true }]
                );
                break;
        }

        const states = this._parseValidate(result);
        // this.setState(states[0]);
    }

    _parseValidate(result){
        let states = [];
        const all_fields = result.detail.all_fields;
        for (const field in all_fields){
            let state = {};
            const result = all_fields[field].result;
            if (result == 'valid'){
                state[field] = {
                    is_success : true,
                    is_danger  : false,
                };
            } else {
                state[field] = {
                    is_success : false,
                    is_danger  : true,
                };
            }
            state[field]['res_valid'] = result;
            states.push(state);

            console.log(state);
        }
        return states;
    }

    render() {
        const { lang } = this.props;

        let def_class_value = {
            "form-group": true
        };

        let email_class_value = {
            "form-group": true
        };;
        let pass_class_value  = {
            "form-group": true
        };;

        console.log(this.state.email);
        email_class_value["has-danger"]  = this.state.email.is_danger;
        email_class_value["has-success"] = this.state.email.is_success;

        let email_alert = '';
        if(this.state.email.res_valid){
             if(this.state.email.res_valid == 'invalid'){
                 email_alert = lang.validate.invalid.email;
             } else {
                 email_alert = lang.validate[this.state.email.res_valid];
             }
        }

        console.log(email_class_value);

        pass_class_value["has-success"] = this.state.pass.is_success;
        pass_class_value["has-danger"] = this.state.pass.is_danger;

        console.log(email_class_value);

        let auth_email_div_class  = classNames(email_class_value);
        let auth_pass_div_class   = classNames(pass_class_value);

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

                    <FormGroup type={this.state.email.type}>
                        <Label for="auth-email" text={lang.auth.form.email.label}/>
                        <InputText
                            ref={(input) => {this.form.email.InputText = input}}
                            id="auth-email" typeField="email"
                            handleElemChange={this.handleElemChange}
                            placeholder={lang.auth.form.email.placeholder}
                        />
                        {/*<input type="text" className="form-control" id="auth-email" aria-describedby="emailHelp"*/}
                               {/*placeholder={lang.auth.form.email.placeholder}*/}
                               {/*onBlur={this.handleElemChange}*/}
                        {/*/>*/}
                        <Message text={this.state.email.message}/>
                        <Small text={lang.auth.form.email.text}/>
                    </FormGroup>


                        <div className={auth_pass_div_class}>
                            <label className="form-control-label" for="auth-pass">{lang.auth.form.password.label}</label>
                            <input type="text" className="form-control"
                                   id="auth-pass" placeholder={lang.auth.form.password.placeholder}
                                   onBlur={this.handleElemChange}
                            />
                            {/*<div className="form-control-feedback">{email_alert}</div>*/}
                        </div>
                        <button type="submit" className="btn btn-primary">{lang.auth.form.button.name}</button>
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

export default connect(mapStateToProps)(Auth);