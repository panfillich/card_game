import React, { Component } from 'react'
import className from 'classnames'
import Helmet from "react-helmet"
import { connect } from 'react-redux'
import LoaderAction   from '../actions/LoaderAction'

class Collection extends Component {

    constructor(props) {
        super(props);

        this.state = {
            collection:[]
        };

        this.getCollection  = this.getCollection.bind(this);
        this.delCard        = this.delCard.bind(this);
    }

    getCollection(){

    }

    delCard(){

    }

    render() {
        let lang = this.props.lang.collection;
        return (
            <div>
                <Helmet
                    title={lang.title}
                />

                <h2>
                    {lang.header}
                </h2>


            </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        lang: state.lang,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        startLoading  : bindActionCreators(LoaderAction.startLoading, dispatch),
        finishLoading : bindActionCreators(LoaderAction.finishLoading, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Collection);

