import{SHAPES} from "../../utils.js";
const{TRIANGLE, SQUARE, DIAMOND}=SHAPES;
export default class Game extends Phaser.Scene {
  score;
  constructor() {
    super("Game");
  }
gameOver;
timer;
  init() {
    this.gameOver =false
    this.shapesRecolected ={
      [TRIANGLE]: {count:0, score:10},
      [SQUARE]: {count:0, score:20},
      [DIAMOND]: {count:0, score:30}
    }
    console.log(this.shapesRecolected)
  }
  
  create() {
    // add background
    this.add.image(400, 300, "sky").setScale(0.555);
    //
    let platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, "platform").setScale(2).refreshBody();
    

    // add sprite player
    this.player = this.physics.add.sprite(100, 450, "ninja");
    this.player.setCollideWorldBounds(true);
    // add shapes  group
    this.shapesGroup = this.physics.add.group();
    this.addShape();
    // add shape to screen
    //create event to add shapes
    this.time.addEvent({
      delay: 3000,
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
)
this.physics.add.overlap(
  this.shapesGroup,
  this.platforms,
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
this.timer =20;
this.timerText = this.add.text(750,20, this.timer, {
  fontSize: "32px",
  fontSize: "bold",
  fill: "#FFFFFF",
})

  }


  update() {
    if (this.gameOver){
      this.scene.start("GameOver")
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
    if (this.cursors.up.isDown && this.player.body.touching.down){
      this.player.setVelocityY(-330)
    }
    if (this.score>50) {
      console.log ("abrir escena")
      this.scene.start("Win");
    }
  }




 addShape (){
  // get random shape
  const randomShape = Phaser.Math.RND.pick ([DIAMOND, SQUARE,TRIANGLE]);
  //get  random position  x
  const randomX = Phaser.Math.RND.between(20,780);
  // get random  to  screen
  this.shapesGroup.create(randomX, 0, randomShape).setCircle(25, 7, 7).setBounce(0.75, 0.75);
  console.log("shape is added", randomX, randomShape);
  }
  collectShape(player, shape){
    //remove shape from screen
    shape.disableBody(true, true);
  
    const shapeName = shape.texture.key;
    this.shapesRecolected[shapeName].count++;

    this.score += this.shapesRecolected[shapeName].score;
  this.scoreText.setText(`Score: ${this.score.toString()}`);
  }
  onSecond(){
    this.timer--;
    this.timerText.setText(this.timer);
    if(this.timer <=0){
      this.gameOver =true;
    }
  }
  //agregar plataformas
}
