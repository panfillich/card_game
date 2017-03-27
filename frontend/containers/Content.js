import React, { Component } from 'react'
import className from 'classnames'
import RightSide from '../containers/RightSide'
import { connect } from 'react-redux'

class Content extends Component {
    render() {
        let is_right_column = this.props.right_side.chat;
        let main_class_name = className({
            "col-sm-12" : !is_right_column,
            "col-md-12" : !is_right_column,
            "col-md-8"  : is_right_column
        });

        let right_class_name = className({
            "hidden"   : !is_right_column,
            "col-md-4" : is_right_column
        });
        return (
            <div className="container align-top" id="content">
                <div className="row">
                    <div className={main_class_name}>
                        {this.props.children}
                    </div>
                    <div className={right_class_name}>
                        <RightSide is_update={false}/>
                    </div>
                </div>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        right_side: state.right_side
    }
}

export default connect(mapStateToProps)(Content);



