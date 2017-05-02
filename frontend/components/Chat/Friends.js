import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'

import SortFilter from './SortFilter'
import ChatAction from '../../actions/ChatActions'

class Friends extends Component {

    static sort(sort_types, friend_first, friend_second) {
        let res = 0;
        switch (sort_types[0]) {
            case 'relevant':
                if(friend_first.status == 'ONLINE' && friend_second.status == 'OFFLINE'){
                    res = -1;
                } else if(friend_first.status == 'OFFLINE' && friend_second.status == 'ONLINE') {
                    res = 1;
                }
                break;
            case 'message':
                res = friend_second.unread_messages - friend_first.unread_messages;
                break;
            case 'name':
                res = friend_first.login.localeCompare(friend_second.login);
                break;
        }

        if(res!=0 || sort_types.length == 1){
            return res;
        }

        sort_types.splice(0,1);
        return Friends.sort(sort_types, friend_first, friend_second);
    }

    // get friends/recordIds list in right order and count
    getFriendList(){
        let {sort, filter_by_name, friends} = this.props.chat;

        let new_array_friends = [];

        for(let friend of friends.values()){
            if(filter_by_name!=''){
                if(friend.login.indexOf(filter_by_name) == 0){
                    new_array_friends.push(friend);
                }
            } else {
                new_array_friends.push(friend);
            }
        }

        new_array_friends.sort(function (friend_first, friend_second){
            switch (sort) {
                case 'relevant':
                    return Friends.sort(['relevant', 'message', 'name'], friend_first, friend_second);
                case 'name':
                    return Friends.sort(['name'], friend_first, friend_second);
                case 'message':
                    return Friends.sort(['message', 'relevant', 'name'], friend_first, friend_second);
                default:
                    return 0;
            }
        });

        return new_array_friends;
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