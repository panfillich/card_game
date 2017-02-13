import React, { Component } from 'react'
import NavLink from '../components/NavLink'

class Nav extends React.Component {
    render(){
        return(
            <nav className="navbar navbar-light bg-faded">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-10 col-md-10">
                            <button className="navbar-toggler hidden-sm-up"
                                    type="button"
                                    data-toggle="collapse"
                                    data-target="#nav-content">
                                ☰
                            </button>
                            <div className="collapse navbar-toggleable-xs" id="nav-content">
                                <a className="navbar-brand" href="#">Logo</a>
                                <ul className="nav navbar-nav">
                                    <li className="nav-item">
                                        <NavLink to='/' onlyActiveOnIndex={true} className="nav-link">Главная</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to='/auth' className="nav-link">Авторизация</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to='/link' className="nav-link">link</NavLink>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

        )
    }
}
export default Nav




