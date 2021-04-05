var PLAY = 1;
var END = 0;
var gameState = PLAY;

var backGround, backGroundImg;

var plane1, plane1Img, plane1_boost, plane1_collided;
var plane2, plane2Img, plane2_boost, plane2_collided;

var obstaclesGroup, obs1, obs2, obs3, obs4;

var gameOver, gameOverImg;
var restart, restartImg;

var score = 0;

function preload(){
  
  plane1Img = loadImage("P1.png");
  plane1_boost = loadImage("P1B.png");
  plane1_collided = loadImage("P1C.png");
     
  plane2Img = loadImage("P2.png");
  plane2_boost = loadImage("P2B.png");
  plane2_collided = loadImage("P2C.png");
  
  obs1 = loadImage("OBS1.png");
  obs2 = loadImage("OBS2.png");
  obs3 = loadImage("OBS3.png");
  obs4 = loadImage("OBS4.png");
  
  backGroundImg = loadImage("Background.png");
  gameOverImg = loadImage("GameOver.png");
  restartImg = loadImage("Restart.png");
  
}

function setup() {
  createCanvas(300, 600);
  
  backGround = createSprite(150,0,300,600);
  backGround.addImage("BG", backGroundImg);
  backGround.scale = 10;
  backGround.velocityY = 4;
  backGround.Y = backGround.height /2
      
  plane1 = createSprite(150,500,20,20);
  plane1.addImage("flying", plane1Img);
  plane1.addImage("boost", plane1_boost);
  plane1.addImage("collided", plane1_collided);
  plane1.scale = 2;
    
  plane2 = createSprite(150,500,20,20);
  plane2.addImage("flying", plane2Img);
  plane2.addImage("boost", plane2_boost);
  plane2.addImage("collided", plane2_collided);
  plane2.scale = 2;
  plane2.visible = false;
  
  gameOver = createSprite(150,260,20,20);
  gameOver.addImage("gameover", gameOverImg);
  gameOver.scale = 3;
  gameOver.visible = false;
  
  restart = createSprite(150,310,20,20);
  restart.addImage("restart", restartImg);
  restart.scale = 2;
  restart.visible = false;
      
  obstaclesGroup = new Group();
  score = 0;
}

function draw() {
  background(255);
  
  if (gameState === PLAY){
            
  if(keyWentDown("space")){
     backGround.velocityY = 10;
     obstaclesGroup.setVelocityYEach(10);
     plane1.changeImage("boost", plane1_boost);
    }
  
  if(keyWentUp("space")){
     backGround.velocityY = 4;
     obstaclesGroup.setVelocityEach(4);
     plane1.changeImage("flying", plane1Img);
    }
  
  if(keyWentDown("A")){
     plane1.velocityX = -3;
    }
  
  if(keyWentUp("A")){
     plane1.velocityX = 0;
    }
       
  if(keyWentDown("D")){
     plane1.velocityX = 3;
   }  
    
  if(keyWentUp("D")){
     plane1.velocityX = 0;
   } 
    
    if (backGround.y >= 650){
      backGround.y = backGround.height/2;
   }
    
   spawnObstacles();
    
   if(obstaclesGroup.isTouching(plane1)){
       gameState = END;
  }  
 }
  
  if (gameState === END){
     
    gameOver.visible = true;
    restart.visible = true;
    
    backGround.velocityY = 0;
    
    plane1.changeImage("collided", plane1_collided);
    plane1.velocityY = 0;
    plane1.velocityX = 0;
    
    obstaclesGroup.setVelocityYEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
   }
 }
  
  drawSprites();
}
function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.x = Math.round(random(50,220));
    obstacle.velocityY = 4;
           
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: obstacle.addImage(obs1);
              break;
      case 2: obstacle.addImage(obs2);
              break;
      case 3: obstacle.addImage(obs3);
              break;
      case 4: obstacle.addImage(obs4);
              break;
      default: break;
    }
    
    obstacle.depth = 1;        
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  backGround.velocityY = 4;
    
  plane1.changeImage("flying", plane1Img);
   
}