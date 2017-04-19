import React, { Component } from 'react'
import { connect } from 'react-redux'

class Messages extends Component {
    constructor(props){
        super(props);

        this.state = {
            recordId: 0
        };

        this.getFriend = this.getFriend.bind(this);
    }

    getFriend(){
        let friends = this.props.chat.friends;
        for(let i = 0; i<friends.length; i++){
            let friend = friends[i];
            if(friend.is_selected){
                return friend;
            }
        }
        return false;
    }

    render() {
        let {user} = this.props;

        if(!user.is_auth){
            return null;
        }

        let friend = this.getFriend();
        let html_messages = [];
        if(friend) {
            if(friend.messages.length > 0) {
                let friend_login = friend.login;
                let user_login  = user.login;

                friend.messages.forEach(function (message) {
                    let login = '';
                    if(message.type == 'self') {
                        login = user_login;
                    } else if(message.type == 'friend'){
                        login = friend_login;
                    }

                    html_messages.push(
                        <li className="list-group-item justify-content-between">
                            {message.date} : {login} <br />{message.text}
                        </li>
                    );
                });
            }
        }


        return (
            <div id="chat">
                <div className="chat-widget" style={{
                    "margin-top":"7px", "margin-bottom":"7px",
                    "border":"1px solid white",
                    "overflow-y": "auto","width": "auto", "height": "300px"
                }}>
                    <div style={{"margin-right":"7px"}}>
                        <ul className="list-group">
                            {html_messages}
                        </ul>
                    </div>

                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        chat: state.chat
    }
}

export default connect(mapStateToProps)(Messages);


