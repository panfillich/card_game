import React, { Component } from 'react'

class FormMessage extends Component {

    constructor(props){
        super(props);
    }

    // показать сообщение
    show(){
        $('#form-message').alert();
    }

    // убрать сообщение
    close(){
        $('#form-message').alert('close')
    }

    render() {
        return (
            <div id="form-message" className="alert alert-danger">
                test
                {/*<strong>Danger!</strong> Indicates a dangerous or potentially negative action.*/}
                {this.props.children}
            </div>
        );
    }
}

export default FormMessage;