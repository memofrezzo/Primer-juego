export default class GameOver extends Phaser.Scene {
    constructor() {
      super("GameOver");
    }
    create (){
        this.add.image(650, 400,"meme").setScale(0.25);
    }
}