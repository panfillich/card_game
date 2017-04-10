import React, { Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'

class Loader extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount() {
        // $('#loader').modal('show');
        // $('#loader').modal('hide');
    }

    render() {
        const { lang, loader } = this.props;

        let class_background = {
            "modal-backdrop" : false,
            "in" : false
        };

        let style = {};

        if(loader.is_loading){
            class_background["modal-backdrop"] = true;
            class_background["in"] = true;
            style = {display:"block"}
        }

        return(
            <div className={classnames(class_background)}>
            <div id="loader" className="modal" style={style}>
                <div className="modal-block">
                <div className="loader-centre">
                <div className="loader-container">
                    <div className="loader-block">
                        <div className="loader"></div>
                        <div id="loader-text">{lang.loader.text}</div>
                    </div>
                    <div className="loader-block">
                        <div id="loader-message">
                            {loader.message}
                        </div>
                    </div>
                </div>
                </div>
                </div>
            </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        lang:   state.lang,
        loader: state.loader
    }
}

export default connect(mapStateToProps)(Loader);
