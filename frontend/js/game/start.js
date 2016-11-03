let path = require('./path');

let CONF = require('./config');

let PIXI = require('pixi.js');

let Stats = require('stats.js');

let stats = new Stats();
document.body.appendChild( stats.domElement );
stats.domElement.style.position = "absolute";
stats.domElement.style.top = "0px";


let subMath = require('./math/subMath');

var renderer = PIXI.autoDetectRenderer(300, 300,{backgroundColor : 0x1099bb});
document.body.appendChild(renderer.view);

// create the root of the scene graph
var stage = new PIXI.Container();

// create a texture from an image path
var texture = PIXI.Texture.fromImage('bunny.png');

//Рисуем прямоугольник
var graphics = new PIXI.Graphics();
graphics.lineStyle(2, 0xFF00FF, 1);
graphics.beginFill(0xFF00BB, 0.25);
graphics.drawRoundedRect(200, 200, 63, 88, 15);
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

for (let i = 0; i <=20000; i++) {
    createNewBunny();
}

animate();

function animate() {
    stats.begin();
    requestAnimationFrame(animate);

    stage.children.forEach(function (child) {
        let randomVal_x = subMath.getRandomInt(-5,5);
        let randomVal_y = subMath.getRandomInt(-5,5);

        child.position.x =  child.position.x + randomVal_x;
        child.position.y =  child.position.y + randomVal_y;

        child.rotation += 0.1;
    });

    createNewBunny();



    // render the container
    renderer.render(stage);
    stats.end();
}


