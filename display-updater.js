createArray();
setArray();

function updateDisplay()
{
  for(var i = 0; i < size; i++){
    for(var j = 0; j < size; j++){
      $("#i" + i + "j" + j + " div").removeClass("white black");
      if(array[i][j] == 1)
      {
        $("#i" + i + "j" + j + " div").addClass("white");
      }
      if(array[i][j] == 2)
      {
        $("#i" + i + "j" + j + " div").addClass("black");
      }
  }}
  
  if(player == vWhite)
  {
    $("#player-colour").text("You are white").css({ color : "white"});
  }
  if(player == vBlack)
  {
    $("#player-colour").text("You are black").css({ color : "black"});
  }
  
  if(currentTurn == vWhite)
  {
    $("#move-notifier").text("White to move");
  }
  else
  {
    $("#move-notifier").text("Black to move");    
  }
}

function gameOver(){
  alert("Game over");
}
