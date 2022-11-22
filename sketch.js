var canvas;
var backgroundImage;
var bgImg;
var database;
var form, player, game;
var playerCount, gameState;
var allPlayers;
var car1,car2,cars,car1_img,car2_img,track
var fuels,coins,obstacles,life;
var obstacle1Image,obstacle2Image,fuelImage,coinImage
function preload() {
  backgroundImage = loadImage("./assets/planodefundo.png");
  car1_img=loadImage("./assets/car1.png")
  car2_img=loadImage("./assets/car2.png")
  track=loadImage("./assets/track.jpg")
  fuelImage=loadImage("./assets/fuel.png")
  coinImage=loadImage("./assets/goldCoin.png")
  lifeImage=loadImage("./assets/life.png")
  obstacle1Image=loadImage("./assets/obstacle1.png")
  obstacle2Image=loadImage("./assets/obstacle2.png")
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game = new Game();
  game.getState()
  game.start();
  bgImg = backgroundImage;
}

function draw() {
  background(bgImg);
  if(playerCount===2){
   game.update(1)
  }
  if(gameState===1){
    game.play()
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

