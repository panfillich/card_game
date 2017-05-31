import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import className from 'classnames'
import Helmet from "react-helmet"
import { connect } from 'react-redux'
import LoaderAction   from '../actions/LoaderAction'
import API from  '../actions/API'

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
        let {lang, startLoading, finishLoading} = this.props;
        startLoading(lang.collection.loading.search);
        API.private.getCollection((err, data) => {
            if(err){ /*Показать ошибку*/finishLoading();}
            else {
                this.setState({collection : data.detail.collection}, function () {
                    finishLoading();
                });
            }
        });
    }

    delCard(cardId){
        let {lang, startLoading, finishLoading} = this.props;
        startLoading(lang.collection.loading.delete);
        API.private.delCardInCollection(cardId, (err, data) => {
            if(err){ /*Показать ошибку*/finishLoading();}
            else {

                for (let key in this.state.collection){
                    let card = this.state.collection[key];
                    if(card.cardId == cardId){
                        if(card.count > 1){
                            card.count -= 1;
                        } else {
                            card.count = 0;
                        }
                    }
                }

                this.setState({},function () {
                    finishLoading();
                });

                // 2 вариант
                /*API.private.getCollection((err, data) => {
                    if(err){finishLoading();}
                    else {
                        this.setState({collection : data.detail.collection}, function () {
                            finishLoading();
                        });
                    }
                });*/
            }
        });
    }

    componentWillMount(){
        this.getCollection();
    }

    render() {
        let lang = this.props.lang.collection;

        let collection_in_html_format = [];
        this.state.collection.forEach((card) => {
            let button = '';
            if(card.count > 0){
                button =  <button onClick={()=>{this.delCard(card.cardId)}}>X</button>
            }
            collection_in_html_format.push(
                <li className = "list-group-item justify-content-between">
                    [id]:{card.cardId}, {lang.count}:{card.count} {button}
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

                <div>
                    <ul className="list-group">
                        {collection_in_html_format}
                    </ul>
                </div>

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

