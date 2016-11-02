let path = require('./path');

let CONF = require('./config');

let PIXI = require('pixi.js');

var renderer = PIXI.autoDetectRenderer(800, 600,{backgroundColor : 0x1099bb});
document.body.appendChild(renderer.view);

// create the root of the scene graph
var stage = new PIXI.Container();

// create a texture from an image path
var texture = PIXI.Texture.fromImage('bunny.png');

// create a new Sprite using the texture
var bunny = new PIXI.Sprite(texture);

// center the sprite's anchor point
bunny.anchor.x = 0.5;
bunny.anchor.y = 0.5;

// move the sprite to the center of the screen
bunny.position.x = 200;
bunny.position.y = 150;

//Размер
bunny.height    = 20;
bunny.width     = 20;

stage.addChild(bunny);

// start animating
animate();

function animate() {
    requestAnimationFrame(animate);

    // just for fun, let's rotate mr rabbit a little
    // bunny.position += 1;
    bunny.rotation += 0.1;

    // render the container
    renderer.render(stage);

    console.log(bunny.position.x);

    let posX = Number(bunny.position.x);

    if(posX < 300 && posX > 0){
        console.log('-');
        bunny.position.x -= 1;
    } else if(Number(bunny.position.x) < 0){
        console.log('+');
        bunny.position.x += 1;
    }
}

