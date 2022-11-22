class Game {
  constructor() {

    this.resetTitle=createElement("h2")
    this.resetButton=createButton("")
    this.rank=createElement ("h2")
    this.leader1=createElement('h2')
    this.leader2=createElement("h2")
    this.title=createElement("h2")
  }
mostrartexto(){
  form.titleImg.position(40,50)
  form.titleImg.class("gameTitleAfterEffect")
  this.resetTitle.html ("reset")
  this.resetTitle.class("resetText")
  this.resetTitle.position(width/2+200,40)


  this.resetButton.class("resetButton")
  this.resetButton.position(width/2+230,100)
  this.title.html("Placar");
  this.title.class("resetText");
  this.title.position(width / 3 - 60, 40);

  this.leader1.class("leadersText");
  this.leader1.position(width / 3 - 50, 80);

  this.leader2.class("leadersText");
  this.leader2.position(width / 3 - 50, 130);


}


showLeaderboard() {
  var leader1, leader2;
  var players = Object.values(allPlayers);
  if (
    (players[0].rank === 0 && players[1].rank === 0) ||
    players[0].rank === 1
  ) {
    // &emsp;    Essa etiqueta é usada para exibir quatro espaços.
    leader1 =
      players[0].rank +
      "&emsp;" +
      players[0].name +
      "&emsp;" +
      players[0].score;

    leader2 =
      players[1].rank +
      "&emsp;" +
      players[1].name +
      "&emsp;" +
      players[1].score;
  }

  if (players[1].rank === 1) {
    leader1 =
      players[1].rank +
      "&emsp;" +
      players[1].name +
      "&emsp;" +
      players[1].score;

    leader2 =
      players[0].rank +
      "&emsp;" +
      players[0].name +
      "&emsp;" +
      players[0].score;
  }

  this.leader1.html(leader1);
  this.leader2.html(leader2);
}

  resetar(){
    this.resetButton.mousePressed(()=>{
      database.ref("/").set({
      gameState:0,
      playerCount:0,
      players:{}  
      })
      location.reload()
    })
  }

  start() {
    form = new Form();
    form.display();
    player = new Player();
    playerCount=player.getCount()
    car1 = createSprite(width / 2 - 50, height - 100);
    car1.addImage("car1", car1_img);
    car1.scale = 0.07;


    car2 = createSprite(width / 2 + 100, height - 100);
    car2.addImage("car2", car2_img);
    car2.scale = 0.07;


    cars = [car1, car2];

    fuels=new Group()
    coins=new Group()
    obstacles=new Group()  

    this.addSprites(fuels,5,fuelImage,0.02)
    this.addSprites(coins,20,coinImage,0.09)
    
    var obstaclesPositions = [
      { x: width / 2 + 250, y: height - 800, image: obstacle2Image },
      { x: width / 2 - 150, y: height - 1300, image: obstacle1Image },
      { x: width / 2 + 250, y: height - 1800, image: obstacle1Image },
      { x: width / 2 - 180, y: height - 2300, image: obstacle2Image },
      { x: width / 2, y: height - 2800, image: obstacle2Image },
      { x: width / 2 - 180, y: height - 3300, image: obstacle1Image },
      { x: width / 2 + 180, y: height - 3300, image: obstacle2Image },
      { x: width / 2 + 250, y: height - 3800, image: obstacle2Image },
      { x: width / 2 - 150, y: height - 4300, image: obstacle1Image },
      { x: width / 2 + 250, y: height - 4800, image: obstacle2Image },
      { x: width / 2, y: height - 5300, image: obstacle1Image },
      { x: width / 2 - 180, y: height - 5500, image: obstacle2Image }
    ];

    this.addSprites(obstacles,obstaclesPositions.length,obstacle1Image,0.04,obstaclesPositions)

    
  }
  getState (){
    var gameStateref=database.ref("gameState")
    gameStateref.on("value",(data)=>{
      gameState=data.val()
    })
  }

  update (count){
    database.ref("/").update({
      gameState:count
    })
  }
  play() {
    form.hide()
    this.mostrartexto()
    this.resetar()
    Player.getPlayersInfo();
    player.getcarsend()

    if (allPlayers !== undefined) {
      image(track, 0, -height * 5, width, height * 6);
var index=0
for(var plr in allPlayers){
  index=index+1
  var x = allPlayers[plr].positionx
  var y = height-allPlayers[plr].positiony
  cars[index-1].position.x=x
  cars[index-1].position.y=y

 if(index===player.index){
  camera.position.y=cars[index-1].position.y
  this.addFuel(index)
  this.addCoins(index)
 }

}
this.controles()
const Linhadechegada=height*-100
if (player.y>Linhadechegada){
  gameState=2
  player.rank+=1
  Player.updatecarsend(player.rank)
  player.update()
  this.showRank()

}

      drawSprites();
    }
  }

    
  controles(){
    if(keyIsDown(UP_ARROW)){
      player.positiony+=10
      player.update()
    }
  }

  addSprites(grupo,numero,imagem,escala,positions=[]){
for(var i=0;i<numero;i++){
  var x,y
if(positions.length>0){
  x=positions[i].x
  y=positions[i].y
  imagem=positions[i].image
  
}
else{
  x=random(width-2+150,width/2-150)
  y=random(-height*4.5,height-400)

}
 
  var sprite=createSprite(x,y)
  sprite.addImage("sprite",imagem)
  sprite.scale=escala
  grupo.add(sprite)
}

  }

  addFuel(index) {
    //adicionando combustível
    cars[index - 1].overlap(fuels, function(collector, collected) {
      player.fuel = 200;
      //o sprite é coletado no grupo de colecionáveis que desencadeou
      //o evento
      collected.remove();
    });

  }
  
addCoins(index) {
    cars [index - 1].overlap(coins, function(collector, collected) {
      player.score += 20
      player.update();
      //o sprite é coletado no grupo de colecionáveis que desencadeou
      //o evento
      collected.remove();
    });
  }
  showRank() {
    swal({
      title: `Incrível!${"\n"}Rank${"\n"}${player.rank}`,
      text: "Você alcançou a linha de chegada com sucesso!",
      imageUrl:
        "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
      imageSize: "100x100",
      confirmButtonText: "Ok"
    });
  }

  gameOver() {
    swal({
      title: `Fim de Jogo`,
      text: "Oops você perdeu a corrida!",
      imageUrl:
        "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize: "100x100",
      confirmButtonText: "Obrigado por jogar"
    });
  }
}



