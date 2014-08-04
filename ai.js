function aiMove()
{
  var aiPlayer = otherValue(player);
  var legalMoves = getLegalMoves(aiPlayer);
  
  var i = Math.floor(legalMoves.length * Math.random());
  
 var x = legalMoves[i].xPos;
 var y = legalMoves[i].yPos;

 addMove(x, y, aiPlayer);
 
 
 		if($('#IsUserAI').is(':checked'))
		{
			autoMove();
		}
}
