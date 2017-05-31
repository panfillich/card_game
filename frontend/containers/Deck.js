import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import className from 'classnames'
import Helmet from "react-helmet"
import { connect } from 'react-redux'
import LoaderAction   from '../actions/LoaderAction'
import API from  '../actions/API'
import { browserHistory } from 'react-router'

class Deck extends Component {
    constructor(props) {
        super(props);

        this.state = {
            deck_num    : 0,
            deck        : [],
            collection  : [],
            type        : '' // edit or add
        };

        this.getDeckAndCollection   = this.getDeckAndCollection.bind(this);
        this.getCollection          = this.getCollection.bind(this);
        this.saveDeck               = this.saveDeck.bind(this);
        this.delFromDeck            = this.delFromDeck.bind(this);
        this.addInDeck              = this.addInDeck.bind(this);
    }

    getDeckAndCollection() {
        let {lang, startLoading, finishLoading} = this.props;
        startLoading(lang.deck.loading.deck);
        API.private.getDeckInfoDetail(this.state.deck_num, (err, data) => {
            if(err){ /*Показать ошибку*/finishLoading();}
            else {
                this.setState({deck : data.detail.deck}, function () {
                    finishLoading();
                });
                this.getCollection();
            }
        });
    }

    getCollection() {
        let {lang, startLoading, finishLoading} = this.props;
        startLoading(lang.deck.loading.collection);
        API.private.getCollection((err, data) => {
            if(err){ /*Показать ошибку*/finishLoading();}
            else {
                this.setState({collection : data.detail.collection}, function () {
                    finishLoading();
                });
            }
        });
    }

    saveDeck(){
        let {lang, startLoading, finishLoading} = this.props;
        if(this.state.deck.length > 0) {
            startLoading(lang.deck.loading.save);
            let callback = function (err, data) {
                if (err) { /*Показать ошибку*/
                    finishLoading();
                }
                else {
                    browserHistory.push('/decks');
                }
                finishLoading();
            }
            if(this.state.type =='edit'){
                API.private.updateOldDeck(this.state.deck_num, {cards:this.state.deck}, callback);
            } else {
                API.private.saveNewDeck(this.state.deck_num, {cards:this.state.deck}, callback);
            }
        }
    }

    addInDeck(cardId){
        let card_key = false;
        for(let key in this.state.deck){
            let card_in_deck = this.state.deck[key];
            if(card_in_deck.cardId == cardId){
                card_key = key;
                break;
            }
        }

        if(card_key!==false) {
            this.state.deck[card_key].count += 1;
        } else {
            this.state.deck.push({
                cardId  : cardId,
                count   : 1
            })
        }

        this.setState();
    }

    delFromDeck(cardId){
        let card_key = false;
        for(let key in this.state.deck){
            let card_in_deck = this.state.deck[key];
            if(card_in_deck.cardId == cardId){
                card_key = key;
                break;
            }
        }

        if(card_key!==false){
            if(this.state.deck[card_key].count > 1){
                this.state.deck[card_key].count -= 1;
            } else {
                this.state.deck.splice(card_key, 1);
            }
        }

        this.setState();
    }

    componentWillMount() {
        const {routeParams} = this.props;

        this.state.deck_num = Number(routeParams.deck_num);
        this.state.type = routeParams.splat;

        if (['edit', 'add'].indexOf(this.state.type) == -1) {
            browserHistory.push('/decks');
        }

        if (this.state.type == 'edit') {
            this.getDeckAndCollection();
        } else {
            this.getCollection();
        }
    }

    static getCountCard(deck){
        let count_card = 0;
        deck.forEach(function(card){
            count_card += card.count;
        });
        return count_card;
    }

    render() {
        let lang = this.props.lang.deck;

        let collection_in_html_format = [];
        this.state.collection.forEach((card_in_collection) => {
             if(card_in_collection.count > 0) {
                 let count_in_deck = 0;
                 for (let card_key in this.state.deck) {
                     let card_in_deck = this.state.deck[card_key];
                     if (card_in_collection.cardId == card_in_deck.cardId){
                         count_in_deck = card_in_deck.count;
                         break;
                     }
                 }

                 let button = '';
                 if(count_in_deck < 3 && (card_in_collection.count - count_in_deck) > 0 && Deck.getCountCard(this.state.deck) < 30){
                     button = <button onClick={()=>{this.addInDeck(card_in_collection.cardId)}}>{lang.action.add}</button>
                 }

                 collection_in_html_format.push(
                     <li className="list-group-item justify-content-between">
                         [id]:{card_in_collection.cardId}, {lang.count_cards}:{card_in_collection.count}, {lang.count_cards_in_deck}:{count_in_deck} {button}
                     </li>
                 );
             }
        });

        let deck_in_html_format = [];
        this.state.deck.forEach((card_in_deck)=>{
            deck_in_html_format.push(
                <li className="list-group-item justify-content-between">
                    [id]:{card_in_deck.cardId}, {lang.count_cards}:{card_in_deck.count} <button onClick={()=>{this.delFromDeck(card_in_deck.cardId)}}>{lang.action.delete}</button>
                </li>
            );
        });

        return (
            <div>
                <Helmet
                    title={lang.title}
                />

                <h2>
                    {lang.header}
                </h2>

                <button onClick={browserHistory.goBack} type="button" className="btn btn-secondary">
                    ← {lang.back}
                </button>

                <div className="container align-top" id="content">
                    <div className="row">
                        <div className="col-md-6">
                            <h3>{lang.h_collection}</h3>
                            <ul className="list-group">
                                {collection_in_html_format}
                            </ul>
                        </div>
                        <div className="col-md-6">
                            <h3>{lang.h_deck} - {lang.number}:{this.state.deck_num}, {lang.count_cards}:{Deck.getCountCard(this.state.deck)}</h3>
                            <ul className="list-group">
                                {deck_in_html_format}
                            </ul>
                            {(() => {
                                if(this.state.deck.length > 0) {
                                    return <button onClick={this.saveDeck}>{lang.action.save_deck}</button>
                                }
                            })()}
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

export default connect(mapStateToProps, mapDispatchToProps)(Deck);
