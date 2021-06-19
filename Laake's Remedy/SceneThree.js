var remedeScene3 = 1;
var changementZones = false;
var ingredients2Scene3;
var loupScene3;
var vampireScene3;
var ratScene3;
var zone_LoupScene3;
var zone_vampireScene3;
var zone_ratScene3;

class SceneThree extends Phaser.Scene {
    constructor(){
         super("SceneThree");
    }
       
        //this.pad.null;
    
    init(data){
    }
    preload(){ 
        //Tiles
        this.load.image('tiles','assets/TilesSet_Plateforme3.png');
        this.load.tilemapTiledJSON("SceneTrois", "SceneTrois.json");

    
        //Décors
        this.load.image('VilleDevant','assets/VilleSceneUn.png');
        this.load.image('VilleDerriere','assets/DecorFond.png');


    }
    create(){

    
        //Restart des variables

        laakeHp = 5;
        vision = true;


        player = this.physics.add.sprite(51, 1613, 'TestPlayer').setScale(0.4).setDepth(2).setSize(200,200).setOffset(50,25);

        const map = this.make.tilemap({key:'SceneTrois'});

        const tileset = map.addTilesetImage('TilesSet_Plateforme3', 'tiles');

        const SceneTrois_MurChange = map.createStaticLayer('SceneTrois_Mur De Fin', tileset, 0, 0);
        const SceneTrois_Mur = map.createStaticLayer('SceneTrois_Delimitation', tileset, 0, 0);
        const SceneTrois_Plateformes = map.createStaticLayer('SceneTrois_Plateformes', tileset, 0, 0);
        const SceneTrois_PlateformeTween = map.createStaticLayer('SceneTrois_PlateformeTween', tileset, 0, 0);

        SceneTrois_Mur.setCollisionByExclusion(-1,true).setDepth(2);
        SceneTrois_Plateformes.setCollisionByExclusion(-1,true).setDepth(2);
        SceneTrois_PlateformeTween.setCollisionByExclusion(-1,true).setDepth(2);
        SceneTrois_MurChange.setCollisionByExclusion(-1,true).setDepth(2);

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //Spritesheet ennemie
        loupScene3 = this.physics.add.sprite(300, 350, 'Loup').setScale(0.4).setDepth(2);
        vampireScene3 = this.physics.add.sprite(1200,100,'Vamp').setDepth(2);
        ratScene3 = this.physics.add.sprite(100,330,'Rat').setDepth(2);

        this.add.image(0,0,'VilleDevant').setScrollFactor(0.5).setOrigin(0).setDepth(1);
        this.add.image(0,0,'VilleDerriere').setScrollFactor(0.25).setOrigin(0).setDepth(0).setScrollFactor(0.40);

        ingredients2Scene3 = this.physics.add.image(2203,207, 'PotionRemede').setSize(120,120).setDepth(1).setScale(0.25);
        ingredients2Scene3.body.setAllowGravity(false);


        viePleine1 = this.physics.add.staticGroup();
        viePleine2 = this.physics.add.staticGroup();
        viePleine3 = this.physics.add.staticGroup();
        viePleine4 = this.physics.add.staticGroup();
        viePleine5 = this.physics.add.staticGroup();

        potionVie = this.physics.add.sprite(20,40,'PotionVie').setDepth(5).setScrollFactor(0);
        potionVie.body.setAllowGravity(false);
        //ingredients2Scene3 = this.physics.add.image(300,420, 'Potiontest').setDepth(1);
        //ingredients2Scene3.body.setAllowGravity(false);

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //Délimitation des limites du mondes 
        this.physics.world.setBounds(0,0,4880,1824);
        this.cameras.main.startFollow(player,true,0.05,0.05);
        this.cameras.main.setBounds(0, 0,4880,1824);

        
        player.setCollideWorldBounds(true);
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //Création du Brouillard
        this.Fog= this.physics.add.staticGroup();
        //Brouillard = this.Fog.create(0,0,'Brouillard').setDepth(3);
        brouillard2 = this.Fog.create(0,0,'BrouillardGood2').setDepth(3);
        brouillard3 = this.Fog.create(0,0,'BrouillardGood3').setDepth(3);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //Zone Aggro Loup1
        zone_LoupScene3 = this.add.zone(300, 300).setSize(850, 100);
        this.physics.world.enable(zone_LoupScene3);
        zone_LoupScene3.body.setAllowGravity(false);
        zone_LoupScene3.body.moves = false;
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //Zone Aggro Vamp1
        vampire.body.setAllowGravity(false);
        zone_vampire = this.add.zone(300,300).setSize(850,200);
        this.physics.world.enable(zone_vampire);
        zone_vampire.body.setAllowGravity(false);
        zone_vampire.body.moves = false;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //Zone Aggro Rat1
        rat.body.setAllowGravity(false);
        zone_rat = this.add.zone(300,300).setSize(850,200);
        this.physics.world.enable(zone_rat);
        zone_rat.body.setAllowGravity(false);
        zone_rat.body.moves = false;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //Collider 

        this.physics.add.collider(player,SceneTrois_Mur);
        this.physics.add.collider(player,SceneTrois_Plateformes);
        this.physics.add.collider(player,SceneTrois_PlateformeTween);
        this.physics.add.collider(player,SceneTrois_MurChange,changementZoneScene4);
        
        this.physics.add.collider(player,loup,AttaqueEnnemi,null,this);
        this.physics.add.collider(player,loup,GetKilled,null,this);
        this.physics.add.collider(player,rat,AttaqueRat,null,this);
        this.physics.add.collider(player,rat,GetKilled,null,this);
        this.physics.add.collider(player,vampire,AttaqueVamp,null,this);
        this.physics.add.collider(player,vampire,GetKilled,null,this);
        this.physics.add.collider(vampire,plateformeTest);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //Overlaps
        this.physics.add.overlap(player,zone_Loup,LoupRush,null,this);
        this.physics.add.overlap(player,zone_vampire,VampRush,null,this);
        this.physics.add.overlap(player,zone_rat,RatRush,null,this);

        this.physics.add.overlap(player,ingredients2Scene3,BoisTonRemede,null,this);


        function AttaqueEnnemi(player, loup){ 
            if (loup.body.touching.up && player.body.touching.down){
                loup.setVisible(false);
                loup.setVelocityX(0);
                statut_Ennemi = false; 
                //ennemi.body.immovable;
                if (statut_Ennemi == true){
                    ennemy_aggro = true;
                    this.physics.moveToObject(loup, player, 200);
                    zone_Loup.body.debugBodyColor = zone_Loup.body.touching.none ? 0x00ffff : 0xffff00;
                }
                if(statut_Ennemi == false)
                {
                    tweens_ennemy.stop();
                    ennemy_aggro = false;
                    loup.setVelocityX(0);
                    console.log('ennemi a pu');
                    

                }
                               
            }
        }
        function AttaqueVamp(player, vampire){ 
            if (vampire.body.touching.up && player.body.touching.down){
                vampire.destroy();
            }
        }

        function AttaqueRat(player, rat){ 
            if (rat.body.touching.down && player.body.touching.down){
                rat.destroy();
            }
        }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

    tweens_ennemy = this.tweens.add({
        targets: loup,
        x: 700,
        duration: 2000,
        ease: 'Sine.easeInOut',
        repeat: -1,
        yoyo: true
    });
    

    
    vamp_tweens= this.tweens.add({
        targets: vampire,
        x: 400,
        duration: 2000,
        ease: 'Sine.easeInOut',
        repeat: -1,
        yoyo: true
    });

    rat_tweens = this.tweens.add({
        targets: rat,
        y: -100,
        duration: 600,
        ease: 'Sine.easeInOut',
        repeat: 0,
        yoyo: false
    });



    }
    update(){
        if (zone_Loup.body.touching.none){
            ennemy_aggro = false;
            tweens_ennemy.play();
        }
        zone_Loup.body.debugBodyColor = zone_Loup.body.touching.none ? 0x00ffff : 0xffff00;

        if (zone_vampire.body.touching.none){
            vampire_aggro = false;
            vamp_tweens.play();
            vampire.x = 1200;
            vampire.y = 100;
            //vampire.movesTo(1200,100);
            
        }
        zone_vampire.body.debugBodyColor = zone_vampire.body.touching.none ? 0x00ffff : 0xffff00;
        if (zone_rat.body.touching.none){
            rat_aggro = false;
            rat.x = 450;
            rat.y = 370;
            rat_tweens.pause();
            //vampire.movesTo(1200,100);
            
        }
        zone_rat.body.debugBodyColor = zone_rat.body.touching.none ? 0x00ffff : 0xffff00;
      
        //vampire.moves(1200,100);
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
            
            if (changementZones == true){
            //changementZones = false;
            this.scene.start("SceneFour");
            console.log("changement");
            changementZones = false;
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
            this.physics.moveToObject(loup, player, 200);
            zone_Loup.body.debugBodyColor = zone_Loup.body.touching.none ? 0x00ffff : 0xffff00;
            tweens_ennemy.pause();
        }
    
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
    
        function BoisTonRemede()
        {
            remedeScene3 = remedeScene3 +1;
            if (remedeScene3 == 2){
                Brouillard.setAlpha(0);
                brouillard2.setAlpha(0);
                brouillard3.setDepth(2);
                ingredients2Scene3.disableBody(true,true);
                ingredients2Scene3.destroy();
                
                console.log('potion2');
                
                //console.log('potion2');
                console.log('TAMERE');
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
                     setTimeout(function(){player.anims.play('Death',true)}, 0);
                     gameOver = true;
                     console.log('noob');
                     setTimeOut(function(){this.scene.restart()},200000000);
                    //player.staticGroup();
                 }
}
    
        function changementZoneScene4 ()
        {
            changementZones = true;
            console.log('OUI')
        }

