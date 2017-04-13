import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'

import SortFilter from './SortFilter'
import ChatAction from '../../actions/ChatActions'

class Friends extends Component {

    render() {
        let friends = this.props.chat.friends;
        let setFriend = this.props.setFriend;

        let html_friends = [];
        friends.forEach(function(friend){
            html_friends.push(
                <li className="list-group-item justify-content-between list-group-item-action list-group-item-success"
                    onClick={function(){setFriend(friend.recordId)}}>
                    ({friend.unread_messages}) {friend.login} ({friend.status})
                </li>
            );
        });

        return (
            <div>
                <SortFilter />
                <div style={{ "overflow-y": "auto","width": "auto", "height": "150px"}}>
                    <div style={{"margin-right":"7px"}}>
                        <ul className="list-group">
                            {html_friends}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        chat: state.chat
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setFriend  : bindActionCreators(ChatAction.Client.setFriend, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Friends);