import * as PIXI from 'pixi.js';

function createCard(screen, stage) {
    let graphics = new PIXI.Graphics();
    graphics.lineStyle(2, 0xFF00FF, 1);
    graphics.beginFill(0xFF00BB, 0.25);
    graphics.drawRoundedRect(150, 200, 63, 88, 15);
    graphics.endFill();
    if(stage){
        stage.addChild(graphics);
    }
    return graphics;
}

export default createCard;
