import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'

import RightSideAction  from '../actions/RightSideAction'
import CloseButton from '../components/Chat/CloseButton'
import Friends from '../components/Chat/Friends'

class Chat extends Component {
    render() {

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
                            <button type="button" className="btn btn-outline-success "
                                    data-toggle="dropdown" id="chat-status-dropdown" style={{width:"30%"}}>
                                Status
                            </button>
                            <div className="dropdown-menu float-left" aria-labelledby="chat-status-dropdown">
                                <a className="dropdown-item" onClick={()=>{}} value="en" href="#">Online</a>
                                <a className="dropdown-item" onClick={()=>{}} value="ru" href="#">Away</a>
                                <a className="dropdown-item" onClick={()=>{}} value="ru" href="#">Offline</a>
                            </div>
                            <button type="button" style={{width:"50%"}} className="btn btn-outline-info">Secondary</button>

                            <CloseButton style={{float:"right", width:"20%"}} className='btn btn-outline-danger btn btn-outline-success'/>

                        </div>

                    </nav>
                </div>
                <div id="chat">
                    <div className="chat-widget" style={{
                        "margin-top":"7px", "margin-bottom":"7px",
                        "border":"1px solid white",
                        "overflow-y": "auto","width": "auto", "height": "400px"
                    }}>
                        <div style={{"margin-right":"7px"}}>
                            <ul className="list-group">
                                {html_users}
                            </ul>
                        </div>

                    </div>
                    <div className="portlet-footer">
                        <form role="form">
                            <div className="form-group" style={{width:"80%"}}>
                                <textarea

                                    className="form-control" placeholder="Enter message..."></textarea>
                            </div>
                            <div className="form-group" style={{width:"20%"}}>
                                <button type="button" className="btn btn-default pull-right">Send</button>
                                <div className="clearfix"></div>
                            </div>
                        </form>
                    </div>
                </div>
                <Friends />
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        closeChat : bindActionCreators(RightSideAction.closeChat, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(Chat);





