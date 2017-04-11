import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'

import Header  from '../components/Chat/Header'
import Friends from '../components/Chat/Friends'
import Message from '../components/Chat/Messages'

class Chat extends Component {
    render() {
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

        return (
            <div >
                <Header />
                <Message />
                <Friends />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Chat);





