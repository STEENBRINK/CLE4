
// tsc --watch -p {filename(tsconfig.json)}

//TODO: player - up down left right
//      platform
//      physics
//      scrolling
//      enemies
//      dragon
//      background move
//      camera move
//      

var game = new Phaser.Game(1280, 720, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('box', 'assets/platformer/Tiles/box.png');
    
    game.load.image('background', 'assets/platformer/background1.png');
    game.load.spritesheet('player', 'assets/platformer/Final/characters1.png', 32, 23);
    game.load.image('ground', 'assets/platformer/grass-2400.png');
    game.load.spritesheet('dragon', 'assets/platformer/Final/dragon0.png', 173, 103);
    game.load.spritesheet('swoosh', 'assets/platformer/Final/swoosh.png', 32, 32);

    game.load.tilemap('map', 'levels/lvl1.2.json', null, Phaser.Tilemap.TILED_JSON);

    //  Next we load the tileset. This is just an image, loaded in via the normal way we load images:
    game.load.image('tiles', 'assets/platformer/Final/Kenney_Full/Base pack/Tiles/tiles_spritesheet.png');

}

var player;
var facing = 'right';
var jumpTimer = 0; 
var swooshTimer = 0;
var cursors;
var jumpButton;
var yAxis = p2.vec2.fromValues(0, 1);
var ground;
var platforms;
var dragon;
var swoosh;
var map;
var layer;

// Set this to false to remove rectangles around sprites
const DEBUG = false;

function create() {
    

    game.physics.startSystem(Phaser.Physics.P2JS);

    game.stage.backgroundColor = '#2d2d2d';

    map = game.add.tilemap('map');

    map.addTilesetImage('tiles');

    layer = map.createLayer('layer1');

    layer.resizeWorld();

    //  Set the tiles for collision.
    //  Do this BEFORE generating the p2 bodies below.
    map.setCollisionBetween(1, 150);

    //  Convert the tilemap layer into bodies. Only tiles that collide (see above) are created.
    //  This call returns an array of body objects which you can perform addition actions on if
    //  required. There is also a parameter to control optimising the map build.
    game.physics.p2.convertTilemap(map, layer);

    player = game.add.sprite(200, 200, 'player');
    game.physics.p2.enable(player);

    game.camera.follow(player);

    //  By default the player will collide with the World bounds,
    //  however because you have changed the size of the world (via layer.resizeWorld) to match the tilemap
    //  you need to rebuild the physics world boundary as well. The following
    //  line does that. The first 4 parameters control if you need a boundary on the left, right, top and bottom of your world.
    //  The final parameter (false) controls if the boundary should use its own collision group or not. In this case we don't require
    //  that, so it's set to false. But if you had custom collision groups set-up then you would need this set to true.
    game.physics.p2.setBoundsToWorld(true, true, true, true, false);

    //  Even after the world boundary is set-up you can still toggle if the player collides or not with this:
    // player.body.collideWorldBounds = false;

    cursors = game.input.keyboard.createCursorKeys();


    //  Enable p2 physics
    /*game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.setImpactEvents(true);
    game.physics.p2.gravity.y = 750;
    game.physics.p2.world.defaultContactMaterial.friction = 0.3;
    game.physics.p2.world.setGlobalStiffness(1e5);

    //  Set world borders
    game.world.setBounds(0, 0, 1920, 1920);

    //  Set background
    bg = game.add.tileSprite(0, -300, 3840, 1080, 'background');

    
    //  The 'mario' key here is the Loader key given in game.load.tilemap
    map = game.add.tilemap('lvl1');

    //  The first parameter is the tileset name, as spe0cified in the Tiled map editor (and in the tilemap json file)
    //  The second parameter maps this name to the Phaser.Cache key 'tiles'
    map.addTilesetImage('tiles_spritesheet', 'tiles');
    
    //  Creates a layer from the World1 layer in the map data.
    //  A Layer is effectively like a Phaser.Sprite, so is added to the display list.
    layer = map.createLayer('layer1'6);

    //  This resizes the game world to match the layer dimensions
    layer.resizeWorld();

    map.setCollisionBetween(0, 150, true, layer);

    game.physics.p2.convertTilemap(map, layer);


   //  create player
   player = game.add.sprite(200, 200, 'player');
   player.scale.setTo(2,2);
   player.animations.add('left', [0, 1, 2, 4], 10, true);
   player.animations.add('turn', [0], 20, true);
   player.animations.add('right', [0, 1, 2, 4], 10, true);
   
   //  create dragon
   dragon = game.add.sprite(500, 481, 'dragon');
   dragon.animations.add('idle', [0, 1, 2], 5, true);
   dragon.animations.play('idle');
   dragon.anchor.setTo(.5,.5);
   dragon.scale.x *= -1;


   //  Enable physics for player. This creates a default rectangular body.
   game.physics.p2.enable(player, DEBUG);
   player.body.fixedRotation = true;
   player.body.damping = 0.5;
   player.anchor.setTo(.25,.5);
   player.body.setRectangle(player.width / 2,player.height);

   // Create materials, this manages things like friction, restitution(bouncy'ness)
   var spriteMaterial = game.physics.p2.createMaterial('spriteMaterial', player.body);
   var worldMaterial = game.physics.p2.createMaterial('worldMaterial');
   var boxMaterial = game.physics.p2.createMaterial('worldMaterial');

   //  4 trues = the 4 faces of the world in left, right, top, bottom order
   game.physics.p2.setWorldMaterial(worldMaterial, true, true, true, false);

   //  A stack of boxes
   for (var i = 0; i < 5; i++)
   {
       var box = game.add.sprite(300, 500 - (80 * i), 'box');
       game.physics.p2.enable(box, DEBUG);
       box.body.mass = 6;
       box.body.setMaterial(boxMaterial);
   }

   //  Here is the contact material. It's a combination of 2 materials, so whenever shapes with
   //  those 2 materials collide it uses the following settings.

   var groundPlayerCM = game.physics.p2.createContactMaterial(spriteMaterial, worldMaterial, { friction: 0.0 });
   var groundBoxesCM = game.physics.p2.createContactMaterial(worldMaterial, boxMaterial, { friction: 0.6 });

   //  Here are some more options you can set:

   groundBoxesCM.friction = 5.0;               // Friction to use in the contact of these two materials.
   //groundBoxesCM.restitution = 1.0;          // Restitution (i.e. how bouncy it is!) to use in the contact of these two materials.
   //groundBoxesCM.stiffness = 1e3;            // Stiffness of the resulting ContactEquation that this ContactMaterial generate.
   //groundBoxesCM.relaxation = 0;             // Relaxation of the resulting ContactEquation that this ContactMaterial generate.
   //groundBoxesCM.frictionStiffness = 1e7;    // Stiffness of the resulting FrictionEquation that this ContactMaterial generate.
   //groundBoxesCM.frictionRelaxation = 3;     // Relaxation of the resulting FrictionEquation that this ContactMaterial generate.
   //groundBoxesCM.surfaceVelocity = -1.0;     // Will add surface velocity to this material. If bodyA rests on top if bodyB, and the surface velocity is positive, bodyA will slide to the right.

   text = game.add.text(15, 15, 'move with arrow, space to jump', { fill: '#ffffff', fontSize: '18px' });

   cursors = game.input.keyboard.createCursorKeys();
   jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.UP);
   hitButton = game.input.keyboard.addKey(Phaser.Keyboard.M);

   game.camera.follow(player, 1, .5, 0);*/

}

function update() 
{

    if (cursors.left.isDown)
    {
        player.body.rotateLeft(100);
    }
    else if (cursors.right.isDown)
    {
        player.body.rotateRight(100);
    }
    else
    {
        player.body.setZeroRotation();
    }

    if (cursors.up.isDown)
    {
        player.body.thrust(400);
    }
    else if (cursors.down.isDown)
    {
        player.body.reverse(400);
    }

    /*if(hitButton.isDown && game.time.now > swooshTimer)
    {
        //  create swoosh
        swoosh = game.add.sprite(100, 100, 'swoosh');
        swoosh.animations.add('hit', [0,1,2,3,], 10, false);

        swoosh.x = player.body.x + 5;
        swoosh.y = player.body.y - 10;
        swoosh.animations.play('hit', 10, false, true);

        swooshTimer = game.time.now + 700;
    }

    if (cursors.left.isDown)
    {
        player.body.moveLeft(200);

        //  Scroll the background
        bg.tilePosition.x += .3;

        if (facing != 'left')
        {
            player.animations.play('left');
            facing = 'left';

            if(player.scale.x > 0)
                {
                    // Invert scale.x to flip left/right
                    player.scale.x *= -1;
                }
        }
    }
    else if (cursors.right.isDown)
    {
        player.body.moveRight(200);

        //  Scroll the background
        bg.tilePosition.x -= .3;

        if (facing != 'right')
        {
            player.animations.play('right');
            facing = 'right';

            if(player.scale.x < 0)
                {
                    // Invert scale.x to flip left/right
                    player.scale.x *= -1;
                }
        }

    }
    else
    {
        player.body.velocity.x = 0;

        if (facing != 'idle')
        {
            player.animations.stop();

            if (facing == 'left')
            {
                player.frame = 0;
            }
            else
            {
                player.frame = 0;
            }

            facing = 'idle';
        }
    }
    
    if (jumpButton.isDown && game.time.now > jumpTimer && checkIfCanJump())
    {
        player.body.moveUp(600);
        jumpTimer = game.time.now + 750;
    }*/

}

function render()
{


}

function checkIfCanJump() {

    var result = false;

    for (var i=0; i < game.physics.p2.world.narrowphase.contactEquations.length; i++)
    {
        var c = game.physics.p2.world.narrowphase.contactEquations[i];

        if (c.bodyA === player.body.data || c.bodyB === player.body.data)
        {
            var d = p2.vec2.dot(c.normalA, yAxis);

            if (c.bodyA === player.body.data)
            {
                d *= -1;
            }

            if (d > 0.5)
            {
                result = true;
            }
        }
    }
    
    return result;

}
