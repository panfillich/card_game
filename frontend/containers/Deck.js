import React, { Component } from 'react'
import className from 'classnames'
import Helmet from "react-helmet"
import { connect } from 'react-redux'
import API from  '../actions/API'

class Deck extends Component {
    render() {
        let lang = this.props.lang.decks;
        return (
            <div>
                <Helmet
                    title={lang.title}
                />

                <h2>
                    {lang.header}
                </h2>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        lang: state.lang
    }
}

export default connect(mapStateToProps)(Deck);

