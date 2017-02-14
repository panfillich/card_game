import React, { Component } from 'react'

import Helmet from "react-helmet"

export default class Reg extends Component {
    render() {
        return (
            <div>
                <Helmet
                    title="Регистрация"
                />
                <div className='container'>
                    <h2>Регистрация</h2>
                </div>
            </div>
        )
    }
}