let path = require('./path');

// let conf = require('./config/index');

let PIXI = require('pixi.js');

let FrameRender = require('./framerander');
let frameRender = new FrameRender();
let subMath = require('./subMath');
/*if(true) {
    require.ensure(['stats.js'], function(require) {
        let Stats = require('stats.js');
        let stats = new Stats();
        document.body.appendChild(stats.domElement);
        stats.domElement.style.position = "absolute";
        stats.domElement.style.top = "0px";
        frameRender.addStartEvent(stats.begin);
        frameRender.addEndEvent(stats.end);//
    });
}

let subMath = require('./subMath');

var renderer = PIXI.autoDetectRenderer(300, 300,{backgroundColor : 0x1099bb});
document.body.appendChild(renderer.view);

// create the root of the scene graph
var stage = new PIXI.Container();

// create a texture from an image path
var texture = PIXI.Texture.fromImage(require('../../public/bunny.png'));

//Рисуем прямоугольник
var graphics = new PIXI.Graphics();
graphics.lineStyle(2, 0xFF00FF, 1);
graphics.beginFill(0xFF00BB, 0.25);
graphics.drawRoundedRect(150, 200, 63, 88, 15);
graphics.endFill();
stage.addChild(graphics);



function createNewBunny() {
    let bunny = new PIXI.Sprite(texture);
    bunny.anchor.x = 0.5;
    bunny.anchor.y = 0.5;
    bunny.position.x = subMath.getRandomInt(0,300);
    bunny.position.y = subMath.getRandomInt(0,300);
    bunny.height    = 20;
    bunny.width     = 20;
    stage.addChild(bunny);
}

/*for (let i = 0; i <=1; i++) {
    createNewBunny();
}

function renderering() {
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

frameRender.addStartEvent(renderering);

animate();

function animate() {
    frameRender.startEvents();
    frameRender.mainEvents();
    frameRender.endEvents();
}
*/
class Game {
    constructor(param) {
        this.html = {
            main_div: param.canvas,
            fps: param.fps
        };

        // Default setting
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


        this.renderer = PIXI.autoDetectRenderer({backgroundColor: 0x1099bb});
        // this.renderer = new PIXI.Application(800, 600, {backgroundColor : 0x1099bb});
        // this.renderer.resize(900,300);
        this.html.main_div.appendChild(this.renderer.view);
        this.stage = new PIXI.Container();

        this.resize();


        //
        // this.stage = this.renderer.stage;

        this.startGame();

        window.onresize = () => {
            this.resize();
        }
    }

    resize(){
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

    }

    // % -> px
    // ширина = 1000%, ширина != 1000% всё зависит от разрешения 16:9
    scale(percentages){

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




    startGame() {

        for (let i = 0; i <= 100; i++) {
            this.createNewBunny();
        }

        this.stage.children.forEach(function (elem) {
            console.log(elem);
        });

        let renderering = () => {
            requestAnimationFrame(animate);



            this.renderer.render(this.stage);

        }

        frameRender.addStartEvent(renderering);

        animate();

        function animate() {
            frameRender.startEvents();
            frameRender.mainEvents();
            frameRender.endEvents();
        }
    }
}


module.exports = Game;