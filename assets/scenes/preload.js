import{SHAPES} from "../../utils.js";
const{TRIANGLE, SQUARE,BOMBB, DIAMOND}=SHAPES;
export default class preload extends Phaser.Scene {
    constructor () {
        super("preload");
    
}




preload () {
    this.load.image("sky", "./assets/images/sky.png");
    this.load.image("ground", "./assets/images/platform.png");
    this.load.image("ninja", "./assets/images/ninja.png");
    this.load.image(SQUARE, "./assets/images/square.png");
    this.load.image(DIAMOND, "./assets/images/diamond.png");
    this.load.image(TRIANGLE, "./assets/images/triangle.png");
    this.load.image("gameover", "./assets/images/gameover.png");
    this.load.image(BOMBB, "./assets/images/bombb.png");

}

create (){
    this.scene.start("Game");
}
}