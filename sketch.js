var PLAY=1;
var END=0;
var gamestate=PLAY;
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudimage;
var plantae,plantae1,plantae2,plantae3,plantae4,plantae5;
var cloudgroup,obstaclesgroup;
var score;
var restart;
var gameover;
var quebec;
var NYC;
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  cloudimage=loadImage("cloud.png ");
  groundImage = loadImage("ground2.png");
  plantae=loadImage("obstacle1.png")
  plantae1=loadImage("obstacle2.png")
plantae2=loadImage("obstacle3.png")
plantae3=loadImage("obstacle4.png")
  plantae4=loadImage("obstacle5.png")
  plantae5=loadImage("obstacle6.png")
  gameover=loadImage("gameOver.png");
  restart=loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
ground.velocityX = -2;
//ground.velocityX=-(6+3*score/100);
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  obstaclesgroup=new Group();
cloudgroup=new Group();
  score=0;
  
  quebec=createSprite(300,100,10,10);
  NYC=createSprite(300,150,19,19);
  quebec.visible=false;
  NYC.visible=false;
  quebec.addImage(gameover);
  NYC.addImage(restart);
}

function draw() {
  background(250);
  
  score=score+Math.round(getFrameRate()/60);
  text("Score of Player:"+score,200,200);
  text("WElCOME TO  MEXICO,THE LAND OF TREX",100,100);
  if (gamestate===PLAY){
   if(keyDown("space")) {
    trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY + 0.75;
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  cirrus();
  pain();
  trex.collide(invisibleGround);
  if (obstaclesgroup.isTouching(trex)){
    gamestate=END;
    
  }
  }
  else if (gamestate===END){
  ground.velocityX=0;
    cloudgroup.setVelocityXEach(0);
    obstaclesgroup.setVelocityXEach(0);
    trex.velocityY=0
    trex.changeAnimation("collided",trex_collided);
    obstaclesgroup.setLifetimeEach(-1);
    cloudgroup.setLifetimeEach(-1);
    quebec.visible=true;
    NYC.visible=true;
    if (mousePressedOver(NYC)){
      reset();
    }
  }
  
  drawSprites();
}
function cirrus() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
     cloud = createSprite(600,50,40,10);
    cloud.y = Math.round(random(150,100));
  cloud.addImage(cloudimage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
  cloudgroup.add(cloud)
   
  }
  
}
function pain() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
     plant= createSprite(600,165,40,10);
   var rand= Math.round(random(1,6));
 switch(rand){
   case 1:plant.addImage(plantae);
     break;
      case 2:plant.addImage(plantae1);
     break;
      case 3:plant.addImage(plantae2);
     break;
      case 4:plant.addImage(plantae3);
     break; case 5:plant.addImage(plantae4);
     break; case 6:plant.addImage(plantae5);
     break;
     default: break;
 }
    
   plant.scale = 0.5;
  plant.velocityX = -2;
    
     //assign lifetime to the variable
    plant.lifetime = 300;
    obstaclesgroup.add(plant);
   
  }
  
}
function reset(){

  gamestate=PLAY;
NYC.visible=false;
  quebec.visible=false;
trex.changeAnimation("running",trex_running);
score=0;
  cloudgroup.destroyEach();
  obstaclesgroup.destroyEach();
  //ground.x=ground.width/2;
 ground.velocityX=-2;
}
