
var player;
var Boss;
var Fog;
var plateformeTest;
var keys;
var Brouillard;
var brouillard2;
var brouillard3;



//Var Loots
var ingredients;



//Var Verouillage porte
var locker;
var cle =0;
//Tiles


//Var Zones Ennemis
var loups;
var loup;
var FaimLoup = false;
var rat;
var vampire;
var statut_Boss;



//var zone;
//var zone_Loup;
var zone_vampire;
var vampireRush = true;
var zone_rat;
var zoneRush;
var rat_aggro;
// VariablesVies
var viePleine1;
var vieVide1;
var viePleine2;
var vieVide2;
var viePleine3;
var vieVide3;
var viePleine4;
var vieVide4;
var viePleine5;
var vieVide5;
var laakeHp = 5;
var potionVie;

//Var Fonction joueur
var vision = true;
var remede = 0;
var invincible = false;
var invincibletime = 0;
var doubleJumps = true;
var allowDoubleJump = false;
var gameOver = false;

//Var Plateformes
var platformeTombe;
var platformeChute;
var plateformeJump;
var plateformeTrampo;
var plateformeMouvX;
var plateformeMouvY;
var tweens_plateformes;

// Var Tweens
var tweens_ennemy;
var statut_Ennemi = true;
var vamp_tweens;
var rat_tweens;
var ennemy_aggro = false;
var vampire_aggro = false;
var rat_aggro = false;
var ratRush;
//var cursors;



class SceneOne extends Phaser.Scene {
    constructor(){
         super("SceneOne");
    }
       
        //this.pad.null;
    
    init(data){
    }
    preload(){

        //Tiles
        this.load.image('tiles','assets/TilesSet_Plateforme3.png');
        this.load.tilemapTiledJSON("SceneUn", "SceneUn.json");
        
        //Test
        this.load.spritesheet('TestPlayer','assets/SScourseFinale.png',{frameWidth:327,frameHeight:279});
        this.load.spritesheet('TestPlayer','assets/AnimMortLaake.png',{frameWidth:327,frameHeight:279});
        this.load.spritesheet('Rat','assets/animRatFinale.png',{frameWidth:176,frameHeight:256});
        this.load.spritesheet('Repos','assets/SSRepos.png',{frameWidth:186,frameHeight:279});
        this.load.image('PlateformeTest', 'assets/PlateformeTest.png');
        this.load.image('PotionTest','assets/Potiontest.png');
        this.load.spritesheet('PotionVie','assets/SpriteSheetPotion.png',{frameWidth:128,frameHeight:107});

        //Brouillard
        this.load.image('Brouillard','assets/BrouillardGood1.png');
        this.load.image('Brouillard2','assets/BrouillardGood2.png');
        this.load.image('Brouillard3','assets/BrouillardGood3.png');
        //this.load.image('zone','assets/zone.png');
       
        //Vie Joueur
        this.load.image('ViePleine','assets/ViePleine.png');
        this.load.image('VieVide','assets/VieVide.png');
        this.load.image('GameOver','assets/GameOverScreen.png');
        this.load.image('cle','assets/cle.png');
        this.load.image('PotionRemede','assets/PotionRemede.png');
        this.load.image('Potionvie1','assets/Potion1.png');
        this.load.image('Potionvie2','assets/Potion1.png');
        this.load.image('Potionvie3','assets/Potion1.png');
        this.load.image('Potionvie4','assets/Potion1.png');
        this.load.image('Potionvie5','assets/Potion1.png');

        //Ennemis

        this.load.spritesheet('Loup','assets/animloupGood.png',{frameWidth:315,frameHeight:256});
        this.load.spritesheet('Vamp','assets/animvampGood.png',{frameWidth:170,frameHeight:256});


        //Décors
        this.load.image('VilleDevant','assets/VilleSceneUn.png');
        this.load.image('VilleDerriere','assets/DecorFond.png');
    }
    create(){

        laakeHp = 5;
        vision = true;
        remede = 0;
        
        const map = this.make.tilemap({key:'SceneUn'});

        const tileset = map.addTilesetImage('TilesSet_Plateforme3', 'tiles');

        const MurChange = map.createStaticLayer('Mur de Fin', tileset, 0, 0);
        const Mur = map.createStaticLayer('Délimitation', tileset, 0, 0);
        const SafeZone = map.createStaticLayer('Safe Zone', tileset, 0, 0);
        const Plateformes = map.createStaticLayer('Plateformes', tileset, 0, 0);
        const Plateforme_Tween = map.createStaticLayer('Plateforme_tween', tileset, 0, 0);
        const Porte = map.createStaticLayer('Ouverture Porte', tileset, 0, 0);

        const enemieObjects = map.getObjectLayer('loup').objects;
        this.loups = this.physics.add.group({
            allowGravity: true
        }); 
        for (const loup of enemieObjects) {
        this.loups.create(loup.x, loup.y, 'Loup').setScale(0.4).setDepth(2);
        }
        Mur.setCollisionByExclusion(-1,true).setDepth(2);
        Plateforme_Tween.setCollisionByExclusion(-1,true).setDepth(2);
        Plateformes.setCollisionByExclusion(-1,true).setDepth(2);
        Porte.setCollisionByExclusion(-1,true).setDepth(2);
        MurChange.setCollisionByExclusion(-1,true).setDepth(2);
        SafeZone.setCollisionByExclusion(-1,true).setDepth(2);
        



        //Spritesheet de Laake's Remedy
        player = this.physics.add.sprite(100, 1660, 'TestPlayer').setScale(0.4).setDepth(2).setSize(200,200).setOffset(50,25);
        //loup = this.physics.add.sprite(1900, 1660, 'Loup').setScale(0.4).setDepth(2);
        vampire = this.physics.add.sprite(1410,1190,'Vamp').setDepth(2).setScale(0.4);
        rat = this.physics.add.sprite(2510,269,'Rat').setDepth(2).setScale(0.4);

        locker = this.physics.add.sprite(1108, 1490, 'cle').setScale(0.4).setDepth(2);
        locker.body.setAllowGravity(false);
    

        this.add.image(0,0,'VilleDevant').setScrollFactor(0.5).setOrigin(0).setDepth(1);
        this.add.image(2880,0,'VilleDevant').setScrollFactor(0.5).setOrigin(0).setDepth(1);
        this.add.image(11390,0,'VilleDevant').setScrollFactor(0.5).setOrigin(0).setDepth(1);
        this.add.image(0,0,'VilleDerriere').setScrollFactor(0.3).setOrigin(0).setDepth(0).setScrollFactor(0.40);
        this.add.image(2880,0,'VilleDerriere').setScrollFactor(0.3).setOrigin(0).setDepth(0).setScrollFactor(0.40);
        this.add.image(11390,0,'VilleDerriere').setScrollFactor(0.3).setOrigin(0).setDepth(0).setScrollFactor(0.40);


        viePleine1 = this.physics.add.staticGroup();
        viePleine2 = this.physics.add.staticGroup();
        viePleine3 = this.physics.add.staticGroup();
        viePleine4 = this.physics.add.staticGroup();
        viePleine5 = this.physics.add.staticGroup();
       
        potionVie = this.physics.add.sprite(20,40,'PotionVie').setDepth(5).setScrollFactor(0);
        potionVie.body.setAllowGravity(false);
        ingredients = this.physics.add.image(1871,139, 'PotionRemede').setSize(120,120).setDepth(1).setScale(0.25);
        ingredients.body.setAllowGravity(false);
        gameOver = this.add.image('GameOver');


        //camera follow joueur
        this.physics.world.setBounds(0,0,14370,1824);
        this.cameras.main.startFollow(player,true,0.05,0.05);
        this.cameras.main.setBounds(0, 0,14370,1824);



        player.setCollideWorldBounds(true); 

        this.Fog= this.physics.add.staticGroup();
        Brouillard = this.Fog.create(0,0,'Brouillard').setDepth(3);
        brouillard2 = this.Fog.create(0,0,'Brouillard2').setDepth(3);
        brouillard3 = this.Fog.create(0,0,'Brouillard3').setDepth(3);
        this.plateformes = this.physics.add.staticGroup();
        plateformeTest = this.plateformes.create(150,550,'PlateformeTest').setDepth(0);
        plateformeTest = this.plateformes.create(850,550,'PlateformeTest').setDepth(0);
        plateformeTest = this.plateformes.create(1250,520,'PlateformeTest').setDepth(0);
        plateformeTest = this.plateformes.create(500,520,'PlateformeTest').setDepth(0);

        //zone_Loup = this.add.zone(1860, 1660).setSize(650, 100);
        //this.physics.world.enable(zone_Loup);
        //zone_Loup.body.setAllowGravity(false);
        //zone_Loup.body.moves = false;
//

        vampire.body.setAllowGravity(false);
        zone_vampire = this.add.zone(1410,1579).setSize(850,200);
        this.physics.world.enable(zone_vampire);
        zone_vampire.body.setAllowGravity(false);
        zone_vampire.body.moves = false;

        rat.body.setAllowGravity(false);
        zone_rat = this.add.zone(2510,169).setSize(450,100);
        this.physics.world.enable(zone_rat);
        zone_rat.body.setAllowGravity(false);
        zone_rat.body.moves = false;

        this.physics.add.collider(player, plateformeTest).setOffSet;
        this.physics.add.collider(player,Mur);
        this.physics.add.collider(player,Plateforme_Tween);
        this.physics.add.collider(locker,Plateformes);
        this.physics.add.collider(player,Plateformes);
        this.physics.add.collider(player,Porte);
        this.physics.add.collider(this.loups,Mur);
  

   

            
        this.physics.add.collider(player,this.loups,AttaqueEnnemi,null,this);
        this.physics.add.collider(this.loups,player,GetKilled,null,this);
        this.physics.add.collider(player,locker,OuverturePorte);
        this.physics.add.collider(player,rat,AttaqueRat,null,this);
        this.physics.add.collider(player,rat,GetKilled,null,this);
        this.physics.add.collider(player,vampire,AttaqueVamp,null,this);
        this.physics.add.collider(player,vampire,GetKilled,null,this);
        this.physics.add.collider(vampire,plateformeTest);
        //this.physics.add.overlap(player,zone_Loup,LoupRush,null,this);
        this.physics.add.overlap(player,zone_vampire,VampRush,null,this);
        this.physics.add.overlap(player,zone_rat,RatRush,null,this);

        this.physics.add.overlap(ingredients,player,BoisTaPotion);

        platformeTombe = this.physics.add.group();

        this.plateformeMouvX = this.physics.add.group();
        plateformeMouvX = this.plateformeMouvX.create(350,950,'PlateformeTest').setDepth(0);
        plateformeMouvX.body.setAllowGravity(false);
        this.physics.add.collider(player, plateformeMouvX);
        

        platformeChute = platformeTombe.create(700,550,'PlateformeTest').setDepth(0);
        platformeChute.body.allowGravity = false;
        this.physics.add.collider(platformeTombe,player,Chute());

        function OuverturePorte(){
            cle = cle+1
            console.log('ouvert!')
            locker.destroy();
            if (cle ==1){
                Porte.setAlpha(0);
                Porte.setCollisionByExclusion(0,true);
            }
            
        }

        function AttaqueEnnemi(player, loup){ 
            if (loup.body.touching.up && player.body.touching.down){
                loup.setVisible(false);
                loup.setVelocityX(0);
                statut_Ennemi = false; 
                if (statut_Ennemi == true){
                    ennemy_aggro = true;
                    this.physics.moveToObject(loup, player, 200);
                    //zone_Loup.body.debugBodyColor = zone_Loup.body.touching.none ? 0x00ffff : 0xffff00;
                }

        
                if(statut_Ennemi == false)
                {
                    loup.body.destroy();
                    FaimLoup = false;
                    loup.setVelocityX(0);
                    console.log('ennemi a pu');
                    

                }
                               
            }
        }
        function AttaqueVamp(player, vampire){ 
            if (vampire.body.touching.up && player.body.touching.down){
                vampire.body.destroy();
            }
        }

        function AttaqueRat(player, rat){ 
            if (rat.body.touching.down && player.body.touching.down){
                rat.body.destroy();
            }
        }


        this.anims.create({
            key:'Move',
            frames:this.anims.generateFrameNumbers('TestPlayer',{start : 0, end : 14}),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key:'Death',
            frames:this.anims.generateFrameNumbers('TestPlayer',{start : 0, end : 24}),
            frameRate: 20,
            repeat: 0
        });

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
        });

        this.anims.create({
            key:'Repos',
            frames: this.anims.generateFrameNumbers('repos',{start :0, end :6}),
            frameRate: 10,
            repeat:0
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

        
        tweens_plateformes= this.tweens.add({
            targets: Plateforme_Tween,
            x: 300,
            duration: 2000,
            ease: 'Sine.easeInOut',
            repeat: -1,
            yoyo: true
        });
         
    

        //tweens_ennemy = this.tweens.add({
        //    targets: loup,
        //    x: 2459,
        //    duration: 2000,
        //    ease: 'Sine.easeInOut',
        //    repeat: -1,
        //    yoyo: true
        //});

        
        

        
        vamp_tweens= this.tweens.add({
            targets: vampire,
            x: 1802,
            duration: 2000,
            ease: 'Sine.easeInOut',
            repeat: -1,
            yoyo: true
        });

        rat_tweens = this.tweens.add({
            targets: rat,
            y: 169,
            duration: 600,
            ease: 'Sine.easeInOut',
            repeat: 0,
            yoyo: false
        });

        
        this.tweens.add({
            targets: plateformeMouvX,
            x: 800,
            duration: 2000,
            ease: 'Sine.easeInOut',
            repeat: -1,
            yoyo: true
        });

        this.tweens.add({
            targets: plateformeMouvY,
            y: 400,
            duration: 2000,
            ease: 'Sine.easeInOut',
            repeat: -1,
            yoyo: true
        });


    

    }
    update(){

        vampire.anims.play('Vamp',true);

       //if (zone_Loup.body.touching.none && laakeHp>= 2){
       //    ennemy_aggro = false;
       //    tweens_ennemy.play();
       //}
       //zone_Loup.body.debugBodyColor = zone_Loup.body.touching.none ? 0x00ffff : 0xffff00;


       

        //if (loup.x > 2352 && loup.x < 2497){
        //    loup.setFlipX(true); 
        //}
        //    
        //else if(loup.x > 2890 && loup.x < 2920){
        //    loup.setFlipX(false);
        //}

        if (zone_vampire.body.touching.none && laakeHp>= 2){
                   vampire_aggro = false;
                   vamp_tweens.play();
                   vampire.x = 1410;
                   vampire.y = 1390;

               }
        
        zone_vampire.body.debugBodyColor = zone_vampire.body.touching.none ? 0x00ffff : 0xffff00;

        if (zone_rat.body.touching.none && laakeHp>= 2){
            rat_aggro = false;
            rat.x = 2510;
            rat.y = 269;
            rat_tweens.pause();
            
        }
        zone_rat.body.debugBodyColor = zone_rat.body.touching.none ? 0x00ffff : 0xffff00;
      
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
                //loup.anims.play('Wolf',true);
                player.setFlipX(false);

            }
            else
            {
                player.setVelocityX(0);

            }

            if (keys.up.isDown && player.body.blocked.down)
            {
                player.setVelocityY(-350);
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
                Brouillard.x = player.x;
                Brouillard.y = player.y - 200;

                brouillard2.x = player.x;
                brouillard2.y = player.y - 200; 

                brouillard3.x = player.x;
                brouillard3.y = player.y - 200; 
            }
            

            
            
            else
            {
                gameOver = true
                player.setAccelerationY(100);

            }
            
            

            tropfort();

        for (const loup of this.loups.children.entries) {
            if (FaimLoup == false){ 
    
                if (loup.body.blocked.right) {
                    loup.direction = 'gauche';
                    loup.flipX= false;
                }
                if (loup.body.blocked.left) {
                    loup.direction = 'droite';
                    loup.flipX= true;
                }

                else if (loup.direction === 'gauche'){
                    loup.setVelocityX(-200);
                    loup.anims.play('Wolf', true);
    
                }
                else{
                    loup.setVelocityX(200);
                    loup.anims.play('Wolf', true);
    
                }
    
    
                if( loup.direction ==='droite' && player.x - loup.x <481 && player.x - loup.x > 0 && loup.y - player.y < 64 && loup.y - player.y > -64){
                    FaimLoup = true;
    
                }
                if( loup.direction ==='gauche' && loup.x - player.x < 481 && loup.x - player.x > 0 && loup.y - player.y < 64 && loup.y - player.y > -64 ){
                    FaimLoup = true;
                }
            }
            if (FaimLoup === true){
                if (player.x - loup.x <481 && player.x - loup.x > 32 && loup.y - player.y < 321 && loup.y - player.y > -64){
                    loup.setVelocityX(350);
                    loup.flipX= false;
                    loup.anims.play('Wolf', true);
                }
                else if (loup.x - loup.x < 481 && loup.x - player.x > 32 && loup.y - player.y < 321 && loup.y - player.y > -64 ){
                    loup.setVelocityX(-350);
                    loup.flipX= true;
                    loup.anims.play('Wolf', true);
                }
    
    
            }
            else{
                FaimLoup= false;
                }
    
        }

               
        }
    }
        


    function GetKilled(){ 
            //invincible = false;  
            laakeHp = laakeHp -1;
                       if(invincible == false){
                           
                           invincible = true ;
                            
                           player.setTint(0x589ac6 );
                           //viePleine3.setDepth(0);
                           //vieVide3.setDepth(5)
                           
                           console.log(laakeHp);          
                            console.log('tu');
                            if (laakeHp == 5){
                                potionVie.anims.play('health1',true);
                                console.log('tu');}
                             
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
        }
                      
                   


    function tropfort(){
        if (invincible == true){
            if( invincibletime <= 10){
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

       //function LoupRush ()
       //{
       //    ennemy_aggro = true;
       //    this.physics.moveToObject(loup, player, 350);
       //    zone_Loup.body.debugBodyColor = zone_Loup.body.touching.none ? 0x00ffff : 0xffff00;
       //    tweens_ennemy.pause();
       //}

        function VampRush ()
        {
            Vamp_aggro = true;
            this.physics.moveToObject(vampire, player, 320);
            zone_vampire.body.debugBodyColor = zone_vampire.body.touching.none ? 0x00ffff : 0xffff00;
            vamp_tweens.pause();

            
        }

        function RatRush ()
        {
            rat_aggro = true;
            //this.physics.moveToObject(rat, player, 320);
            zone_rat.body.debugBodyColor = zone_rat.body.touching.none ? 0x00ffff : 0xffff00;
            rat_tweens.play();

        }

        function BoisTaPotion ()
        {
            remede = remede +1;
            if (remede == 1){
                Brouillard.setAlpha(0);
                brouillard2.setDepth(2);
                console.log('potion1');
                ingredients.disableBody(true,true);
                ingredients.body.destroy();
       
            }

        }


    



    


        