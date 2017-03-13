import React, { Component } from 'react'

class Small extends Component {
    render() {
        return (
            <small className="form-text text-muted">{this.props.text}</small>
        );
    }
}

export default Small;