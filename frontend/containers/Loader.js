import React, { Component } from 'react'
import { connect } from 'react-redux'

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
        return(
            <div id="loader" className="modal">
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
