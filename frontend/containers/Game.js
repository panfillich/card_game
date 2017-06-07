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
        this.game = null;
        this.state = {
            button_start:   true,
            button_pause:   false,
            button_unpause: false,
            button_reload:  false,
            button_stop:    false
        }

        this.startGame    = this.startGame.bind(this);
        this.pauseGame    = this.pauseGame.bind(this);
        this.unpauseGame  = this.unpauseGame.bind(this);
        this.reloadGame   = this.reloadGame.bind(this);
        this.stopGame     = this.stopGame.bind(this);
    }

    startGame(){
        require.ensure(['../game'], require=>{
            let GAME = require('../game/index.js');

            this.setState({
                button_start:   false,
                button_pause:   true,
                button_reload:  true,
                button_stop:    true
            }, ()=>{
                this.game = new GAME({canvas: this.refs.gameCanvas, fps: this.refs.gameCanvas});
            });
        }, 'game');
    }

    pauseGame(){
        this.setState({
            button_pause:   false,
            button_unpause: true
        },() => {
            if(this.game){
                this.game.pause();
            }
        });
    }

    unpauseGame(){
        this.setState({
            button_pause:   true,
            button_unpause: false
        },() => {
            if(this.game){
                this.game.unpause();
            }
        });
    }

    reloadGame(){
        this.stopGame(()=>{
            this.startGame();
        });
    }

    stopGame(callback){
        this.setState({
            button_start:   true,
            button_pause:   false,
            button_unpause: false,
            button_reload:  false,
            button_stop:    false
        },() =>{
            if(this.game){
                this.game = this.game.destroy();
                if(callback){
                    callback();
                }
            }
        });
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

    render() {
        let button_html = [];

        if (this.state.button_start){
            button_html.push(
             <button onClick={this.startGame}>Start</button>
            );
        }

        if (this.state.button_pause){
            button_html.push(
                <button onClick={this.pauseGame}>Pause</button>
            );
        }
        if (this.state.button_unpause){
            button_html.push(
                <button onClick={this.unpauseGame}>Unpause</button>
            );
        }

        if (this.state.button_reload){
            button_html.push(
                <button onClick={this.reloadGame}>Reload</button>
            );
        }

        if (this.state.button_stop){
            button_html.push(
                <button onClick={this.stopGame}>Stop</button>
            );
        }

        return (
        <div>
            <div className="game-canvas-container" ref="gameCanvas">
            </div>
            {button_html}
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
