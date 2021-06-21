
var player;
var Boss;
var Fog;
var keys;
var Brouillard;
var brouillard2;
var brouillard3;



//Var Loots
var ingredients;
var ingredients2;

//Speedrun
var speedrunTimer = 0;
var speedrunMinute = 0;
var textTimer = 0;
var loopTimer;



//Var Verouillage porte
var locker;
var cle =0;
//Tiles


//Var Zones Ennemis
var loups;
var loup;
var FaimLoup = false;
var rats;
var rat;
var FaimRat = false;
//var vampire;
var vamps;
var vamp;
var FaimVamp = false;
var statut_Boss = true;



//var zone;
var chill;
var notChill;
var warning = false;
var zone_Boss1;
var zone_Boss2;
var zone_Boss3;
var atkBoss1;
var atkBoss2;
var atkBoss3;
var bossattaque = false;
//var zone_Loup;
//var zone_vampire;
//var vampireRush = true;
var zone_rat;
var zoneRush;
var rat_aggro;
// VariablesVies
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
var restart = false;

//Var Plateformes
var tweens_plateformes;

// Var Tweens
var tweens_ennemy;
var statut_Ennemi = true;
//var vamp_tweens;
var rat_tweens;
var ennemy_aggro = false;
//var vampire_aggro = false;
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
        this.load.spritesheet('Larare','assets/Larare.png',{frameWidth:300,frameHeight:500});
        this.load.spritesheet('Death','assets/AnimMortLaake.png',{frameWidth:356,frameHeight:364});
        this.load.spritesheet('Rat','assets/animRatFinale.png',{frameWidth:176,frameHeight:256});
        this.load.spritesheet('Repos','assets/SSRepos.png',{frameWidth:186,frameHeight:279});
        this.load.spritesheet('PotionVie','assets/SpriteSheetPotion.png',{frameWidth:128,frameHeight:107});

        //Brouillard
        this.load.image('Brouillard','assets/BrouillardGood1.png');
        this.load.image('Brouillard2','assets/BrouillardGood2.png');
        this.load.image('Brouillard3','assets/BrouillardGood3.png');
       
        //Vie Joueur
        this.load.image('interface','assets/interface.png');
        this.load.image('warning','assets/Warning.png'); 
        this.load.image('chill','assets/Chill.png'); 
        this.load.image('cle','assets/cle.png');
        this.load.image('PotionRemede','assets/PotionRemede.png');
        this.load.image('Potionvie1','assets/Potion1.png');
        this.load.image('Potionvie2','assets/Potion1.png');
        this.load.image('Potionvie3','assets/Potion1.png');
        this.load.image('Potionvie4','assets/Potion1.png');
        this.load.image('Potionvie5','assets/Potion1.png');
        this.load.image('AtckBoss','assets/AttakBoss.png')

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

        const enemieObjects1 = map.getObjectLayer('vamp').objects;
        this.vamps = this.physics.add.group({
            allowGravity: false
        }); 
        for (const vamp of enemieObjects1) {
        this.vamps.create(vamp.x, vamp.y, 'Vamp').setScale(0.4).setDepth(2);
        }

        const enemieObjects2 = map.getObjectLayer('rat').objects;
        this.rats = this.physics.add.group({
            allowGravity: true
        }); 
        for (const rat of enemieObjects2) {
        this.rats.create(rat.x, rat.y, 'Rat').setScale(0.4).setDepth(2);
        }
        Mur.setCollisionByExclusion(-1,true).setDepth(2);
        Plateforme_Tween.setCollisionByExclusion(-1,true).setDepth(2);
        Plateformes.setCollisionByExclusion(-1,true).setDepth(2);
        Porte.setCollisionByExclusion(-1,true).setDepth(2);
        MurChange.setCollisionByExclusion(-1,true).setDepth(2);
        SafeZone.setCollisionByExclusion(-1,true).setDepth(2);

        



        //Spritesheet de Laake's Remedy
        player = this.physics.add.sprite(100, 1660, 'TestPlayer').setScale(0.4).setDepth(2).setSize(200,200).setOffset(50,25);
        Boss = this.physics.add.sprite(14158,182,'Larare').setScale(0.4).setDepth(2).setOffset(50,25);

        locker = this.physics.add.sprite(1108, 1490, 'cle').setScale(0.4).setDepth(2);
        locker.body.setAllowGravity(false);

        this.add.image(170,90,'interface').setDepth(4).setScrollFactor(0);
        notChill = this.add.image(75,90,'warning').setDepth(4).setScrollFactor(0).setScale(0.5).setAlpha(0);
        chill = this.add.image(75,115,'chill').setDepth(4).setScrollFactor(0);

        this.add.image(0,0,'VilleDevant').setScrollFactor(0.5).setOrigin(0).setDepth(1);
        this.add.image(2880,0,'VilleDevant').setScrollFactor(0.5).setOrigin(0).setDepth(1);
        this.add.image(11390,0,'VilleDevant').setScrollFactor(0.5).setOrigin(0).setDepth(1);
        this.add.image(14100,0,'VilleDevant').setScrollFactor(0.5).setOrigin(0).setDepth(1);
        this.add.image(0,0,'VilleDerriere').setScrollFactor(0.3).setOrigin(0).setDepth(0).setScrollFactor(0.40);
        this.add.image(2880,0,'VilleDerriere').setScrollFactor(0.3).setOrigin(0).setDepth(0).setScrollFactor(0.40);
        this.add.image(11390,0,'VilleDerriere').setScrollFactor(0.3).setOrigin(0).setDepth(0).setScrollFactor(0.40);
        this.add.image(14100,0,'VilleDerriere').setScrollFactor(0.3).setOrigin(0).setDepth(0).setScrollFactor(0.40);

        atkBoss1 = this.add.image(12364,10,'AtckBoss').setDepth(5).setScale(0.3);
        atkBoss2 = this.add.image(13306,10,'AtckBoss').setDepth(5).setScale(0.3);
        atkBoss3 = this.add.image(13930,10,'AtckBoss').setDepth(5).setScale(0.3);


       
        potionVie = this.physics.add.sprite(290,90,'PotionVie').setDepth(5).setScrollFactor(0);
        potionVie.body.setAllowGravity(false);
        ingredients = this.physics.add.image(1871,139, 'PotionRemede').setSize(120,120).setDepth(1).setScale(0.25);
        ingredients.body.setAllowGravity(false);

        ingredients2= this.physics.add.image(7970,139, 'PotionRemede').setSize(120,120).setDepth(1).setScale(0.25);
        ingredients2.body.setAllowGravity(false);


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

        this.physics.add.collider(player,Mur);
        this.physics.add.collider(player,Plateforme_Tween);
        this.physics.add.collider(locker,Plateformes);
        this.physics.add.collider(player,Plateformes);
        this.physics.add.collider(player,Porte);
        this.physics.add.collider(Boss,Mur);
        this.physics.add.collider(Boss,Plateformes);
        this.physics.add.collider(this.loups,Mur);
        this.physics.add.collider(this.vamps,Mur);
        this.physics.add.collider(this.rats,Mur);
        this.physics.add.collider(player,atkBoss1,GetKilledBoss);
        this.physics.add.collider(player,atkBoss2,GetKilledBoss);
        this.physics.add.collider(player,atkBoss3,GetKilledBoss);




        zone_Boss1 = this.add.zone(12418,658).setSize(850,200);
        this.physics.world.enable(zone_Boss1);
        zone_Boss1.body.setAllowGravity(false);
        zone_Boss1.body.moves = false;

        zone_Boss2 = this.add.zone(13774,658).setSize(350,200);
        this.physics.world.enable(zone_Boss2);
        zone_Boss2.body.setAllowGravity(false);
        zone_Boss2.body.moves = false;

        zone_Boss3 = this.add.zone(12312,206).setSize(3897,200);
        this.physics.world.enable(zone_Boss3);
        zone_Boss3.body.setAllowGravity(false);
        zone_Boss3.body.moves = false;

        this.physics.add.overlap(player,this.loups,GetKilledLoup,null,this);
        this.physics.add.overlap(player,this.vamps,GetKilledVamp,null,this);
        this.physics.add.overlap(player,this.rats,GetKilledRat,null,this);
        this.physics.add.overlap(player,zone_Boss1,AttaqueBoss,null,this);
        this.physics.add.overlap(player,zone_Boss2,AttaqueBoss,null,this);
        this.physics.add.overlap(player,zone_Boss3,AttaqueBoss,null,this);
        this.physics.add.collider(player,locker,OuverturePorte);


        this.physics.add.overlap(ingredients,player,BoisTaPotion);
        this.physics.add.overlap(ingredients2,player,BoisTaPotion);

        if(speedrun == true){

            textTimer = this.add.text(122,98).setScrollFactor(0).setDepth(6);

            loopTimer = this.time.addEvent({delay : 1000, callback : onEvent,callbackScope : this,loop :true});

            function onEvent(){
                speedrunTimer += 1;
            }

        }


        

        function OuverturePorte(){
            cle = cle+1
            console.log('ouvert!')
            locker.destroy();
            if (cle ==1){
                Porte.setAlpha(0);
                Porte.setCollisionByExclusion(0,true);
            }
            
        }



        this.anims.create({
            key:'Move',
            frames:this.anims.generateFrameNumbers('TestPlayer',{start : 0, end : 14}),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key:'Mort',
            frames:this.anims.generateFrameNumbers('Death',{start : 0, end : 24}),
            frameRate: 30,
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
            key:'Rat',
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
            key:'Boss',
            frames:this.anims.generateFrameNumbers('Larare',{start : 0, end : 3}),
            frameRate: 20,
            repeat: 1
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

        
        

        
        //vamp_tweens= this.tweens.add({
        //    targets: vampire,
        //    x: 1802,
        //    duration: 2000,
        //    ease: 'Sine.easeInOut',
        //    repeat: -1,
        //    yoyo: true
        //});

        rat_tweens = this.tweens.add({
            targets: rat,
            y: 169,
            duration: 600,
            ease: 'Sine.easeInOut',
            repeat: 0,
            yoyo: false
        });

       

    }
    update(){
        //vampire.anims.play('Vamp',true);
            
        if (invincible == true){
            player.setTint(0x589ac6 );
        }
        else{
            player.setTint(0xFFFFFF)
        }

        if (speedrun == true){
            textTimer.setText('Timer: '+ speedrunMinute + ':' + speedrunTimer);
        }
        if (speedrunTimer === 60){
            speedrunTimer = 0;
            speedrunMinute +=1;
        }


       

        //if (loup.x > 2352 && loup.x < 2497){
        //    loup.setFlipX(true); 
        //}
        //    
        //else if(loup.x > 2890 && loup.x < 2920){
        //    loup.setFlipX(false);
        //}

        //if (zone_vampire.body.touching.none && laakeHp>= 2){
        //           vampire_aggro = false;
        //           vamp_tweens.play();
        //           vampire.x = 1410;
        //           vampire.y = 1390;
//
        //       }
        //
        //zone_vampire.body.debugBodyColor = zone_vampire.body.touching.none ? 0x00ffff : 0xffff00;

        /*if (zone_rat.body.touching.none && laakeHp>= 2){
            rat_aggro = false;
            rat.x = 2510;
            rat.y = 269;
            rat_tweens.pause();
            
        }
        zone_rat.body.debugBodyColor = zone_rat.body.touching.none ? 0x00ffff : 0xffff00;*/
      
        if (keys.left.isDown)
            {
                player.setVelocityX(-260);
                player.anims.play('Move',true);
                player.setFlipX(true);
            

            }
            else if (keys.right.isDown){
                player.setVelocityX(260);
                player.anims.play('Move',true);
                //rat.anims.play('Rat',true); 
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
            
            if (gameOver== true){
                speedrunMinute = 0;
                speedrunTimer = 0;
                player.anims.play("Mort",true);
                setTimeout(function(){
                    restart = true; 
                    console.log('Restart'+ restart);}, 1000);
                    if (restart ==true){
                        gameOver = false;
                        this.scene.restart();
                        restart = false;
                    }
                    
            }

            if (warning == true){
                chill.setAlpha(0);
                notChill.setAlpha(1);
            }
            else{
                chill.setAlpha(1);
                notChill.setAlpha(0);
            }
            

            //tropfort();

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
                    warning = true;

    
                }
                if( loup.direction ==='gauche' && loup.x - player.x < 481 && loup.x - player.x > 0 && loup.y - player.y < 64 && loup.y - player.y > -64 ){
                    FaimLoup = true;
                    warning = true;

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
        for (const vamp of this.vamps.children.entries) {
            if (FaimVamp == false){ 

                if (vamp.body.blocked.right) {
                    vamp.direction = 'gauche';
                    vamp.flipX= false;
                }
                if (vamp.body.blocked.left) {
                    vamp.direction = 'droite';
                    vamp.flipX= true;
                }

                else if (vamp.direction === 'gauche'){
                    vamp.setVelocityX(-200);
                    vamp.anims.play('Vamp', true);

                }
                else{
                    vamp.setVelocityX(200);
                    vamp.anims.play('Vamp', true);

                }


                if( vamp.direction ==='droite' && player.x - vamp.x <481 && player.x - vamp.x > 0 && vamp.y - player.y < 64 && vamp.y - player.y > -64){
                    FaimVamp = true;
                    warning = true;



                }
                if( vamp.direction ==='gauche' && vamp.x - player.x < 481 && vamp.x - player.x > 0 && vamp.y - player.y < 64 && vamp.y - player.y > -64 ){
                    FaimVamp = true;
                    warning = true;

                }
            }
            if (FaimVamp === true){
                if (player.x - vamp.x <481 && player.x - vamp.x > 32 && vamp.y - player.y < 321 && vamp.y - player.y > -64){
                    vamp.setVelocityX(350);
                    vamp.flipX= false;
                    vamp.anims.play('Vamp', true);
                }
                else if (vamp.x - vamp.x < 481 && vamp.x - player.x > 32 && vamp.y - player.y < 321 && vamp.y - player.y > -64 ){
                    vamp.setVelocityX(-350);
                    vamp.flipX= true;
                    vamp.anims.play('Vamp', true);
                }


            }
            else{
                FaimVamp= false;
                }

    }
    for (const rat of this.rats.children.entries) {
        if (FaimRat == false){ 

            if (rat.body.blocked.right) {
                rat.direction = 'gauche';
                rat.flipX= false;
            }
            if (rat.body.blocked.left) {
                rat.direction = 'droite';
                rat.flipX= true;
            }

            else if (rat.direction === 'gauche'){
                rat.setVelocityY(-200);
                rat.anims.play('Rat', true);

            }
            else{
                rat.setVelocityY(-200);
                rat.anims.play('Rat', true);

            }


            if( rat.direction ==='droite' && player.x - rat.x <481 && player.x - rat.x > 0 && rat.y - player.y < 64 && rat.y - player.y > -64){
                FaimRat = true;
                warning = true;


            }
            if( rat.direction ==='gauche' && rat.x - player.x < 481 && rat.x - player.x > 0 && rat.y - player.y < 64 && rat.y - player.y > -64 ){
                FaimRat = true;
                warning = true;

            }
        }
        if (FaimRat === true){
            if (player.x - rat.x <481 && player.x - rat.x > 32 && rat.y - player.y < 321 && rat.y - player.y > -64){
                rat.setVelocityY(350);
                rat.flipX= false;
                rat.anims.play('Rat', true);
            }
            else if (rat.x - rat.x < 481 && rat.x - player.x > 32 && rat.y - player.y < 321 && rat.y - player.y > -64 ){
                rat.setVelocityX(350);
                rat.flipX= true;
                rat.anims.play('Rat', true);
            }


        }
        else{
            FaimRat= false;
            }

    }
               
        }
    }



           


        


    function GetKilledLoup(player,loup){ 
            //invincible = false;  
           
            console.log('oui ca marche')
            //if (invincible == true){
            //    setTimeout(function(){invincible = false; console.log('invicible'+ invincible);}, 1000);
            //    }         
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
                                gameOver = true;
                                console.log('noob');
                                //this.scene.restart();
                            }
                       if(invincible == false){
                           setTimeout(function(){invincible = false; console.log('invicible'+ invincible);}, 2000);
                           invincible = true ;
                           laakeHp = laakeHp -1; 

                           //viePleine3.setDepth(0);
                           //vieVide3.setDepth(5)
                           
                            
                            
                            
                            
                        }
                        if (loup.body.touching.up && player.body.touching.down){
                            laakeHp = laakeHp + 1;
                            loup.setVisible(false);
                            loup.setVelocityX(0); 
                            //loup.body.disableBody(true,true);
                            loup.destroy();
                            statut_Ennemi = false; 
                            if (statut_Ennemi == true){
                                ennemy_aggro = true;
                                this.physics.moveToObject(loup, player, 200);
                                
                               
                                //zone_Loup.body.debugBodyColor = zone_Loup.body.touching.none ? 0x00ffff : 0xffff00;
                            }
                        }
        }

        function GetKilledVamp(player,vamp){ 
            //invincible = false;  
           
            console.log('oui ca marche')
            //if (invincible == true){
            //    setTimeout(function(){invincible = false; console.log('invicible'+ invincible);}, 1000);
            //    }         
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
                                gameOver = true;
                                console.log('noob');
                                //this.scene.restart();
                            }
                       if(invincible == false){
                           setTimeout(function(){invincible = false; console.log('invicible'+ invincible);}, 2000);
                           invincible = true ;
                           laakeHp = laakeHp -1; 

                           //viePleine3.setDepth(0);
                           //vieVide3.setDepth(5)
                           
                            
                            
                            
                            
                        }
                        if (vamp.body.touching.up && player.body.touching.down){
                            laakeHp = laakeHp + 1;
                            vamp.setVisible(false);
                            vamp.setVelocityX(0); 
                            //loup.body.disableBody(true,true);
                            vamp.destroy();
                            statut_Ennemi = false; 
                            if (statut_Ennemi == true){
                                ennemy_aggro = true;
                                this.physics.moveToObject(vamp, player, 200);
                                
                               
                                //zone_Loup.body.debugBodyColor = zone_Loup.body.touching.none ? 0x00ffff : 0xffff00;
                            }
                        }
        }

        function GetKilledRat(player,rat){ 
            //invincible = false;  
           
            console.log('oui ca marche')
            //if (invincible == true){
            //    setTimeout(function(){invincible = false; console.log('invicible'+ invincible);}, 1000);
            //    }         
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
                                gameOver= true;
                                console.log('noob');
                                //this.scene.restart();
                            }
                       if(invincible == false){
                           setTimeout(function(){invincible = false; console.log('invicible'+ invincible);}, 2000);
                           invincible = true ;
                           laakeHp = laakeHp -1; 

                           //viePleine3.setDepth(0);
                           //vieVide3.setDepth(5)
                           
                            
                            
                            
                            
                        }
                        if (rat.body.touching.down && player.body.touching.up){
                            laakeHp = laakeHp + 1;
                            rat.setVisible(false);
                            rat.setVelocityX(0); 
                            //loup.body.disableBody(true,true);
                            rat.destroy();
                            statut_Ennemi = false; 
                            if (statut_Ennemi == true){
                                ennemy_aggro = true;
                                this.physics.moveToObject(rat, player, 200);
                                
                               
                                //zone_Loup.body.debugBodyColor = zone_Loup.body.touching.none ? 0x00ffff : 0xffff00;
                            }
                        }

                        if (bossattaque == true){
                            atkBoss1.body.setVelocityY(400);
                            atkBoss2.body.setVelocityY(400);
                            atkBoss3.body.setVelocityY(400);
                        }
        }

        function GetKilledBoss(player,loup){ 
            //invincible = false;  
           
            console.log('oui ca marche')
            //if (invincible == true){
            //    setTimeout(function(){invincible = false; console.log('invicible'+ invincible);}, 1000);
            //    }         
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
                                gameOver = true;
                                console.log('noob');
                                //this.scene.restart();
                            }
                       if(invincible == false){
                           setTimeout(function(){invincible = false; console.log('invicible'+ invincible);}, 2000);
                           invincible = true ;
                           laakeHp = laakeHp -1; 

                           //viePleine3.setDepth(0);
                           //vieVide3.setDepth(5)
                           
                            
                            
                            
                            
                        }
                        if (loup.body.touching.up && player.body.touching.down){
                            laakeHp = laakeHp + 1;
                            loup.setVisible(false);
                            loup.setVelocityX(0); 
                            //loup.body.disableBody(true,true);
                            loup.destroy();
                            statut_Ennemi = false; 
                            if (statut_Ennemi == true){
                                ennemy_aggro = true;
                                this.physics.moveToObject(loup, player, 200);
                                
                               
                                //zone_Loup.body.debugBodyColor = zone_Loup.body.touching.none ? 0x00ffff : 0xffff00;
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

    function AttaqueBoss ()
      {
          bossattaque = true;
          zone_Boss1.body.debugBodyColor = zone_Boss1.body.touching.none ? 0x00ffff : 0xffff00;
          zone_Boss2.body.debugBodyColor = zone_Boss2.body.touching.none ? 0x00ffff : 0xffff00;
          zone_Boss3.body.debugBodyColor = zone_Boss3.body.touching.none ? 0x00ffff : 0xffff00;
      }

        //function VampRush ()
        //{
        //    Vamp_aggro = true;
        //    this.physics.moveToObject(vampire, player, 320);
        //    zone_vampire.body.debugBodyColor = zone_vampire.body.touching.none ? 0x00ffff : 0xffff00;
        //    vamp_tweens.pause();
//
        //    
        //}
//
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
            if (remede == 2){
                Brouillard.setAlpha(0);
                brouillard2.setAlpha(0);
                brouillard3.setDepth(2);
                ingredients2.disableBody(true,true);
                ingredients2.destroy();
            }

        }

