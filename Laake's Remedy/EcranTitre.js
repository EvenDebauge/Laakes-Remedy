var boutonJouer;
var boutonOption;
var boutonModes;
var boutonRetour;
var boutonNormal;
var boutonSpeedrun;
var speedRunMode = false;
var jouer = false;
var option = false;
var mode = false;
var retour = false;
var normal = false;
var speedrun = false;
var musique;
var fond;
var tuto;
var modes;
var chrono;


class EcranTitre extends Phaser.Scene {
    constructor(){
         super("EcranTitre");
         //this.pad.null;
    }
       
        
    
    init(data){
    }
    preload ()
    {
        this.load.image('Fond', 'assets/Ecrantitre.png');
        this.load.image('Tuto','assets/PanneauTuto.png');
        this.load.audio('Fond_Sonore', 'assets/accords.mp3');
        this.load.image('Panneaumodes','assets/PanneauMode.png');

        this.load.spritesheet('option', 'assets/Bouton_OptionSpritesheet.png', { frameWidth: 236, frameHeight: 88 });
        this.load.spritesheet('mode', 'assets/Bouton_ModeSpritesheet.png', { frameWidth: 236, frameHeight: 88 });
        this.load.spritesheet('jouer', 'assets/Bouton_JouerSpritesheet.png', { frameWidth: 236, frameHeight: 88 });
        this.load.spritesheet('retour', 'assets/BoutonRetourSpritesheet.png', { frameWidth:236, frameHeight: 88 });
        this.load.spritesheet('normal', 'assets/Bouton_NormalSpritesheet.png', { frameWidth:236, frameHeight: 88 });
        this.load.spritesheet('speedrun', 'assets/Bouton_SpeedrunSpritesheet.png', { frameWidth:236, frameHeight: 88 });




    }

    create ()
    {
        this.musique = this.sound.add("Fond_Sonore");
        
        var musicConfig = {
            mute : false,
            volume : 0.2,
            rate : 1.2,
            deturne : 0,
            seek : 0,
            loop : true,
            delay : 0,

        }

        this.musique.play(musicConfig)
        fond = this.add.image(448, 224, 'Fond');
        tuto = this.add.image(448, 224, 'Tuto');
        modes = this.add.image(448,245,'Panneaumodes');
        

        boutonJouer = this.add.sprite(746,55, 'jouer').setInteractive({ cursor: 'pointer' });
        boutonModes = this.add.sprite(746,125, 'mode').setInteractive({ cursor: 'pointer' });
        boutonOption= this.add.sprite(746,190, 'option').setInteractive({ cursor: 'pointer' });
        boutonRetour = this.add.sprite(746,55, 'retour').setInteractive({ cursor: 'pointer' });
        boutonNormal = this.add.sprite(300,155, 'normal').setInteractive({ cursor: 'pointer' });
        boutonSpeedrun= this.add.sprite(550,155, 'speedrun').setInteractive({ cursor: 'pointer' });


        /////////////////////bouton jouer////////////////////
const anims = this.anims;
    anims.create({
        ///////////////jouer/////////////////
        key: 'jouerSimple',
        frames: this.anims.generateFrameNumbers('jouer', { start: 0, end: 0 }),
        frameRate: 5,
      });
    anims.create({
        key: 'jouerDessus',
        frames: this.anims.generateFrameNumbers('jouer', { start: 1, end: 1 }),
        frameRate: 5,
      });

    anims.create({
        key: 'optionSimple',
        frames: this.anims.generateFrameNumbers('option', { start: 0, end: 0 }),
        frameRate: 5,
      });
    anims.create({
        key: 'optionDessus',
        frames: this.anims.generateFrameNumbers('option', { start: 1, end: 1 }),
        frameRate: 5,
      });

    anims.create({
        key: 'modeSimple',
        frames: this.anims.generateFrameNumbers('mode', { start: 0, end: 0 }),
        frameRate: 5,
      });
    anims.create({
        key: 'modeDessus',
        frames: this.anims.generateFrameNumbers('mode', { start: 1, end: 1 }),
        frameRate: 5,
      });

    anims.create({
        key: 'retourSimple',
        frames: this.anims.generateFrameNumbers('retour', { start: 0, end: 0 }),
        frameRate: 5,
      });
    anims.create({
        key: 'retourDessus',
        frames: this.anims.generateFrameNumbers('retour', { start: 1, end: 1 }),
        frameRate: 5,
      });

    anims.create({
        key: 'normalSimple',
        frames: this.anims.generateFrameNumbers('normal', { start: 0, end: 0 }),
        frameRate: 5,
      });
    anims.create({
        key: 'normalDessus',
        frames: this.anims.generateFrameNumbers('normal', { start: 1, end: 1 }),
        frameRate: 5,
      });

    anims.create({
        key: 'speedRunSimple',
        frames: this.anims.generateFrameNumbers('speedrun', { start: 0, end: 0 }),
        frameRate: 5,
      });
    anims.create({
        key: 'speedRunDessus',
        frames: this.anims.generateFrameNumbers('speedrun', { start: 1, end: 1 }),
        frameRate: 5,
      });


}
update (){
    ///////////////////////////////////bouton Jouer//////////////////////////////////////////

    boutonJouer.on('pointerover', function (event) {
        boutonJouer.anims.play('jouerDessus',true);
    });

    boutonJouer.on('pointerout', function (event) {
      boutonJouer.anims.play('jouerSimple',true);
    });

    boutonJouer.on('pointerdown', function (pointer) {
        jouer = true;
    });
    if(jouer == true){
        jouer = false;
        this.scene.start("SceneOne");
    }

        

    ///////////////////////////////////bouton Retour//////////////////////////////////////////

    boutonRetour.on('pointerover', function (event) {
        boutonRetour.anims.play('retourDessus',true);
    });

    boutonRetour.on('pointerout', function (event) {
      boutonRetour.anims.play('retourSimple',true);
    });

    boutonRetour.on('pointerdown', function (pointer) {
        retour = true;
    });
    if(retour == true){
        retour = false;
        option = false;
        mode = false;
    }
    if (retour == false){
        boutonRetour.setAlpha(0);
        boutonRetour.setDepth(5);
    }

///////////////////////////////////bouton Mode//////////////////////////////////////////

    boutonModes.on('pointerover', function (event) {
        boutonModes.anims.play('modeDessus',true);
    });

    boutonModes.on('pointerout', function (event) {
      boutonModes.anims.play('modeSimple',true);
    });

    boutonModes.on('pointerdown', function (pointer) {
        mode = true;
    });
    if(mode == true){
        //mode = false;
        boutonRetour.setAlpha(1);
        boutonNormal.setAlpha(1).setAlpha(4);
        boutonSpeedrun.setAlpha(1).setAlpha(4);
        modes.setAlpha(1).setDepth(3);
        
    }
    if (mode == false){        
        boutonSpeedrun.setAlpha(0);        
        boutonNormal.setAlpha(0);
        modes.setAlpha(0).setDepth(0);
    }

    ///////////////////////////////////bouton Option///////////////////////


    boutonOption.on('pointerover', function (event) {
        boutonOption.anims.play('optionDessus',true);
    });

    boutonOption.on('pointerout', function (event) {
      boutonOption.anims.play('optionSimple',true);
    });

    boutonOption.on('pointerdown', function (pointer) {
        option = true;
    });
    if(option == true){
        //option = false;
        boutonRetour.setAlpha(1);
        tuto.setAlpha(1).setDepth(3);
    }
    if (option == false){
        tuto.setAlpha(0).setDepth(0);
    }

    ///////////////////////////////////bouton Normal///////////////////////

    boutonNormal.on('pointerover', function (event) {
        boutonNormal.anims.play('normalDessus',true);
    });

    boutonNormal.on('pointerout', function (event) {
      boutonNormal.anims.play('normalSimple',true);
    });

    boutonNormal.on('pointerdown', function (pointer) {
        normal = true;
    });
    if(normal == true){
        normal = false;
        speedRunMode = false;
        this.scene.start('SceneOne');
    }
    if (normal == false){

        boutonNormal.setDepth(5);
    }

///////////////////////////////////bouton SpeedRun///////////////////////


    boutonSpeedrun.on('pointerover', function (event) {
        boutonSpeedrun.anims.play('speedRunDessus',true);
    });

    boutonSpeedrun.on('pointerout', function (event) {
      boutonSpeedrun.anims.play('speedRunSimple',true);
    });

    boutonSpeedrun.on('pointerdown', function (pointer) {
        speedrun = true;
    });
    if(speedrun == true){
        normal = false;
        speedRunMode = true;
        this.scene.start('SceneOne');
    }
    if (speedrun == false){

        boutonSpeedrun.setDepth(5);
    }




    }
}
    