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


class Form{
    constructor(form){
        this.form = fields;
    }


    checkValid(){

    }
}

class Field{
    constructor(field){

    }

    setInputAction(input){

    }

    setFormGroupAction(form_group){

    }


}



class Auth extends Component {
    constructor(props) {
        super(props);

        // Cостояние формы по умолчанию
        this.form = {
            email: new Field({
                name: "pass",
                id: 'auth_pass',
                type: 'password',
                required: true,
                type_message: '',
                is_valid: false
            }),
            pass: {
                name: "pass",
                id: 'auth_pass',
                type: 'password',
                required: true,
                type_message: '',
                is_valid: false
            }
        };
    }

    componentDidMount(){

    }



    render() {
        return (
            <div>
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