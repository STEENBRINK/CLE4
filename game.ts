/// <reference path="node_modules/phaser-ce/typescript/phaser.d.ts"/>
 

class MainGame 
{
        constructor() 
        {
            /*let config = 
            {
                type: Phaser.AUTO,
                width: 800,
                height: 600,
                parent: 'content',
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
                    preload: this.preload,
                    create: this.create,
                }
            };*/

            var config = {
                width: 800,
                height: 600,
                renderer: Phaser.AUTO,
                parent: 'content',
                state: this,
            };
             
            this.game = new Phaser.Game(config);

            //this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { preload: this.preload, create: this.create });
        }
    
        game: Phaser.Game;
    
        preload() 
        {
            this.game.load.image('logo', 'assets/phaser-logo-small.png');
            this.game.load.image('panel_brown', 'assets/UI/PNG/panel_brown.png');
        }
    
        create() 
        {
            let panel = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'panel_brown');

            panel.anchor.setTo(0.5, 0.5);
            panel.scale.setTo(3, 3);

            this.game.add.tween(panel.scale).to({ x: 5, y: 5 }, 2000, Phaser.Easing.Bounce.Out, true);

            /*let logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');

            logo.anchor.setTo(0.5, 0.5);
            logo.scale.setTo(3, 3);

            this.game.add.tween(logo.scale).to({ x: 5, y: 5 }, 2000, Phaser.Easing.Bounce.Out, true);*/
        }

        update()
        {

        }
    
    }
    
    window.onload = () => 
    {

        let game = new MainGame();
    
    };