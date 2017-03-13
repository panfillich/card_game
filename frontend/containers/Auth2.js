import React, { Component } from 'react'
import Helmet from "react-helmet"
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import Content from '../containers/Content'

import Form from  '../components/Form/'

import FieldMessage from '../components/Form/FieldMessage'
import FormGroup    from '../components/Form/FormGroup'
import InputText    from '../components/Form/InputText'
import Label        from '../components/Form/Label'
import Small        from '../components/Form/Small'
import Button       from '../components/Form/Button'

import Loader from '../actions/LoaderAction'
import API from '../actions/API'


class Auth extends Component {
    constructor(props) {
        super(props);

        // Внутренние переменные, в которые передаем компоненты
        this._email = {};

        // Cостояние формы по умолчанию
        let form = {
            type: "auth",
            message: '',
            fields: {
                email: {                    
                    id: 'auth_email',
                    type: 'email',
                    required: true,
                    type_message: '',
                    type_visual: 'normal',
                    is_valid: false,
                    value: ''
                },
                pass: {
                    id: 'auth_pass',
                    type: 'password',
                    required: true,
                    type_message: '',
                    type_visual: 'normal',
                    is_valid: false,
                    value: ''
                }                
            }
        };

        this.form = new Form(form);
    }

    render() {
        const lang = this.props.lang.auth;

        let email = this.form.fields.email;

        return (
            <div>
                <Helmet
                    title={lang.title}
                />
                <Content>
                    <h2>
                        {lang.header}
                    </h2>

                    <form action="#" id="auth-form">
                        <FormGroup ref = {(formGroup) => {email.setComponents({FormGroup : formGroup})}}>
                            <Label for  = {email.param.id}
                                   text = {lang.form.email.label}
                            />
                            <InputText ref  = {(input) => {email.setComponents({Input : input})}}
                                id          = {email.param.id}
                                name_field  = {email.param.name}
                                type_field  = {email.param.type}
                                type_visual = {email.param.type_visual}
                                required    = {email.param.required}
                                placeholder = {lang.form.email.placeholder}
                            />
                            <FieldMessage ref  = {(fieldMessage) => {email.setComponents({FieldMessage : fieldMessage})}}/>
                            <Small text={lang.form.email.text}/>
                        </FormGroup>


                    </form>

                    {/*<form action="#" id="auth-form">*/}
                        {/*<FormGroup ref={(input) => {email.field = input}}>*/}
                            {/*<Label for  = {email.id} text = {lang.form.email.label} />*/}
                            {/*<InputText id={email.id}*/}
                                       {/*ref={(input) => {email.field = input}}*/}
                                       {/*name_field = {email.name}*/}
                                       {/*type_field = {email.type}*/}
                                       {/*type_visual= {email.type_visual}*/}
                                       {/*required   = {email.required}*/}
                                       {/*placeholder= {lang.form.email.placeholder}*/}
                                       {/*handleElemChange={this.handleElemChange}*/}
                            {/*/>*/}
                            {/*<Message text={email.message}/>*/}
                            {/*<Small text={lang.form.email.text}/>*/}
                        {/*</FormGroup>*/}
                        {/**/}
                        {/*<FormGroup type_visual={pass.type_visual}>*/}
                            {/*<Label for={pass.id} text={lang.form.pass.label}/>*/}
                            {/*<InputText id={pass.id}*/}
                                       {/*ref={(input) => {pass.field = input}}*/}
                                       {/*name_field = {pass.name}*/}
                                       {/*type_field = {pass.type}*/}
                                       {/*type_visual= {email.type_visual}*/}
                                       {/*required   = {pass.required}*/}
                                       {/*placeholder= {lang.form.pass.placeholder}*/}
                            {/*/>*/}
                            {/*<Message text={pass.message}/>*/}
                            {/*<Small text={lang.form.pass.text}/>*/}
                        {/*</FormGroup>*/}
                        {/*<button*/}
                            {/*type="submit" className="btn btn-primary"*/}
                            {/*onClick={this.sendForm}*/}
                        {/*>*/}
                            {/*{lang.form.button.name}*/}
                        {/*</button>*/}
                    {/*</form>*/}

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