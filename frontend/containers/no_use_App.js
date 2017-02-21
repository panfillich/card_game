import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as pageActions from '../actions/PageActions'

import Helmet from "react-helmet"

import Nav from './Nav'

class App extends Component {

    render() {

        {/*const { user, page }            = this.props
        const { setYear, getPhotos }    = this.props.pageActions*/}

        return <div>
            <Helmet
                title="Главная"
            />
            <Nav />
            {/*<User name={user.name} />
            <Page photos={page.photos} year={page.year} setYear={setYear} getPhotos = {getPhotos} />

            <button onClick={this.onYearBtnClick}>test</button>*/}
        </div>
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        page: state.page
    }
}

function mapDispatchToProps(dispatch) {
    return {
        pageActions: bindActionCreators(pageActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)