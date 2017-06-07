import * as PIXI from 'pixi.js';

import FrameRender from './framerander';
import createCard from './objects/card'
import subMath from './subMath';


/*function renderering() {
    requestAnimationFrame(animate);


    for (let i = 0; i <=1; i++) {
        createNewBunny();
    }


    /*stage.children.forEach(function (child) {
        let randomVal_x = subMath.getRandomInt(-5,5);
        let randomVal_y = subMath.getRandomInt(-5,5);

        child.position.x =  child.position.x + randomVal_x;
        child.position.y =  child.position.y + randomVal_y;

        child.rotation += 0.1;
    });*/

    /*for (let i = 0; i <=20; i++) {
        createNewBunny();
    }

    // render the container
    renderer.render(stage);
    //stats.end();
}

*/
class Game {
    constructor(param) {
        this.param = param;

        // Dom elements
        this.html = {
            main_div: param.canvas,
            fps: param.fps
        };

        // Default screan setting
        this.screen = {
            parity_of_parties: {
                group_id: 1,
                width: 16,
                height: 9
            },
            size: {
                width:  0,
                height: 0
            }
        };

        this.spead = 1;
        this.is_pause = false;

        this.renderer = PIXI.autoDetectRenderer({backgroundColor: 0x1099bb});
        this.html.main_div.appendChild(this.renderer.view);
        this.stage = new PIXI.Container();
        this.frameRender = new FrameRender();
        this._resize();

        this._animate = this._animate.bind(this);

        this.startGame();
        this._showFPS();

        window.onresize = () => {
            this._resize();
        }
    }

    pause(){
        this.is_pause = true;
    }

    unpause(){
        this.is_pause = false;
        this._animate();
    }

    destroy() {
        this.is_pause = true;
        this.renderer.destroy({removeView: true});
        this.stage.destroy({
            children: true,
            texture: true,
            baseTexture: true
        });
        if(this.html.fps){
            this.html.fps.removeChild(this.stats.domElement);
        }
    }

    _showFPS(){
        require.ensure(['stats.js'], (require)=>{
            let Stats = require('stats.js');
            let stats = new Stats();
            this.html.fps.appendChild(stats.domElement);
            stats.domElement.style.position = "absolute";
            stats.domElement.style.top = "0px";
            this.frameRender.addStartEvent(stats.begin);
            this.frameRender.addEndEvent(stats.end);//\
            this.stats = stats;
        }, 'stats');
    }

    _resize(){
        let px_width = this.html.main_div.offsetWidth;
        let px_height = px_width * this.screen.parity_of_parties.height / this.screen.parity_of_parties.width;

        let px_width_old = this.screen.size.width;

        this.screen.size.width = px_width;
        this.screen.size.height = px_height;

        this.renderer.resize(px_width, px_height);

        let coefficient = px_width/px_width_old;

        this.stage.children.forEach((child)=>{
             child.position.x = child.position.x * coefficient;
             child.position.y = child.position.y * coefficient;

             child.height = child.height * coefficient;
             child.width  = child.width  * coefficient;
        });

        if(this.is_pause) {
            this.renderer.render(this.stage);
        }
    }

    createNewBunny() {
        var texture = PIXI.Texture.fromImage(require('../../public/bunny.png'));
        let bunny = new PIXI.Sprite(texture);
        bunny.anchor.x = 0.5;
        bunny.anchor.y = 0.5;
        bunny.position.x = subMath.getRandomInt(0, this.screen.size.width);
        bunny.position.y = subMath.getRandomInt(0, this.screen.size.height);
        bunny.height = this.screen.size.width*0.05;
        bunny.width =  this.screen.size.width*0.025;
        this.stage.addChild(bunny);
    }


    _animate(){
        if(!this.is_pause) {
            this.frameRender.startEvents();
            this.frameRender.mainEvents();
            this.frameRender.endEvents();
        }
    }

    startGame() {
        // this.stage.children.forEach(function (elem) {
        //     console.log(elem);
        // });

        createCard({
            screen: this.screen,
            stage: this.stage,
            stats: {
                attack: 5,
                health: 7,
                cost: 5
            }
        });

        this.frameRender.addMainEvent(() => {
            requestAnimationFrame(this._animate);

            // this.createNewBunny();
            // for (let i = 0; i <= 1; i++) {
            //     this.createNewBunny();
            // }
            this.renderer.render(this.stage);

        });

        this._animate();
    }
}


module.exports = Game;