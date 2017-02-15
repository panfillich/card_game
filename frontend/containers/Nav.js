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

    changeLanguage() {
        let { changeLanguage } = this.props;
        changeLanguage('ru');
        // Injected by react-redux:
        // console.log(1);
        // let { dispatch } = this.props
        // let action = LangAction.changeLanguage('ru')
        // dispatch(action)

    }

    render(){
        const { user, lang } = this.props;


        return(
            <nav className="navbar navbar-light bg-faded">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-8 col-md-8">
                            <button className="navbar-toggler hidden-sm-up"
                                    type="button"
                                    data-toggle="collapse"
                                    data-target=".nav-content">
                                ☰
                            </button>
                            <div className="collapse navbar-toggleable-xs nav-content" >
                                <a className="navbar-brand" href="#">Logo</a>

                                <ul className="nav navbar-nav">
                                    <li className="nav-item">
                                        <NavLink to='/' onlyActiveOnIndex={true} className="nav-link">{lang.nav.menu.main}</NavLink>
                                    </li>

                                    <li className="nav-item">
                                        <NavLink to='/auth' className="nav-link">{lang.nav.menu.auth}</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to='/reg' className="nav-link">{lang.nav.menu.reg}</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to='/link' className="nav-link">link</NavLink>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm-2 col-md-2">
                            <button onClick={this.changeLanguage}>test</button>
                            <span>{user.login}</span>
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
