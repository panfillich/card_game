import React, { Component } from 'react'
import className from 'classnames'
import RightSide from '../containers/RightSide'
import { connect } from 'react-redux'

class Deck extends Component {
    render() {
       return (
            <div>
                Hi....
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        deck: state.deck
    }
}

export default connect(mapStateToProps)(Deck);

