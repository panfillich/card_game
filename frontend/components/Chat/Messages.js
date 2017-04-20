import React, { Component } from 'react'
import { connect } from 'react-redux'
import API from '../../actions/API'

class Messages extends Component {
    constructor(props){
        super(props);

        this.state = {
            recordId: 0
        };

        this.getFriend      = this.getFriend.bind(this);
        this.sendMessage    = this.sendMessage.bind(this);
    }

    sendMessage(recordId){
        let client = API.chat.getClient();
        client.emit('message', {
           recordId:  recordId,
           text: 'test'
        });
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

                <div className="portlet-footer">
                    <form role="form">
                        <div className="btn-group" style={{width:"100%"}}>
                            <div className="form-group" style={{width:"80%", float:"left"}}>
                                    <textarea
                                        style={{"border-bottom-right-radius":0, "border-top-right-radius":0}}
                                        className="form-control" placeholder="Enter message..."></textarea>
                            </div>
                            <div className="form-group bg-faded" style={{width:"20%", float:"right"}}>
                                <button style={{height:"68px", width:"100%", "border-bottom-left-radius":0, "border-top-left-radius":0}}
                                        className="btn btn-outline-success" type="button"
                                    onClick={()=>{this.sendMessage(friend.recordId)}}
                                >Send</button>
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


