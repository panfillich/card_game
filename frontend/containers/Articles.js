import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import Helmet from "react-helmet"
import { browserHistory } from 'react-router'
import classNames from 'classnames'

import NavLink from '../components/NavLink'
import Time from '../components/Time'

import LoaderAction   from '../actions/LoaderAction'
import API            from '../actions/API'

class Articles extends Component {
    //componentDidMount
    constructor(props) {
        super(props);

        this.state = {
            articles : [],
            page : -1,
            is_last_pack : true,
            is_get_new_article : true
        };

        this.getArticles = this.getArticles.bind(this);
    }

    getArticles() {
        const { startLoading, finishLoading, lang, routeParams} = this.props;

        startLoading(lang.articles.loading_message);

        let page = 1;
        if(routeParams.page){
            page = routeParams.page;
        }
        this.state.page = Number(page);

        API.public.articles({ page : page, lang : lang.cur_lang}, (err, res) => {
            if(err){
                this.state.articles = [];
                finishLoading();
            } else {
                this.state.articles     = res.detail.articles;
                this.state.is_last_pack = res.detail.is_last_pack;
                this.setState(function () {
                    finishLoading();
                });
            } //
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        let currProps = this.props;
        if(currProps.lang.cur_lang != nextProps.lang.cur_lang || currProps.routeParams.page != nextProps.routeParams.page){
            nextState.is_get_new_article = true;
        }
        return true;
    }

    render(){
        let {lang, user} = this.props;

        if(this.state.is_get_new_article){
            this.state.is_get_new_article = false;
            this.getArticles();
        }

        // Если пользователь авторизирован
        if(user.is_auth){

        }

        // Статьи
        let articles = [];
        for(let key in this.state.articles){
            let article = this.state.articles[key]
            articles.push(
                <article>
                    <header>
                        <h2><a href="#">{article.title}</a></h2>
                    </header>
                    <p>{lang.article.date_of_publication}: <Time time={article.publishAt} /></p>
                    <p className="text-justify">{article.description}</p>
                    <p>
                        <NavLink to={('/article/'+article.articleId)} onlyActiveOnIndex={true} className="nav-link">
                            {lang.articles.next}
                        </NavLink>
                    </p>
                </article>
            );
        }

        // Навигация / пагинация
        let pagination = '';

        if(articles.length > 0){
            let previous = '';
            let previous_link = '/articles/'+(this.state.page+1);
            let previous_is_disabled = false;
            if(this.state.is_last_pack){
                previous_link = '#';
                previous_is_disabled = true;
            }
            let previous_li_class = classNames({
                'page-item': true,
                'disabled' : previous_is_disabled
            });
            previous = (
                <li className={previous_li_class}>
                    <NavLink to={previous_link} onlyActiveOnIndex={true} className="page-link">
                        {lang.pagination.previous} →
                    </NavLink>
                </li>
            );

            let next = '';
            let next_link = '/articles/'+(this.state.page-1);
            let next_is_disabled = false;
            switch (this.state.page){
                case 1:
                    next_is_disabled = true;
                    next_link = '#';
                case 2:                    
                    next_link = '/articles';
            }
            let next_li_class = classNames({
                'page-item': true,
                'disabled' : next_is_disabled
            });
            next = (
                <li className={next_li_class}>
                    <NavLink to={next_link} onlyActiveOnIndex={true} className="page-link">
                        ← {lang.pagination.next}
                    </NavLink>
                </li>
            );

            pagination = (
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-end">
                        {next}
                        {previous}
                    </ul>
                </nav>
            );
        }

        return(
            <div id="articles">
                <Helmet
                    title={lang.articles.title}
                />

                <h1>{lang.articles.header}</h1>

                {pagination}
                {articles}
                {pagination}
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
