import React, { Component } from 'react'
import Helmet from "react-helmet"
import { connect } from 'react-redux'
import {Link} from 'react-router'

class Auth extends Component {
    render() {

        let land = this.props.lang.main;

        return (
            <div>
                <Helmet
                    title={land.title}
                />

                <h2>{land.header}</h2>
                <p><Link to="/auth">{land.description}</Link></p>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        lang: state.lang
    }
}

export default connect(mapStateToProps)(Auth);