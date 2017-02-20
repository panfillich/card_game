import React, { Component } from 'react'
import Nav from '../containers/Nav'
import Content from '../containers/Content'
import Footer from '../containers/Footer'
import Modal from '../containers/Modal'

export default class App extends Component {
    render() {
        return <div>
            <Nav />
            <Modal />
            <Content>{this.props.children}</Content>
            <Footer/>
        </div>
    }
};