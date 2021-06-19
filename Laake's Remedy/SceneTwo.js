
var tweens_plateformesSceneDeux;
var loupSceneDeux;
var ratSceneDeux;
var zone_ratSceneDeux;
var vampireSceneDeux;
var zone_vampireSceneDeux;
var changementZonesScene3;

class SceneTwo extends Phaser.Scene{
    constructor(){
        super("SceneTwo");
        //this.pad.null;
    }
    init(data){
    }
    preload(){ 
        //Tiles
        this.load.image('tiles','assets/TilesSet_Plateforme3.png');
        this.load.tilemapTiledJSON("SceneDeux", "SceneDeux.json");
        //Décors
       this.load.image('VilleDevant','assets/VilleSceneUn.png');
       this.load.image('VilleDerriere','assets/DecorFond.png');
    }
    create(){

        laakeHp = 5;
        player = this.physics.add.sprite(53, 200, 'TestPlayer').setScale(0.4).setDepth(2).setSize(200,200).setOffset(50,25);
        vision = true;
        remde = 1;

        const map = this.make.tilemap({key:'SceneDeux'});

        const tileset = map.addTilesetImage('TilesSet_Plateforme3', 'tiles');

        const SceneDeux_MurChange = map.createStaticLayer('SceneDeux_Mur De Fin', tileset, 0, 0);
        const SceneDeux_Mur = map.createStaticLayer('SceneDeux_Delimitation', tileset, 0, 0);
        const SceneDeux_Plateformes = map.createStaticLayer('SceneDeux_PlateformeTween', tileset, 0, 0);

        SceneDeux_Mur.setCollisionByExclusion(-1,true).setDepth(2);
        SceneDeux_Plateformes.setCollisionByExclusion(-1,true).setDepth(2);
        SceneDeux_MurChange.setCollisionByExclusion(-1,true).setDepth(2);

        //Spritesheet ennemi
        loupSceneDeux= this.physics.add.sprite(730, 750, 'Loup').setScale(0.4).setDepth(2);
        vampireSceneDeux = this.physics.add.sprite(1200,100,'Vamp').setDepth(2);
        ratSceneDeux = this.physics.add.sprite(100,330,'Rat').setDepth(2);

        this.add.image(0,0,'VilleDevant').setScrollFactor(0.5).setOrigin(0).setDepth(1);
        this.add.image(0,0,'VilleDerriere').setScrollFactor(0.25).setOrigin(0).setDepth(0).setScrollFactor(0.40);

        potionVie = this.physics.add.sprite(20,40,'PotionVie').setDepth(5).setScrollFactor(0);
        potionVie.body.setAllowGravity(false);


        //Délimitation des limites du mondes 
        this.physics.world.setBounds(0,0,4880,1824);
        this.cameras.main.startFollow(player,true,0.05,0.05);
        this.cameras.main.setBounds(0, 0,4880,1824);

        
        player.setCollideWorldBounds(true); 


        //Création du Brouillard
        this.Fog= this.physics.add.staticGroup();
        brouillard2 = this.Fog.create(0,0,'Brouillard2').setDepth(3);
        brouillard3 = this.Fog.create(0,0,'Brouillard3').setDepth(3);


        //Zone Aggro Loup1
        zone_LoupSceneDeux = this.add.zone(730, 750).setSize(350, 750);
        this.physics.world.enable(zone_LoupSceneDeux);
        zone_LoupSceneDeux.body.setAllowGravity(false);
        zone_LoupSceneDeux.body.moves = false;


        //Zone Aggro Vamp1
        vampireSceneDeux.body.setAllowGravity(false);
        zone_vampireSceneDeux = this.add.zone(300,300).setSize(850,200);
        this.physics.world.enable(zone_vampireSceneDeux);
        zone_vampireSceneDeux.body.setAllowGravity(false);
        zone_vampireSceneDeux.body.moves = false;


        //Zone Aggro Rat1
        ratSceneDeux.body.setAllowGravity(false);
        zone_ratSceneDeux = this.add.zone(300,300).setSize(850,200);
        this.physics.world.enable(zone_ratSceneDeux);
        zone_ratSceneDeux.body.setAllowGravity(false);
        zone_ratSceneDeux.body.moves = false;

        //Collider 

        this.physics.add.collider(player,SceneDeux_Mur);
        this.physics.add.collider(player,SceneDeux_Plateformes);
        this.physics.add.collider(player,SceneDeux_MurChange,changementZoneScene3);
        
        this.physics.add.collider(player,loupSceneDeux,AttaqueEnnemi,null,this);
        this.physics.add.collider(player,loupSceneDeux,GetKilled,null,this);
        this.physics.add.collider(player,ratSceneDeux,AttaqueRat,null,this);
        this.physics.add.collider(player,ratSceneDeux,GetKilled,null,this);
        this.physics.add.collider(player,vampireSceneDeux,AttaqueVamp,null,this);
        this.physics.add.collider(player,vampireSceneDeux,GetKilled,null,this);

        this.physics.add.collider(loupSceneDeux,SceneDeux_Mur);

        //Overlaps
        //this.physics.add.overlap(player,zone_Loup,LoupRush,null,this);
        //this.physics.add.overlap(player,zone_vampire,VampRush,null,this);
        //this.physics.add.overlap(player,zone_rat,RatRush,null,this);



        function AttaqueEnnemi(player, loupSceneDeux){ 
            if (loupSceneDeux.body.touching.up && player.body.touching.down){
                loupSceneDeux.body.destroy();
                statut_Ennemi = false; 
                if (statut_Ennemi == true){
                    ennemy_aggro = true;
                    this.physics.moveToObject(ennemi, player, 200);
                    zone_LoupSceneDeux.body.debugBodyColor = zone_LoupSceneDeux.body.touching.none ? 0x00ffff : 0xffff00;
                }
                if(statut_Ennemi == false)
                {
                    tweens_ennemy.stop();
                    ennemy_aggro = false;
                    loupSceneDeux.setVelocityX(0);
                    console.log('ennemi a pu');
                    

                }
                               
            }
        }
        function AttaqueVamp(player, vampireSceneDeux){ 
            if (vampireSceneDeux.body.touching.up && player.body.touching.down){
                vampireSceneDeux.destroy();
            }
        }

        function AttaqueRat(player, ratSceneDeux){ 
            if (ratSceneDeux.body.touching.down && player.body.touching.down){
                ratSceneDeux.destroy();
            }
        }

        //Création Animation

        this.anims.create({
            key:'Move',
            frames:this.anims.generateFrameNumbers('TestPlayer',{start : 0, end : 5}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key:'MoveRat',
            frames: this.anims.generateFrameNumbers('Rat',{start :0, end :5}),
            frameRate: 10,
            repeat:0
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
        })

        this.anims.create({
            key:'Wolf',
            frames:this.anims.generateFrameNumbers('Loup',{start : 0, end : 5}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key:'Vamp',
            frames:this.anims.generateFrameNumbers('Vamp',{start : 0, end : 10}),
            frameRate: 10,
            repeat: -1
        });


    //Clé KeyBoard

    keys = this.input.keyboard.addKeys({
        left: Phaser.Input.Keyboard.KeyCodes.Q,
        right: Phaser.Input.Keyboard.KeyCodes.D,
        up : Phaser.Input.Keyboard.KeyCodes.Z,
        down: Phaser.Input.Keyboard.KeyCodes.S,
        space: Phaser.Input.Keyboard.KeyCodes.SPACE,
        shift: Phaser.Input.Keyboard.KeyCodes.SHIFT,
        ù: Phaser.Input.Keyboard.KeyCodes.O,
    })


    //Création Tween
    tweens_ennemy = this.tweens.add({
        targets: loupSceneDeux,
        x: 1100,
        duration: 2000,
        ease: 'Sine.easeInOut',
        repeat: -1,
        yoyo: true
    });
    

    
    vamp_tweens= this.tweens.add({
        targets: vampireSceneDeux,
        x: 400,
        duration: 2000,
        ease: 'Sine.easeInOut',
        repeat: -1,
        yoyo: true
    });

    rat_tweens = this.tweens.add({
        targets: ratSceneDeux,
        y: -100,
        duration: 600,
        ease: 'Sine.easeInOut',
        repeat: 0,
        yoyo: false
    });

    tweens_plateformes= this.tweens.add({
        targets: SceneDeux_Plateformes,
        x: 300,
        duration: 2000,
        ease: 'Sine.easeInOut',
        repeat: -1,
        yoyo: true
    });
    
    //this.tweens.add({
    //    targets: plateformeMouvX,
    //    x: 800,
    //    duration: 2000,
    //    ease: 'Sine.easeInOut',
    //    repeat: -1,
    //    yoyo: true
    //});

    //this.tweens.add({
    //    targets: plateformeMouvY,
    //    y: 400,
    //    duration: 2000,
    //    ease: 'Sine.easeInOut',
    //    repeat: -1,
    //    yoyo: true
    //});

        
        
    }

    update(){


        tweens_plateformes.play();
        loup.anims.play('Wolf',true);
        vampire.anims.play('Vamp',true);


        if (zone_LoupSceneDeux.body.touching.none){
            ennemy_aggro = false;
            tweens_ennemy.play();
        }
        zone_LoupSceneDeux.body.debugBodyColor = zone_LoupSceneDeux.body.touching.none ? 0x00ffff : 0xffff00;

        if (zone_vampireSceneDeux.body.touching.none){
            vampire_aggro = false;
            vamp_tweens.play();
            vampireSceneDeux.x = 1200;
            vampireSceneDeux.y = 100;

            
        }
        zone_vampireSceneDeux.body.debugBodyColor = zone_vampireSceneDeux.body.touching.none ? 0x00ffff : 0xffff00;

        if (zone_ratSceneDeux.body.touching.none){
            rat_aggro = false;
            ratSceneDeux.x = 450;
            ratSceneDeux.y = 370;
            rat_tweens.pause();

            
        }
        zone_ratSceneDeux.body.debugBodyColor = zone_ratSceneDeux.body.touching.none ? 0x00ffff : 0xffff00;
      

        if (keys.left.isDown)
            {
                player.setVelocityX(-260);
                player.anims.play('Move',true);
                player.setFlipX(true);
            

            }
            else if (keys.right.isDown){
                player.setVelocityX(260);
                player.anims.play('Move',true);
                ratSceneDeux.anims.play('MoveRat',true); 
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
            
            if (changementZonesScene3 == true){
            changementZonesScene3 = false;
            this.scene.start("SceneThree");
            console.log("changement");
            //changementZones = false;
        }
        tropfort();

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
function Chute(platformeTombe,player){
        platformeTombe = true;
       
    }

    function LoupRush ()
    {
        ennemy_aggro = true;
        this.physics.moveToObject(loupSceneDeux, player, 200);
        zone_LoupSceneDeux.body.debugBodyColor = zone_LoupSceneDeux.body.touching.none ? 0x00ffff : 0xffff00;
        tweens_ennemy.pause();
    }

    function VampRush ()
    {
        Vamp_aggro = true;
        this.physics.moveToObject(vampireSceneDeux, player, 320);
        zone_vampireSceneDeux.body.debugBodyColor = zone_vampireSceneDeux.body.touching.none ? 0x00ffff : 0xffff00;
        vamp_tweens.pause();

        
    }

    function RatRush ()
    {
        rat_aggro = true;
        //this.physics.moveToObject(rat, player, 320);
        zone_ratSceneDeux.body.debugBodyColor = zone_rat.body.touching.none ? 0x00ffff : 0xffff00;
        rat_tweens.play();

    }

    function GetKilled(){   

        if(invincible == false){
            invincible = true ;
             
            //player.setTint(0x589ac6 );
            //viePleine3.setDepth(0);
            //vieVide3.setDepth(5)
            laakeHp = laakeHp -1;
            console.log(laakeHp);

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
                 setTimeout(function(){player.anims.play('Death',true)}, 0);
                 gameOver = true;
                 console.log('noob');
                 setTimeOut(function(){this.scene.restart()},200000000);

             }
}


    function changementZoneScene3 ()
    {
        changementZonesScene3 = false;
        //changementZones = true;
        console.log('OUI')
    }
