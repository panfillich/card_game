import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import NavLink from '../components/NavLink'

import LoaderAction   from '../actions/LoaderAction'
import API            from '../actions/API'

class Articles extends Component {
    //componentDidMount
    constructor(props) {
        super(props);

        this.state = {
            articles : []
        };

        this.getArticles = this.getArticles.bind(this);
    }

    getArticles() {
        const { startLoading, finishLoading, lang, routeParams} = this.props;
        startLoading();

        let page = 1;
        if(routeParams.page){
            page = routeParams.page;
        }

        API.public.articles({page:page, lang:lang.cur_lang}, (err, res) => {
            if(err){
                this.state.articles = [];
                finishLoading();
            } else {
                this.state.articles = res.detail.articles;
                this.setState(function () {
                    finishLoading();
                });
            }
        });
    }

    componentWillMount(){
        this.getArticles();
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.props.lang.cur_lang != nextProps.lang.cur_lang){
            this.props.lang = nextProps.lang;
            this.getArticles();
        }
        return true;
    }

    render(){
        let {lang, user} = this.props;

        // Если пользователь не авторизирован
        if(!this.props.user.is_auth){

        }

        // this.getArticles();

        let articles = [];
        for(let key in this.state.articles){
            let article = this.state.articles[key]
            articles.push(
                <article>
                    <header>
                        <h2><a href="#">{article.title}</a></h2>
                    </header>
                    <p>Дата публикации:
                        {/*<time datetime="2016-06-12T21:12:12">*/}
                        <time datetime={article.publishAt}>
                            {article.publishAt}
                        </time>
                    </p>
                    <p className="text-justify">{article.description}</p>
                    <p>
                        <NavLink to={('/acticle/'+article.articleId)} onlyActiveOnIndex={true} className="nav-link">
                            далее...
                        </NavLink>
                    </p>
                </article>
            );
        }

        return(
            <div>
                {articles}
            </div>
        )
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
