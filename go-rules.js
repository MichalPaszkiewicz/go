function addMove(x, y, value) {
    if (canMove(array, x, y, value)) {
    	
    	ARRAYminus2.setTo(ARRAYminus1);
    	ARRAYminus1.setTo(array);
    	
    	MOVEminus2 = MOVEminus1;
    	
        array[x][y] = value;
        takePieces(array, x, y, value);
        
        sendMove(x, y)
        
        MOVEminus1 = {xPos : x, yPos : y};

    	switchTurn();
    	
    	if(gameMode == "local")
    	{
    		player = otherValue(player);
    	}
    	/*if(gameMode == "AI")
    	{
    		// todo: cal ai move, but not in here..
    	}*/
    }
    else {
        return;
    }
    updateDisplay();
}

function removeMove(targetArray, x, y) {
    targetArray[x][y] = 0;
}

function passesKoRule(x, y, value)
{
	var testArray = [];
	testArray.setTo(array);
	
	// todo: actually needs to take pieces, otherwise this will not be getting correct latest move
	testArray[x][y] = value;
	takePieces(testArray,x,y,value);
	
	var result = !ARRAYminus2.equals(testArray);
	var resultAlt = !ARRAYminus1.equals(testArray);
	
	return resultAlt;
}

function canMove(targetArray, x, y, value)
{
	var isEmpty = targetArray[x][y] == 0;
	var isPlayerTurn = (value == currentTurn);
	var ko = passesKoRule(x, y, value);
	//todo: implement this
	
	var willPlaceNicely = notSuicide(targetArray, x, y, value);
	
	return isEmpty && isPlayerTurn && ko && willPlaceNicely;
}

function notSuicide(targetArray, x, y, value){
	var testArray = [];
	testArray.setTo(targetArray);
	var noTakeArray = [];
	noTakeArray.setTo(targetArray);
	noTakeArray[x][y] = value;
	
	testArray[x][y] = value;
	takePieces(testArray, x, y, value);
	
	var willRemove = false
	
	// this equals is returning a bad value... seems takepieces does not work
	if(!testArray.equals(noTakeArray)){
		willRemove = true;
	}
	
	// need to calculate whether item must remove enemy pieces.
	var mustRemove = false;
	
	console.log(willRemove);
	
	if(!mustRemove){
		return true;
	}
	
	return willRemove;
}

//function mustRemove(item)
//{
//    var enemyValue = otherValue(item.val);
//    //console.log("mustRemove enemy val: " + enemyValue);
//    var enemies = getAdjacentWithValue(array, item.xPos, item.yPos, enemyValue);
    
//    return enemies.length > 3;
//}

// need to research how, and whether this actually works. Seems to break on all but active array.
function takePieces(targetArray, x, y, value) {
    var placedValue = value;
    var enemyValue = otherValue(value);
    var adjacentEnemies = getAdjacentWithValue(targetArray, x, y, enemyValue);
    
    for (var i = 0; i < adjacentEnemies.length; i++)
    {
        var cellGroup = [];
        cellGroup = getCellGroup(targetArray, cellGroup, adjacentEnemies[i].xPos, adjacentEnemies[i].yPos);
        removeSurrounded(targetArray, cellGroup);
    }
}

//this will need to be tested.
function getCellGroup(targetArray, cellGroup, x, y)
{
	var newCells = [];
	
	if( !adjacentArrayHasValue(cellGroup, x, y) && !isOutOfBounds(x,y))
	{   
	    addToArray(targetArray, cellGroup, x, y);
	}
	
	var valueToPass = 5;
	
	if(!isOutOfBounds(x,y))
	{
	    valueToPass = targetArray[x][y];
	}
	
	var nextVals = getAdjacentWithExactValue(targetArray, x, y, valueToPass);
	
	for(var i=0; i< nextVals.length; i++)
	{
	    if (!adjacentArrayHasValue(cellGroup, nextVals[i].xPos, nextVals[i].yPos) && (targetArray[nextVals[i].xPos][nextVals[i].yPos] == targetArray[x][y]))
		{
			cellGroup.push(nextVals[i]);
			newCells.push(nextVals[i]);
		}
	}
	
	if(newCells.length > 0)
	{
		for(var i=0; i< newCells.length; i++)
		{
		    cellGroup = getCellGroup(targetArray, cellGroup, newCells[i].xPos, newCells[i].yPos);
		}
	}

	return cellGroup;
}

function removeSurrounded(targetArray, cellGroup)
{
	for(var i=0; i< cellGroup.length; i++)
	{
	    var nonZeroAdjacents = getAdjacentNonZeroValuesCount(targetArray, cellGroup[i].xPos, cellGroup[i].yPos);
		//console.log("Non zero adjacents: " + nonZeroAdjacents + " at: (" + cellGroup[i].xPos + "," + cellGroup[i].yPos + ")");
		if(nonZeroAdjacents < 4)
		{
			return;
		}
	}
	
	for(var i=0; i< cellGroup.length; i++)
	{
	    removeMove(targetArray, cellGroup[i].xPos, cellGroup[i].yPos);
	}
}


