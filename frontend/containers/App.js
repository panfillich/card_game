import React, { Component } from 'react'
import Nav from '../containers/Nav'
import Content from '../containers/Content'
import Footer from '../containers/Footer'
import Loader from '../containers/Loader'
import RightSide from '../containers/RightSide'

export default class App extends Component {
    render() {
        return <div>
            <Nav />
            <Loader />
            <Content>{this.props.children}</Content>
            <Footer/>
        </div>
    }
};