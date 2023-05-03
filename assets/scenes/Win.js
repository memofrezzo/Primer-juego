export default class Win extends Phaser.Scene {
    constructor() {
    console.log("Constructor win")
      super("Win");
    }
    create (){
        this.add.image(650, 400,"win").setScale(0.25)
        .setInteractive()
        .on('pointerdown', ()=> this.scene.start('Game'));;
    }
}