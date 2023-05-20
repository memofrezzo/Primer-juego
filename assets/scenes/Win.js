export default class Win extends Phaser.Scene {
    constructor() {
    console.log("Constructor win")
      super("Win");
    }
    create (){
        this.add.image(400, 200,"win").setScale(1).setInteractive()
        .on('pointerdown', ()=> this.scene.start('Game'));
        this.winMusic = this.sound.add("winMusic");
        this.winMusic.play();
        this.add.image(400, 450,"playAgain").setScale(1)
        .setInteractive()
        .on('pointerdown', ()=> this.scene.start('Game'));
    }
}