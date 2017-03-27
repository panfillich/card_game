import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import RightSideAction  from '../../actions/RightSideAction'

class ShowCloseButton extends Component {
    render() {
        return (
            <button {...this.props} onClick={this.props.closeChat}>
                X
            </button>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        closeChat  : bindActionCreators(RightSideAction.closeChat, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(ShowCloseButton);