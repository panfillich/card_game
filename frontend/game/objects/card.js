import * as PIXI from 'pixi.js';

function createCard(param) {
    let stage    = param.stage;
    let screen   = param.screen;
    let position = param.position;
    let stats    = param.stats;

    let container = new PIXI.Container();

    // Создаем карту
    let parity_of_parties = {
        radius: 1.25,
        width: 5,
        height: 7
    };

    let card_height = screen.size.height * 0.2;
    let card_width  = card_height * parity_of_parties.width / parity_of_parties.height;
    let card_radius = card_height * parity_of_parties.radius / parity_of_parties.height;

    let card_line_thickness = card_height * 0.15 / parity_of_parties.height;
    if(card_line_thickness < 1){
        card_line_thickness = 1;
    }

    let graphics = new PIXI.Graphics();
    graphics.lineStyle(card_line_thickness, 0xFF00FF, 1);
    graphics.beginFill(0xFF00BB, 0.25);
    graphics.drawRoundedRect(150, 200, card_width, card_height, card_radius);
    graphics.endFill();

    container.addChild(graphics);


    let style = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 36,
        fontStyle: 'italic',
        fontWeight: 'bold',
        fill: ['#ffffff', '#00ff99'], // gradient
        stroke: '#4a1850',
        strokeThickness: 5,
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
        wordWrap: true,
        wordWrapWidth: 440
    });

    let richText = new PIXI.Text('Rich text with a lot of options and across multiple lines', style);
    // container.addChild(richText);

    if(stage){
        stage.addChild(container);
    }
    return graphics;
}

export default createCard;
