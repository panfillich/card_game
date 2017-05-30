import React, { Component } from 'react'
import className from 'classnames'
import Helmet from "react-helmet"
import { connect } from 'react-redux'
import LoaderAction   from '../actions/LoaderAction'
import API from  '../actions/API'

class Decks extends Component {

    constructor(props) {
        super(props);

        this.state = {
            decks:[]
        };

        this.getDecks       = this.getDecks.bind(this);
        this.delDeck        = this.delDeck.bind(this);
        this.createNewDeck  = this.createNewDeck.bind(this);
    }

    getDecks(){
        let {startLoading, finishLoading} = this.props;
        startLoading();
        API.private.getDecksInfo(function (err, data) {
            if(err){ /*Показать ошибку*/finishLoading();}
            else {
                this.setState({decks : data.detail.decks}, function () {
                    finishLoading();
                });
            }
        });
    }

    delDeck(deck_num){

    }

    createNewDeck(deck_num){

    }

    componentWillMount(){
        this.getDecks();
    }

    render() {
        let lang = this.props.lang.decks;

        let decks_in_html_format;

        for(let i=1; i <= 9; i++){

        }


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
        lang: state.lang
    }
}

function mapDispatchToProps(dispatch) {
    return {
        startLoading  : bindActionCreators(LoaderAction.startLoading, dispatch),
        finishLoading : bindActionCreators(LoaderAction.finishLoading, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Decks);

