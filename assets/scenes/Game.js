import{SHAPES} from "../../utils.js";
const{TRIANGLE, SQUARE, DIAMOND,BOMBB}=SHAPES;//agregar el bomb

export default class Game extends Phaser.Scene {
  score;
  constructor() {
    super("Game");
  }

  init() {
    this.gameOver = false
    this.isWin = false
   
    this.shapesRecolected ={
      [TRIANGLE]: {count:0, score:10},
      [SQUARE]: {count:0, score:20},
      [DIAMOND]: {count:0, score:30},
      [BOMBB]: {count:0, score:-30}
    }
    console.log(this.shapesRecolected)
  }
  
  create() {
    // add background
    this.add.image(400, 300, "sky").setScale(0.555);
    //
    let platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, "ground").setScale(2).refreshBody();
  
    
    platforms.create(500, 358, "ground").setScale(0.55).refreshBody();
   
    
    

    // add sprite player
    this.player = this.physics.add.sprite(100, 450, "ninja");
    this.player.setCollideWorldBounds(true);
    // add shapes  groeup
    this.shapesGroup = this.physics.add.group();
    //this.shapesGroup.create(100, 0, "diamond");
    //this.shapesGroup.create(200, 0, "triangle");
    //this.shapesGroup.create(300, 0, "square");

    this.addShape();
    //create event to add shapes
    this.time.addEvent({
      delay: 1500,
      callback: this.addShape,
      callbackScope: this,
      loop: true,
    });
    this.time.addEvent({
      delay: 1000,
      callback: this.onSecond,
      callbackScope: this,
      loop: true
    })

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
this.score = 0;
this.scoreText = this.add.text(20 , 20, "Score: " + this.score, {
  fontSize: "35px",
  fontStyle: "bold",
  fill: "#FFFFFF",
}); 
this.timer = 5;
this.timeText = this.add.text(750 , 20, this.timer, {
  fontSize: "35px",
  fontStyle: "bold",
  fill: "#FFFFFF",
});


}

 update() {
  if (this.score > 200){
    this.scene.start("Win");
  }
  if (this.gameOver){
    this.scene.start("GameOver");
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
    
  }





 addShape (){
  // get random shape
  const randomShape = Phaser.Math.RND.pick ([DIAMOND, SQUARE,TRIANGLE,BOMBB]);
  //get  random position  x
  const randomX = Phaser.Math.RND.between(0,800);
  // get random  to  screen
  this.shapesGroup.create(randomX, 0, randomShape).setCircle(25, 7, 7) .setBounce(0.75,0.50);
};
  
 
  
  collectShape(player, shape){
    //remove shape from screen
    shape.disableBody(true, true);
  
    const shapeName = shape.texture.key;
    this.shapesRecolected[shapeName].count++;

    this.score += this.shapesRecolected[shapeName].score;
  this.scoreText.setText(`Score: ${this.score.toString()}`);
  }
onSecond (){
  this.timer--;
  this.timeText.setText(this.timer);
  if ( this.timer <=0){
    this.gameOver = true;
  }
}
}
