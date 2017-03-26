import React, { Component } from 'react'
import Chat from './Chat'

export default class RightSide extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.is_update){
            return true;
        }
        nextProps.is_update = true;
        return false;
    }

    render() {
        return (
            <div id="right-side">
                <Chat />
            </div>
        );
    }
}
