
import React, { Component } from 'react'
import className from 'classnames'
import RightSide from '../containers/RightSide'
// let f = require('../actions/API/public');

export default class Content extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_right_column : false
        }

        this.change = this.change.bind(this);
    }

    change(){
        this.state.is_right_column = !this.state.is_right_column;
        this.setState();
    }

    render() {
        let is_right_column = this.state.is_right_column;
        let main_class_name = className({
            "col-sm-12" : !is_right_column,
            "col-md-12" : !is_right_column,
            "col-md-9"  : is_right_column
        });

        let right_class_name = className({
            "hidden"   : !is_right_column,
            "col-md-3" : is_right_column
        });
        return (
            <div className="container align-top" id="content">
                <button onClick={this.change}>test</button>
                <div className="row">
                    <div className={main_class_name}>
                        {this.props.children}
                    </div>
                    <div className={right_class_name}>
                        <RightSide />
                    </div>
                </div>
            </div>
        );
    }
}


