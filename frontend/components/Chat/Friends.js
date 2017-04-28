import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'

import SortFilter from './SortFilter'
import ChatAction from '../../actions/ChatActions'

class Friends extends Component {

    // get friends/recordIds list in right order and count
    getFriendList(){
        let {sort, filter_by_name, friends} = this.props.chat;

        let new_array_friends = [];

        for(let friend of friends.values()){
            new_array_friends.push(friend);
        }

        if(filter_by_name!=''){

        }

        switch (sort){
            case 'relevant':
                new_array_friends.sort(function (friend_first, friend_second) {
                    if(friend_first.status == 'ONLINE' && friend_second.status == 'OFFLINE'){
                        return -1;
                    } else if(friend_first.status == 'OFFLINE' && friend_second.status == 'ONLINE'){
                        return 1;
                    } else {
                        return friend_first.login.localeCompare(friend_second.login);
                    }
                });
                return new_array_friends;
            case 'name':
                new_array_friends.sort(function (friend_first, friend_second) {
                    return friend_first.login.localeCompare(friend_second.login);
                });
                return new_array_friends;
            case 'message':
                return new_array_friends;
            default:
                return new_array_friends;
        }
    }

    render() {
        // let friends   = this.props.chat.friends;
        let setFriend = this.props.setFriend;

        let html_friends = [];
        let friends = this.getFriendList();

        friends.forEach(function (friend) {
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