import React, { Component } from 'react'
import Helmet from "react-helmet"
import Content from '../containers/Content'
export default class Auth extends Component {
    render() {
        return (
            <div>
                <Helmet
                    title="Авторизация"
                />
                <Content>
                    <h2>Авторизация</h2>
                    <p>Давай авторизовывайся</p>
                </Content>
            </div>
        )
    }
}