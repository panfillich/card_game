import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import RightSideAction  from '../../actions/RightSideAction'

class ShowCloseButton extends Component {
    render() {
        let {lang, right_side, closeChat, showChat} = this.props;
        let str_open_close = new String();
        let func_open_close = new Function();
        if(right_side.chat) {
            str_open_close = '-';
            func_open_close = closeChat;
        } else {
            str_open_close = '+';
            func_open_close = showChat;
        }

        return (
            <a href="#"  onClick={func_open_close} className={this.props.className}>
                {lang.nav.menu.chat}{str_open_close}
            </a>
        );
    }
}

function mapStateToProps(state) {
    return {
        lang: state.lang,
        right_side: state.right_side
    }
}

function mapDispatchToProps(dispatch) {
    return {
        closeChat  : bindActionCreators(RightSideAction.closeChat, dispatch),
        showChat   : bindActionCreators(RightSideAction.showChat, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowCloseButton);