import React, { Component } from 'react'
import Helmet from "react-helmet"
import { connect } from 'react-redux'

import Content from '../containers/Content'

class Auth extends Component {

    constructor(props) {
        super(props);
        this.state ={
            email: {
                is_error: false,
                error: ''
            },
            password: {
                is_error: false,
                error: ''
            }
        }
        this.handleElemChange = this.handleElemChange.bind(this);
    }

    handleElemChange(e){
        //Узнаем id элемента
        let id = e.target.id;

        this.setState({email: e.target.value});
    }

    render() {
        const { lang } = this.props;
        console.log(this.state.email)
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
                        <div className="form-group">
                            <label for="auth-email">{lang.auth.form.email.label}</label>
                            <input type="email" className="form-control" id="auth-email" aria-describedby="emailHelp"
                                   placeholder={lang.auth.form.email.placeholder}
                                   onBlur={this.handleElemChange}
                            />
                            {/*onChange={this.handleEmailChange}*/}
                            <small id="emailHelp" className="form-text text-muted">{lang.auth.form.email.text}</small>
                        </div>
                        <div className="form-group">
                            <label for="exampleInputPassword1">{lang.auth.form.password.label}</label>
                            <input type="password" className="form-control"
                                   id="exampleInputPassword1" placeholder={lang.auth.form.password.placeholder}/>
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