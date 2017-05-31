import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import className from 'classnames'
import Helmet from "react-helmet"
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import LoaderAction   from '../actions/LoaderAction'
import API from  '../actions/API'
import { Link } from 'react-router'

class Decks extends Component {

    constructor(props) {
        super(props);

        this.state = {
            decks:[]
        };

        this.getDecks       = this.getDecks.bind(this);
        this.delDeck        = this.delDeck.bind(this);
    }

    getDecks(){
        let {lang, startLoading, finishLoading} = this.props;
        startLoading(lang.decks.loading.search);
        API.private.getDecksInfo((err, data) => {
            if(err){ /*Показать ошибку*/finishLoading();}
            else {
                this.setState({decks : data.detail.decks_info}, function () {
                    finishLoading();
                });
            }
        });
    }

    delDeck(deck_number){
        let {lang, startLoading, finishLoading} = this.props;
        startLoading(lang.decks.loading.delete);
        API.private.deleteDeck(deck_number, (err, data) => {
            if(err){ /*Показать ошибку*/finishLoading();}
            else {
                let deck_key = false;
                for(let key in this.state.decks){
                    let deck = this.state.decks[key];
                    if(deck.deck_number == deck_number){
                        deck_key = key;
                    }
                }

                if(deck_key!==false){
                    this.state.decks.splice(deck_key, 1);
                }

                this.setState({}, function () {
                    finishLoading();
                });
            }
        });
    }

    editDeck(deck_number){
        browserHistory.push('/deck/' + deck_number + '/edit');
    }

    addDeck(deck_number){
        browserHistory.push('/deck/' + deck_number + '/add');
    }

    componentWillMount(){
        this.getDecks();
    }

    render() {
        let lang = this.props.lang.decks;

        let decks_in_html_format = [];

        for(let deck_number=1; deck_number <= 9; deck_number++){
            let is_found = false;
            for(let key in this.state.decks){
                let deck =  this.state.decks[key];
                if(deck.deck_number == deck_number){
                    is_found = true;
                    decks_in_html_format.push(
                        <li className = "list-group-item justify-content-between">
                            {deck.deck_number}.) {lang.count_cards}:{deck.cards_count}...
                            <button onClick={()=>{this.editDeck(deck.deck_number)}}>{lang.action.edit}</button>
                            <button onClick={()=>{this.delDeck(deck.deck_number)}}>{lang.action.delete}</button>
                        </li>
                    );
                    break;
                }
            }
            if(!is_found) {
                decks_in_html_format.push(
                    <li className="list-group-item justify-content-between">
                        {deck_number}.) Empty deck... <button onClick={()=>{this.addDeck(deck_number)}}>{lang.action.add}</button>
                    </li>
                );
            }
        }

        return (
            <div>
                <Helmet
                    title={lang.title}
                />

                <h2>
                    {lang.header}
                </h2>

                <div className="container align-top" id="content">
                    <div className="row">
                        <div className="col-12">
                            <ul className="list-group">
                                {decks_in_html_format}
                            </ul>
                        </div>
                    </div>
                 </div>
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

