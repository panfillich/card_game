import React, { Component } from 'react'
import { connect } from 'react-redux'
import API from '../../actions/API'
import _ from 'lodash'

class Messages extends Component {
    constructor(props){
        super(props);

        this.state = {
            recordId: 0,
            textarea: false
        };
        this.sendMessage    = this.sendMessage.bind(this);
    }

    sendMessage(){
        const value = this.state.textarea.value;
        if(this.state.recordId != 0 && value!='') {
            let client = API.chat.getClient();
            client.emit('message', {
                recordId: this.state.recordId,
                text: value
            });
            this.state.textarea.value = '';
            this.state.textarea.focus();
        }
    }

    render() {
        let {login} = this.props.user
        let {selected_friend_recordId, friends} = this.props.chat;
        this.state.recordId = selected_friend_recordId;

        let friend = friends.get(selected_friend_recordId);
        let html_messages = [];

        if(friend) {
            if(friend.messages.length > 0) {
                let friend_login = friend.login;
                let user_login  = login;

                friend.messages.forEach(function (message) {                   
                    let login = '';
                    if(message.type == 'user') {
                        login = user_login;
                    } else if(message.type == 'friend'){
                        login = friend_login;
                    }

                    html_messages.push(
                        <li className="list-group-item justify-content-between">
                            {message.time} : {login} <br />{message.text}
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

                <div className="portlet-footer">
                    <form role="form">
                        <div className="btn-group" style={{width:"100%"}}>
                            <div className="form-group" style={{width:"80%", float:"left"}}>
                                <textarea
                                    ref = {(input)=>{this.state.textarea=input;}}
                                    onKeyDown={(e)=>{if(e.keyCode==13){this.sendMessage(); e.preventDefault()}}}
                                    onChange = { function(textarea){
                                        if(textarea.target.value.length > 128){
                                           textarea.target.value = textarea.target.value.substr(0, 125) + '...';
                                        }
                                    }}
                                    style={{"border-bottom-right-radius":0, "border-top-right-radius":0}}
                                    className="form-control" placeholder="Enter message...">
                                </textarea>
                            </div>
                            <div className="form-group bg-faded" style={{width:"20%", float:"right"}}>
                                <button style={{height:"68px", width:"100%", "border-bottom-left-radius":0, "border-top-left-radius":0}}
                                    className="btn btn-outline-success" type="button"
                                    onClick={this.sendMessage}
                                >
                                    Send
                                </button>
                            </div>
                        </div>
                    </form>
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


