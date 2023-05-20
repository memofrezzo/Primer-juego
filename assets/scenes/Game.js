import{SHAPES, POINTS_PERCENTAGE_VALUE_START, POINTS_PERCENTAGE} from "../../utils.js";

const{TRIANGLE, SQUARE, DIAMOND, ENEMIE}=SHAPES;
export default class Game extends Phaser.Scene {
  score;
  constructor() {
    super("Game");
  }
gameOver;

timer;
  init() {
    this.gameOver =false
    this.Win = false;
    this.shapesRecolected ={
      [TRIANGLE]: {count:0, score:10},
      [SQUARE]: {count:0, score:20},
      [DIAMOND]: {count:0, score:15},
      [ENEMIE]: {count:0, score:-20}
    }
    console.log(this.shapesRecolected)
  }
  
  create() {
    // add background
    this.add.image(400, 300, "sky").setScale(0.555);
    this.musica = this.sound.add("musica");
    this.musica.loop=true;
    this.musica.play();
    this.musica.setSeek(2);
    this.lostMusic = this.sound.add("lostMusic");
    this.lostMusic.stop();
    this.lostMusic.loop = false;
    this.countText=this.add.text(16,9,"T:0 // C : 0 // R:0",{
      fontSize: "20px",
      fill:"#000000",
      backgroundColor: "#ffffff",
      fontFamily:"Georgia",
      fontWeight:"bold",

    });
    //
    let platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, "platform").setScale(2).refreshBody();
    platforms.create(400, 200, "platform").setScale(0.5).refreshBody();
    platforms.create(300, 300, "platform").setScale(0.3).refreshBody();
    platforms.create(300, 400, "platform").setScale(1).refreshBody();

    // add sprite player
    this.player = this.physics.add.sprite(100, 450, "ninja");
    this.player.setCollideWorldBounds(true);
    // add shapes  group
    this.shapesGroup = this.physics.add.group();
    this.addShape();
    // add shape to screen
    //create event to add shapes
    this.time.addEvent({
      delay: 1000,
      callback: this.addShape,
      callbackScope: this,
      loop: true,
    });

    this.time.addEvent({
      delay: 1000,
      callback: this.onSecond,
      callbackScope: this,
      loop: true,
    });
    // create cursor
    this.cursors= this.input.keyboard.createCursorKeys();
    //add collierd between player and plataform
    this.physics.add.collider(this.player, platforms);
    this.physics.add.collider(this.player, this.shapesGroup);
    this.physics.add.collider(platforms, this.shapesGroup);
  // add overlap between player and shapes
  
this.physics.add.overlap(
  this.player,
  this.shapesGroup,
  this.collectShape,//funcion que llama cuando el player toca el shape
  null,//dejar fijo por ahora
  this//dejar fijo por ahora
);
this.physics.add.overlap(
  this.shapesGroup,
  platforms,
  this.reduce,
  null,
  this
);
// add scene o screen
this.score = 0;
this.scoreText = this.add.text(20 , 20, "Score: " + this.score, {
  fontSize: "35px",
  fontStyle: "bold",
  fill: "#FFFFFF",
});
// add timer
this.timer =30;
this.timerText = this.add.text(750,20, this.timer, {
  fontSize: "32px",
  fontSize: "bold",
  fill: "#FFFFFF",
})

  }


  update() {
    if (this.gameOver){
      this.scene.start("GameOver")
      this.musica.stop()
      this.lostMusic.play()
    }
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-250); 
    } else  {
      if (this.cursors.right.isDown) {
      this.player.setVelocityX(250);
    } else{ 
      this.player.setVelocityX(0);
    }
  }
  const JUMP_VELOCITY = -500;

if (this.cursors.up.isDown && this.player.body.touching.down) {
  this.player.setVelocityY(JUMP_VELOCITY);
}
    if (this.cursors.up.isDown && this.player.body.touching.down){
      this.player.setVelocityY(-500)
    }
    if (this.score>=100) {
      this.scene.start("Win");
      this.musica.stop()
    }
    if (
      this.shapesRecolected[TRIANGLE].count>=2 &&
      this.shapesRecolected[SQUARE].count>=2 &&
      this.shapesRecolected[DIAMOND].count>=2
    ) {
      this.scene.start("Win"); 
      this.musica.stop()
    }
    this.countText.setText(
      "T: "+ 
      this.shapesRecolected[TRIANGLE].count +
      "// C: "+
      this.shapesRecolected[SQUARE].count +
      "// R: "+
      this.shapesRecolected[DIAMOND].count
    );
    }

 addShape (){
  // get random shape
  const randomShape = Phaser.Math.RND.pick ([DIAMOND, SQUARE,TRIANGLE, ENEMIE]);
  //get  random position  x
  const randomX = Phaser.Math.RND.between(20,780);
  // get random  to  screen
  this.shapesGroup.create(randomX, 0, randomShape).setCircle(25, 7, 7).setBounce(0.75, 0.75).setData(POINTS_PERCENTAGE, POINTS_PERCENTAGE_VALUE_START);
  console.log("shape is added", randomX, randomShape);
  }
  collectShape(player, shape){
    shape.disableBody(true, true);
    const shapeName = shape.texture.key;
    const percentage = shape.getData(POINTS_PERCENTAGE);
    const scoreNow = this.shapesRecolected[shapeName].score * percentage;
    this.shapesRecolected[shapeName].count++;
    this.score += this.shapesRecolected[shapeName].score;
  this.scoreText.setText(`Score: ${this.score.toString()}`);
  }
  onSecond(){
    this.timer--;
    this.timerText.setText(this.timer);
    if(this.timer <= 0){
      this.gameOver =true;
    }
  }
  //funcion reduce
reduce(shape, platform){
      const newPercentage = shape.getData(POINTS_PERCENTAGE) - 0.25;
      console.log(shape.texture.key, newPercentage);
      shape.setData(POINTS_PERCENTAGE, newPercentage);
      if (newPercentage <= 0) {
        shape.disableBody(true, true);
        return;
      }

      // show text
      const text = this.add.text(shape.body.position.x+10, shape.body.position.y, "- 25%", {
        fontSize: "22px",
        fontStyle: "bold",
        fill: "red",
      });
      setTimeout(() => {
        text.destroy();
      }, 200);
    }

}

