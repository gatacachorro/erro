class Player {
  constructor() {
    this.name=null
    this.index=null
    this.positionx=0
    this.positiony=0 
    this.rank=0
    this.score=0
    this.fuel=200
  }

  getCount (){
    var playerCountref=database.ref("playerCount")
    playerCountref.on("value",(data)=>{
      playerCount=data.val()
    })
  }

  updateCount (count){
    database.ref("/").update({
      playerCount:count
    })
  }

  addplayer (){
 var playerindex = "players/player"+this.index
    if (this.index===1){
      this.positionx=width/2-100
    }
    else {
      this.positionx=width/2+100 
    }
    database.ref (playerindex).set({
      name:this.name,
      positionx:this.positionx,
      positiony:this.positiony,
      rank:this.rank,
     score:this.score,
     fuel:this.fuel
     
    })
 

}
update (){
  var playerindex = "players/player"+this.index
    
     database.ref (playerindex).update({
       positionx:this.positionx,
       positiony:this.positiony,
       rank:this.rank,
       score:this.score,
       fuel:this.fuel
     })
  
 
 }
static getPlayersInfo() {
  var playerInfoRef = database.ref("players");
  playerInfoRef.on("value", data => {
    allPlayers = data.val();
  });
}
static updatecarsend(rank){
  database.ref("/").update({
    carsend:rank
  })

  }
  getcarsend(){
    database.ref("carsend").on("value",(data)=>{
      this.rank=data.val()
    })
  }
}

  
