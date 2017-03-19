import React, { Component } from 'react'

class FormMessage extends Component {

    constructor(props){
        super(props);
        this.display = "none";

        this.show = this.show.bind(this);
    }

    // показать сообщение
    show(){
        this.display = "";
    }

    // убрать сообщение
    close(){
        this.display = "none";
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }


    render() {
        return (
            <div id="form-message" className="alert alert-danger" style={{display:this.display}}>
                {this.props.children}
            </div>
        );
    }
}

export default FormMessage;