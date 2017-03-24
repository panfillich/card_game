import React, { Component } from 'react'

export default class Time extends Component {
    render() {
        return (
            <time dateTime={this.props.time.slice(0, -2)}>
                {this.props.time.slice(0, -14)}
            </time>
        );
    }
}