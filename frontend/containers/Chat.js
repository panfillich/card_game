import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'

import API from '../actions/API'
import RightSideAction  from '../actions/RightSideAction'
import ChatActions from '../actions/ChatActions'

import CloseButton from '../components/Chat/CloseButton'
import Friends from '../components/Chat/Friends'
import Message from '../components/Chat/Messages'

class Chat extends Component {

    constructor(props){
        super(props);
    }

    getFriendList(){

    }

    deleteFriend(){

    }

    render() {

        this.props.addFriendMessage(3,12);

        const { lang, user } = this.props;



        /*var socket = require('socket.io-client')('http://localhost:3004');
        socket.on('connect', function(data) {
            console.log('connect');
            socket.emit('join', 'Hello World from client');
            socket.on('message', function (data) {
                console.log(data);
                // socket.emit('join', 'Hello World from client2');
            });

        });*/



        if(!user.is_auth){
             return null;
        }



        let users = [
            {
                login   : 'User1',
                time    : '2016-02-01T00:00:00.000Z',
                message : 'Donec id elit non mi porta gravida at eget metus. ' +
                          'Maecenas sed diam eget risus varius blandit.'
            },
            {
                login   : 'User2',
                time    : '2016-02-01T00:00:00.000Z',
                message : 'Donec id elit non mi porta gravida at eget metus. ' +
                          'Maecenas sed diam eget risus varius blandit.'
            },
            {
                login   : 'User2',
                time    : '2016-02-01T00:00:00.000Z',
                message : 'Donec id elit non mi porta gravida at eget metus. ' +
                          'Maecenas sed diam eget risus varius blandit.'
            },
            {
                login   : 'User2',
                time    : '2016-02-01T00:00:00.000Z',
                message : 'Donec id elit non mi porta gravida at eget metus. ' +
                'Maecenas sed diam eget risus varius blandit.'
            },
            {
                login   : 'User2',
                time    : '2016-02-01T00:00:00.000Z',
                message : 'Donec id elit non mi porta gravida at eget metus. ' +
                'Maecenas sed diam eget risus varius blandit.'
            },
        ];

        let html_users = [];
        users.forEach(function (user) {
            html_users.push(
                <li className="list-group-item">
                    <div style={{height:"30px"}}>
                        <div style={{width:"50%", float:"left"}}>
                            <h5>{user.login}</h5>
                        </div>
                        <div style={{width:"50%", float:"right", "text-align":"right"}}>
                            <small className="text-muted">{user.time}</small>
                        </div>
                    </div>
                    <p>{user.message}</p>
                </li>
            );
        });

        return (
            <div >
                <div className="portlet-heading">
                    <nav className="bg-faded">
                        <div className="btn-group" style={{width:"100%"}}>
                            <button type="button" className="btn btn-outline-info"
                                    data-toggle="dropdown" id="chat-status-dropdown" style={{width:"30%"}}>
                                <span id="search_concept">Status</span><span className="caret dropdown-toggle"></span>
                            </button>
                            <ul className="dropdown-menu float-left" aria-labelledby="chat-status-dropdown">
                                <li><a className="dropdown-item" onClick={()=>{}} value="en" href="#">Online</a></li>
                                <li><a className="dropdown-item" onClick={()=>{}} value="ru" href="#">Away</a></li>
                                <li><a className="dropdown-item" onClick={()=>{}} value="ru" href="#">Offline</a></li>
                            </ul>
                            <button type="button" style={{width:"50%"}} className="btn btn-outline-info">
                                <span id="search_concept">User1</span><span className="caret"></span>
                            </button>

                            <CloseButton style={{float:"right", width:"20%"}} className='btn btn-outline-danger btn btn-outline-success'/>
                        </div>

                    </nav>
                </div>
                <Message />
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
                                        className="btn btn-outline-success" type="button" >Send</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="input-group" style={{"padding-top":"7px", "padding-bottom":"7px"}}>
                            <div className="input-group-btn search-panel">
                                <button type="button" className="btn btn-outline-info dropdown-toggle bg-faded" data-toggle="dropdown">
                                    <span id="search_concept">Sort by</span> <span className="caret"></span>
                                </button>
                                <ul className="dropdown-menu float-left" aria-labelledby="search_concept">
                                    <li><a className="dropdown-item" onClick={()=>{}} value="en" href="">Online</a></li>
                                    <li><a className="dropdown-item" onClick={()=>{}} value="ru" href="">Away</a></li>
                                    <li><a className="dropdown-item" onClick={()=>{}} value="ru" href="">Offline</a></li>
                                </ul>
                            </div>

                            <input name="search_param" value="all" id="search_param" type="hidden" />
                            <input className="form-control" name="x" placeholder="Filter by name..." type="text" />

                </div>
                <Friends />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        lang: state.lang

    }
}

function mapDispatchToProps(dispatch) {
    return {
        closeChat : bindActionCreators(RightSideAction.closeChat, dispatch),
        addFriendMessage : bindActionCreators(ChatActions.addFriendMessage, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);





