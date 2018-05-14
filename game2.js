

//TODO: player - up down left right
//      platform
//      physics
//      scrolling
//      enemies
//      dragon


var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('grass', 'assets/platformer/Tiles/grass.png');
    game.load.image("background", "assets/platformer/background0.png");

}

var sprite;
var cursors;

function create() {

    var background = game.add.tileSprite(0, 0, 800, 600, 'background');
    background.scale = 0.1;



    //  Add a sprite
    var sprite = game.add.sprite(70, 70, 'grass');

    game.add.text(5, 5, 'Use arrow keys to move.', { fill: '#ffffff', font: '14pt Arial' });

    cursors = game.input.keyboard.createCursorKeys();

}

function update() 
{
    if (cursors.left.isDown)
    {
        sprite.body.moveLeft(400);
    }
    else if (cursors.right.isDown)
    {
        sprite.body.moveRight(400);
    }

    if (cursors.up.isDown)
    {
        sprite.body.moveUp(400);
    }
    else if (cursors.down.isDown)
    {
        sprite.body.moveDown(400);
    }

}
