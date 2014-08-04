function aiMove()
{
  var aiPlayer = otherValue(player);
  var legalMoves = getLegalMoves(aiPlayer);
  
  var i = Math.floor(legalMoves.length * Math.random());
  
 var x = aiPlayer[i].xPos;
 var y = aiPlayer[i].yPos;

 addMove(x, y, aiPlayer);
}
