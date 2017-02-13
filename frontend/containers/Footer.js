import React, { Component } from 'react'
import NavLink from '../components/NavLink'
// let f = require('../actions/API/public');

export default class Footer extends Component {
    render() {
        return (
            <footer className="navbar-default navbar-inverse navbar-fixed-bottom">
                <div className="container-fluid">
                    <span>Footer</span>
                </div>
            </footer>
        )
    }
}
