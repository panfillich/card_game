import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import className from 'classnames'
import Helmet from "react-helmet"
import { connect } from 'react-redux'
import LoaderAction   from '../actions/LoaderAction'
import API from  '../actions/API'
import { browserHistory } from 'react-router'


// import * as PIXI from 'pixi.js';

class Game extends Component {
    constructor(props) {
        super(props);
        this.game = {};

        this.startGame = this.startGame.bind(this);
    }

    startGame(){
        require.ensure(['../game'], require=>{
            let GAME = require('../game/index.js');

            this.game = new GAME({canvas: this.refs.gameCanvas});
        }, 'game');
    }

    componentDidMount() {
        // Setup PIXI Canvas in componentDidMount
        /*this.renderer = PIXI.autoDetectRenderer(1366, 768);
        this.refs.gameCanvas.appendChild(this.renderer.view);

        // create the root of the scene graph
        this.stage = new PIXI.Container();
        this.stage.width = 1366;
        this.stage.height = 768;*/
    }

    render() { //
         return (
            <div>
                <div className="game-canvas-container" ref="gameCanvas">
                </div>
                <button onClick={this.startGame}>Start game</button>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        lang: state.lang
    }
}

function mapDispatchToProps(dispatch) {
    return {
        startLoading  : bindActionCreators(LoaderAction.startLoading, dispatch),
        finishLoading : bindActionCreators(LoaderAction.finishLoading, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);
