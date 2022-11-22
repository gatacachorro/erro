class Form {
  constructor() {
    this.input = createInput("").attribute("placeholder", "Digite seu nome");
    this.playButton = createButton("Jogar");
    this.titleImg = createImg("./assets/TITULO.png", "nome do jogo");
    this.greeting = createElement("h2");
  }

  hide() {
    this.greeting.hide();
    this.playButton.hide();
    this.input.hide();
  }

  showElements() {
    this.titleImg.position(120, 50);
    this.input.position(width / 2, height / 2);
    this.playButton.position(width / 2, height / 2 + 50);
    this.greeting.position(width / 2, height / 2);

    this.titleImg.class("gameTitle");
    this.input.class("customInput");
    this.playButton.class("customButton");
    this.greeting.class("greeting");
  }

  mousePressed() {
    this.playButton.mousePressed(()=>{
      this.input.hide()
      this.playButton.hide()
      this.greeting.html(`Bem vindo piloto ${
        this.input.value()
      }</br> aguarde o outro jogador entrar `)
      playerCount+=1
      player.name=this.input.value()
      player.index=playerCount
      player.addplayer()
      player.updateCount(playerCount)
    })
  }

  display() {
    this.showElements();
    this.mousePressed();
  }
}
