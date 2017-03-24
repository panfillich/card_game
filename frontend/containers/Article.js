import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import Helmet from "react-helmet"
import { browserHistory } from 'react-router'

import LoaderAction   from '../actions/LoaderAction'
import API            from '../actions/API'

class Articles extends Component {
    //componentDidMount
    constructor(props) {
        super(props);

        this.state = {
            article : null
        };

        this.getArticle = this.getArticle.bind(this);
    }

    getArticle() {
        const { startLoading, finishLoading, lang, routeParams} = this.props;

        startLoading(lang.article.loading_message);

        let article_id =  Number(routeParams.article_id);

        API.public.article({ article_id : article_id}, (err, res) => {
            if(err){
                this.state.articles = [];
                finishLoading();
            } else {
                this.state.article     = res.detail;
                this.setState(function () {
                    finishLoading();
                });
            }
        });
    }

    componentWillMount(){
        this.getArticle();
    }

    shouldComponentUpdate(nextProps, nextState) {
        let currProps = this.props;
        if(currProps.lang.cur_lang != nextProps.lang.cur_lang){
            browserHistory.push('/articles');
            return false;
        }
        return true;
    }

    render(){
        let {lang, user} = this.props;

             // Если пользователь авторизирован
        if(user.is_auth){

        }

        let article = this.state.article;
        if(this.state.article) {
            return (
                <div id="article">
                    <Helmet
                        title={article.title}
                        description={article.description}
                        keywords={article.keywords}
                    />

                    <article>
                        <header>
                            <h2>{article.title}</h2>
                        </header>


                        <p>{lang.article.date_of_publication}: <time dateTime={article.publishAt.slice(0, -2)}>
                                {article.publishAt.slice(0, -14)}
                            </time>
                        </p>

                        <div className="content" dangerouslySetInnerHTML={{__html: article.articleText}}></div>

                    </article>

                </div>
            );
        } else {
            return (<div></div>);
        }
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        lang: state.lang
    }
}

function mapDispatchToProps(dispatch) {
    return {
        startLoading  : bindActionCreators(LoaderAction.startLoading, dispatch),
        finishLoading : bindActionCreators(LoaderAction.finishLoading, dispatch),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Articles);
