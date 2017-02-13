
import React, { Component } from 'react'
// import NavLink from '../components/NavLink'
// let f = require('../actions/API/public');

export default class Content extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-10 col-md-10">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}


