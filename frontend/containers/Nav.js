import React, { Component } from 'react'
import NavLink from '../components/NavLink'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import * as LangAction from '../actions/LangAction'
class Nav extends React.Component {
    //componentDidMount
    constructor(props) {
        super(props);
        this.changeLanguage = this.changeLanguage.bind(this);
    }

    changeLanguage(obj) {
        let language = obj.target.getAttribute('value');
        let { changeLanguage } = this.props;
        changeLanguage(language);

        // Injected by react-redux:
        // console.log(1);
        // let { dispatch } = this.props
        // let action = LangAction.changeLanguage('ru')
        // dispatch(action)

    }

    render(){
        const { lang, user } = this.props;
            let auth_block = '';
            let reg_block  = '';
            let user_block = '';

            // Если пользователь не авторизирован
            if(!user.is_auth){
                // Авторизация
                auth_block =(
                    <li className="nav-item">
                        <NavLink to='/auth' className="nav-link">{lang.nav.menu.auth}</NavLink>
                    </li>
                );

                // Регистрация
                reg_block =(
                    <li className="nav-item">
                        <NavLink to='/reg' className="nav-link">{lang.nav.menu.reg}</NavLink>
                    </li>
                );
            } else {
                // Блок зарегестрированного пользователя
                user_block = (
                    <li className="nav-item">
                        <NavLink to='/user' className="nav-link">{user.login}</NavLink>
                    </li>
                );
            }

        return(
        <nav className="navbar navbar-light bg-faded">
        <div className="container">
        <div className="row ">
            <button type="button"
                    className="navbar-toggle hidden-sm-up "
                    data-toggle="collapse"
                    data-target="#bs-example-navbar-collapse-1"
                   >
                <span className="sr-only">Toggle navigation</span>
                ☰
            </button>

            <div className="collapse navbar-toggleable-xs" id="bs-example-navbar-collapse-1">
                <a className="navbar-brand hidden-sm-down" href="#">Logo</a>
                <ul className="nav navbar-nav">
                    <li className="nav-item">
                        <NavLink to='/' onlyActiveOnIndex={true} className="nav-link">{lang.nav.menu.main}</NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink to='/link' className="nav-link">link</NavLink>
                    </li>
                </ul>

                <ul className="nav navbar-nav float-xs-left float-sm-right">
                    {auth_block}
                    {reg_block}
                    {user_block}
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle"
                           href="http://example.com"
                           id="dropdown01"
                           data-toggle="dropdown"
                           aria-haspopup="true"
                           aria-expanded="false">{lang.nav.menu.lang} ({lang.lang})</a>
                        <div className="dropdown-menu float-left" aria-labelledby="dropdown01">
                            <a className="dropdown-item" onClick={this.changeLanguage} value="en" href="#">English (en)</a>
                            <a className="dropdown-item" onClick={this.changeLanguage} value="ru" href="#">Русский (ru)</a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        </div>
        </nav>
        )
    }
}

Nav.propTypes = {
    // user: React.PropTypes.string
};

Nav.defaultProps = {
    // user: 'Undefined Product',
    price: 100,
    initialQty: 0
};

function mapStateToProps(state) {
    return {
        user: state.user,
        lang: state.lang
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changeLanguage: bindActionCreators(LangAction.changeLanguage, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
