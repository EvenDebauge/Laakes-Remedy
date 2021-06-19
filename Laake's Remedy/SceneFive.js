

var FogSceneCinq;

class SceneFive extends Phaser.Scene {
    constructor(){
         super("SceneFive");
    }
       
        //this.pad.null;
    
    init(data){
    }
    preload(){
        this.load.image('tiles','assets/TilesSet_Plateforme3.png');
        this.load.tilemapTiledJSON("SceneCinq", "SceneCinq.json");

        //Décors
        this.load.image('VilleDevant','assets/VilleSceneUn.png');
        this.load.image('VilleDerriere','assets/DecorFond.png');

    }
    create(){

        vision = true;

        const map = this.make.tilemap({key:'SceneCinq'});

        const MurChange = map.createStaticLayer('SceneCinq_Mur de Fin', tileset, 0, 0);
        const Mur = map.createStaticLayer('SceneCinq_Delimitation', tileset, 0, 0);
        const Plateformes = map.createStaticLayer('SceneCinq_Plateformes', tileset, 0, 0);

        Mur.setCollisionByExclusion(-1,true).setDepth(2);
        Plateformes.setCollisionByExclusion(-1,true).setDepth(2);
        MurChange.setCollisionByExclusion(-1,true).setDepth(2);

        //Spritesheet de Laake's Remedy
        player = this.physics.add.sprite(63, 217, 'TestPlayer').setScale(0.4).setDepth(2).setSize(200,200).setOffset(50,25);

        this.add.image(0,0,'VilleDevant').setScrollFactor(0.5).setOrigin(0).setDepth(1);
        this.add.image(0,0,'VilleDerriere').setScrollFactor(0.25).setOrigin(0).setDepth(0).setScrollFactor(0.40);

        viePleine1 = this.physics.add.staticGroup();
        viePleine2 = this.physics.add.staticGroup();
        viePleine3 = this.physics.add.staticGroup();
        viePleine4 = this.physics.add.staticGroup();
        viePleine5 = this.physics.add.staticGroup();

        potionVie = this.physics.add.sprite(20,40,'PotionVie').setDepth(5).setScrollFactor(0);
        potionVie.body.setAllowGravity(false);
        gameOver = this.add.image('GameOver');

        this.physics.world.setBounds(0,0,4880,1824);
        this.cameras.main.startFollow(player,true,0.05,0.05);
        this.cameras.main.setBounds(0, 0,4880,1824);
        player.setCollideWorldBounds(true); 

        this.Fog= this.physics.add.staticGroup();
        brouillard2 = this.Fog.create(0,0,'BrouillardGood2').setDepth(3);
        brouillard3 = this.Fog.create(0,0,'BrouillardGood3').setDepth(3);

        this.physics.add.collider(player,Mur);
        this.physics.add.collider(player,Plateformes);

        function AttaqueEnnemi(player, loup){ 
            if (loup.body.touching.up && player.body.touching.down){
                loup.setVisible(false);
                loup.setVelocityX(0);
                statut_Boss = false; 
                //ennemi.body.immovable;
                if (statut_Ennemi == true){
                    ennemy_aggro = true;
                    this.physics.moveToObject(loup, player, 200);
                    zone_Loup.body.debugBodyColor = zone_Loup.body.touching.none ? 0x00ffff : 0xffff00;
                }
                if(statut_Boss == false)
                {
                    tweens_ennemy.stop();
                    ennemy_aggro = false;
                    loup.setVelocityX(0);
                    console.log('Boss a pu');
                    

                }
                               
            }
        }

        this.anims.create({
            key:'Move',
            frames:this.anims.generateFrameNumbers('TestPlayer',{start : 0, end : 14}),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key:'health1',
            frames: [ { key: 'PotionVie', frame: 0} ],
            frameRate: 10,
        });

        this.anims.create({
            key:'health2',
            frames: [ { key: 'PotionVie', frame: 1} ],
            frameRate: 5,
        });

        this.anims.create({
            key:'health3',
            frames: [ { key: 'PotionVie', frame: 2} ],
            frameRate: 5,
        });

        this.anims.create({
            key:'health4',
            frames: [ { key: 'PotionVie', frame: 3} ],
            frameRate: 5,
        });

        this.anims.create({
            key:'health5',
            frames: [ { key: 'PotionVie', frame: 4} ],
            frameRate: 5,
        });

        keys = this.input.keyboard.addKeys({
            left: Phaser.Input.Keyboard.KeyCodes.Q,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            up : Phaser.Input.Keyboard.KeyCodes.Z,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            space: Phaser.Input.Keyboard.KeyCodes.SPACE,
            shift: Phaser.Input.Keyboard.KeyCodes.SHIFT,
            ù: Phaser.Input.Keyboard.KeyCodes.O,
            
    })

    
}
    update(){

        if (keys.left.isDown)
            {
                player.setVelocityX(-260);
                player.anims.play('Move',true);
                player.setFlipX(true);
            

            }
            else if (keys.right.isDown){
                player.setVelocityX(260);
                player.anims.play('Move',true);
                rat.anims.play('MoveRat',true); 
                player.setFlipX(false);

            }
            else
            {
                player.setVelocityX(0);

            }

            if (keys.up.isDown && player.body.blocked.down)
            {
                player.setVelocityY(-300);
                doubleJumps = true;
                allowDoubleJump = false;
            }
            

            if (doubleJumps == true && keys.up.isUp){
                allowDoubleJump = true;
            }
                    
            if (allowDoubleJump == true && keys.up.isDown){
                        player.setVelocityY(-300);
                        console.log('jump');
                        doubleJumps = false;
                        allowDoubleJump = false;
            }

            if(keys.down.isDown){
                player.setVelocityY(600);
            }
            else if (keys.space.isDown){
                player.setVelocityY(30);
            }
            if (vision == true)
            {
                Brouillard.Alpha= 1;
                //console.log('ou');
                Brouillard.x = player.x;
                Brouillard.y = player.y - 200;

                brouillard2.x = player.x;
                brouillard2.y = player.y - 200; 

                brouillard3.x = player.x;
                brouillard3.y = player.y - 200; 
            }
            

            
            
            else
            {
                player.setAccelerationY(100);
                gameOver.x = player.x;
                gameOver.y = player.y;
                //gameOver.setDepth(3);

            }

            tropfort();

        }
    }

    function GetKilled(){   

        if(invincible == false){
            invincible = true ;
             
            //player.setTint(0x589ac6 );
            //viePleine3.setDepth(0);
            //vieVide3.setDepth(5)
            laakeHp = laakeHp -1;
            console.log(laakeHp);
            //if (laakeHp == 5){
            // viePleine5.setAlpha(1);
            // viePleine4.setAlpha(0);
            // viePleine3.setAlpha(0);
            // viePleine2.setAlpha(0);
            // viePleine1.setAlpha(0);
            // console.log('tu');
             if (laakeHp == 5){
                 potionVie.anims.play('health1',true);
                 console.log('tu');}
             } 
            if (laakeHp == 4){
                 potionVie.anims.play('health2',true);
                 console.log('vas');
             }
            if (laakeHp == 3){
                 potionVie.anims.play('health3',true);
                console.log('presque');
             }
            if (laakeHp == 2){
                 potionVie.anims.play('health4',true);
                console.log('mourir');
                
             }
            if (laakeHp == 1){
                 potionVie.anims.play('health5',true);
                 player.setAlpha(0.3);
                 vision = false;
                 console.log('noob');
                 this.scene.restart();
                //player.staticGroup();
             }
}
       
    


function tropfort(){
if (invincible == true){
if( invincibletime <= 150){
 invincibletime ++ 
}
else{
 invincibletime = 0
 invincible= false
}
}
}

