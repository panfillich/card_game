import React, { Component } from 'react'
import Helmet from "react-helmet"
import { connect } from 'react-redux'
import classNames from 'classnames'
import Content from '../containers/Content'

let Validate = require('../../servers/common_libs/validate');

class Auth extends Component {

    constructor(props) {
        super(props);
        this.state ={
            email: {
                is_success: false,
                is_danger: false,
                res_valid: null
            },
            pass: {
                is_success: false,
                is_danger: false,
                res_valid:  null
            }
        };
        this.handleElemChange = this.handleElemChange.bind(this);
    }

    handleElemChange(e){
        console.log(e.target.id);

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
        this.setState(states[0]);
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

        let email_class_value = def_class_value,
            pass_class_value  = def_class_value;

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

        pass_class_value["has-success"] = this.state.pass.is_success;
        pass_class_value["has-success"] = this.state.pass.is_danger;

        const auth_email_div_class  = classNames(email_class_value),
              auth_pass_div_class   = classNames(pass_class_value);

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
                    <form>


                        <div className={auth_email_div_class}>
                            <label className="form-control-label" htmlFor="auth-email">{lang.auth.form.email.label}</label>
                            <input type="text" className="form-control" id="auth-email" aria-describedby="emailHelp"
                                   placeholder={lang.auth.form.email.placeholder}
                                   onBlur={this.handleElemChange}
                            />
                            <div className="form-control-feedback">{email_alert}</div>
                            <small id="emailHelp" className="form-text text-muted">{lang.auth.form.email.text}</small>
                        </div>
                        <div className={auth_pass_div_class}>
                            <label for="auth-pass">{lang.auth.form.password.label}</label>
                            <input type="text" className="form-control"
                                   id="auth-pass" placeholder={lang.auth.form.password.placeholder}
                                   onBlur={this.handleElemChange}
                            />
                            <div className="form-control-feedback">{email_alert}</div>
                        </div>
                        <button type="submit" className="btn btn-primary">{lang.auth.form.button.name}</button>
                    </form>
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

export default connect(mapStateToProps)(Auth);