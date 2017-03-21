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

        this.articles = [];
        this.is_loading = true;
        this.getArticles = this.getArticles.bind(this);
    }

    getArticles() {
        const { startLoading, finishLoading } = this.props;
        startLoading();
        API.public.articles({page:1, auth:'en'}, (err, res) => {
            if(err){
                this.articles = [];
            } else {
                this.articles = res.detail.articles;
            }
            console.log(res.detail.articles);
            this.is_loading = false;
            this.setState(function () {
                finishLoading();
            });
        });
    }

    componentWillMount(){
        this.getArticles();
    }

    render(){
        // Если пользователь не авторизирован
        if(!this.props.user.is_auth){

        }

        let articles = [];
        for(let article in this.articles){
            articles.push(
                <div>
                    <p>{this.articles[article].description}</p>
                    <p>{this.articles[article].title}</p>
                    {/*<p>{}</p>*/}
                </div>
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
