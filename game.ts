/// <reference path="node_modules/phaser-ce/typescript/phaser.d.ts"/>
 

class SimpleGame 
{

    
        constructor() 
        {
            var config = 
            {
                type: Phaser.AUTO,
                width: 800,
                height: 600,
                physics: 
                {
                    default: 'arcade',
                    arcade: 
                    {
                        gravity: {y: 500},
                        debug: false
                    }
                },
                scene: 
                {
                    key: 'main',
                    preload: this.preload,
                    create: this.create,
                    update: this.update
                }
            };
             
            this.game = new Phaser.Game(config);
        }
    
        game: Phaser.Game;
    
        preload() 
        {
            this.game.load.image('logo', 'assets/phaser-logo-small.png');
            this.game.load.image('panel_brown', 'assets/UI/PNG/panel_brown.png');
        }
    
        create() 
        {
            var panel = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'panel_brown')

            panel.anchor.setTo(0.5, 0.5);
            panel.scale.setTo(3, 3);

            
        }

        update()
        {

        }
    
    }
    
    window.onload = () => 
    {

        var game = new SimpleGame();
    
    };