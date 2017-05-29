import React, { Component } from 'react'
import className from 'classnames'
import RightSide from '../containers/RightSide'
import Helmet from "react-helmet"
import { connect } from 'react-redux'

class Deck extends Component {
    render() {
        let lang = this.props.lang.deck;
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

