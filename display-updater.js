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
    $("#player-colour").text("You are white").css({ color : "white", text-shadow : "1px 1px black"});
  }
  if(player == vBlack)
  {
    $("#player-colour").text("You are black").css({ color : "black", text-shadow : "none"});
  }
  
  if(currentTurn == vWhite)
  {
    $("#move-notifier").text("White to move").css({ color : "white", text-shadow : "1px 1px black"});
  }
  else
  {
    $("#move-notifier").text("Black to move").css({ color : "black", text-shadow : "none"});    
  }
}

function gameOver(){
  alert("Game over");
}
