import React, { Component } from 'react'
import { connect } from 'react-redux'

class Messages extends Component {
    constructor(props){
        super(props);

        this.state = {
            friend: false
        };

        this.setFriends = this.setFriends.bind(this);
    }

    setFriends(recordId){
        let friends = this.props.chat.friends;


        for(let i; i<friends.length; i++){
            if(friends[i].recordId == recordId){
                this.setState({
                    friend: friends[i]
                });
                return true;
            }
        }
        return false;
    }

    render() {
        let html_messages = [];
        if(!this.state.friend){
            if(this.props.chat.friends.length > 0){
                this.state.friend = this.props.chat.friends[0];
            }
        } else {
            this.state.friend.messages.forEach(function (message) {
                html_messages.push(
                    <li className="list-group-item justify-content-between">
                        {message.text}
                    </li>
                );
            });
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
        chat: state.chat
    }
}

function mapDispatchToProps(dispatch) {
    return {
        // changeLanguage  : bindActionCreators(LangAction.changeLanguage, dispatch),
        // logout          : bindActionCreators(UserAction.logout, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages);


