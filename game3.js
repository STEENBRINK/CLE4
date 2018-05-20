
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

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('box', 'assets/platformer/Tiles/box.png');
    game.load.image('background', 'assets/platformer/background1.png');
    game.load.spritesheet('player', 'assets/platformer/Final/characters1.png', 32, 23);
    //game.load.spritesheet('player', 'assets/platformer/Player/p1_walk/p1_walk.png', 66, 93);
    game.load.image('ground', 'assets/platformer/grass-2400.png');
    game.load.spritesheet('dragon', 'assets/platformer/Final/dragon0.png', 173, 103);
    game.load.spritesheet('swoosh', 'assets/platformer/Final/swoosh.png', 32, 32);

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

// Set this to false to remove rectangles around sprites
const DEBUG = false;

function create() {
    //  Set world borders
    game.world.setBounds(0, 0, 1920, 1920);

    //  Set background
    bg = game.add.tileSprite(0, -300, 3840, 1080, 'background');

    //  Enable p2 physics
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.setImpactEvents(true);
    game.physics.p2.gravity.y = 750;
    game.physics.p2.world.defaultContactMaterial.friction = 0.3;
    game.physics.p2.world.setGlobalStiffness(1e5);

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

    // Create group for platforms and add ground
    platforms = game.add.group();
    var groundSprite = game.add.sprite(1200, 600 - 35, 'ground')
    ground = platforms.add(groundSprite);

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

    // Give physics to ground and give it worldMaterial
    game.physics.p2.enable(ground, DEBUG);
    ground.body.static = true;
    ground.body.setMaterial(worldMaterial);

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

    groundBoxesCM.friction = 5.0;     // Friction to use in the contact of these two materials.
    //groundBoxesCM.restitution = 1.0;  // Restitution (i.e. how bouncy it is!) to use in the contact of these two materials.
    //groundBoxesCM.stiffness = 1e3;    // Stiffness of the resulting ContactEquation that this ContactMaterial generate.
    //groundBoxesCM.relaxation = 0;     // Relaxation of the resulting ContactEquation that this ContactMaterial generate.
    //groundBoxesCM.frictionStiffness = 1e7;    // Stiffness of the resulting FrictionEquation that this ContactMaterial generate.
    //groundBoxesCM.frictionRelaxation = 3;     // Relaxation of the resulting FrictionEquation that this ContactMaterial generate.
    //groundBoxesCM.surfaceVelocity = -1.0;        // Will add surface velocity to this material. If bodyA rests on top if bodyB, and the surface velocity is positive, bodyA will slide to the right.

    text = game.add.text(15, 15, 'move with arrow, space to jump', { fill: '#ffffff', fontSize: '18px' });

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    hitButton = game.input.keyboard.addKey(Phaser.Keyboard.M);

    game.camera.follow(player, 1, .5, 0);

}

function update() {

    game.physics.arcade.collide(ground, player)

    if(hitButton.isDown && game.time.now > swooshTimer)
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
    }

}

function render()
{
    /*game.debug.cameraInfo(game.camera, 32, 32);
    game.debug.spriteCoords(player, 32, 500);
    game.debug.spriteBounds(player);*/	

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
