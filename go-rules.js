function addMove(x, y, value) {
    if (canMove(x, y, value)) {
    	
    	ARRAYminus2.setTo(ARRAYminus1);
    	ARRAYminus1.setTo(array);
    	
    	MOVEminus2 = MOVEminus1;
    	
        array[x][y] = value;
        takePieces(x, y, value);
        
        sendMove(x, y)
        
        MOVEminus1 = {xPos : x, yPos : y};

    	switchTurn();
    	
    	if(gameMode == "local")
    	{
    		player = otherValue(player);
    	}
    	if(gameMode == "AI")
    	{
    		// todo: cal ai move, but not in here..
    	}
    }
    else {
        return;
    }
    updateDisplay();
}

function removeMove(x, y) {
    array[x][y] = 0;
}

function passesKoRule(x, y, value)
{
	var testArray = [];
	testArray.setTo(array);
	
	testArray[x][y] = value;
	
	return !ARRAYminus2.equals(testArray);
}

function canMove(x, y, value)
{
	var isEmpty = array[x][y] == 0;
	var isPlayerTurn = (value == currentTurn)
	var ko = passesKoRule(x, y, value);
	//todo: implement this
	return isEmpty && isPlayerTurn && ko;
}

function mustRemove(item)
{
    var enemyValue = otherValue(item.val);
    //console.log("mustRemove enemy val: " + enemyValue);
    var enemies = getAdjacentWithValue(item.xPos, item.yPos, enemyValue);
    
    return enemies.length > 3;
}

function takePieces(x, y, value) {
    var placedValue = value;
    var enemyValue = otherValue(value);
    var adjacentEnemies = getAdjacentWithValue(x, y, enemyValue);
    
    for (var i = 0; i < adjacentEnemies.length; i++)
    {
        var cellGroup = [];
        cellGroup = getCellGroup(cellGroup, adjacentEnemies[i].xPos, adjacentEnemies[i].yPos);
        removeSurrounded(cellGroup);
    }
}

//this will need to be tested.
function getCellGroup(cellGroup, x, y)
{
	var newCells = [];
	
	if( !adjacentArrayHasValue(cellGroup, x, y) && !isOutOfBounds(x,y))
	{   
		addToArray(cellGroup, x, y);
	}
	
	var valueToPass = 5;
	
	if(!isOutOfBounds(x,y))
	{
		valueToPass = array[x][y];
	}
	
	var nextVals = getAdjacentWithExactValue(x, y, valueToPass);
	
	for(var i=0; i< nextVals.length; i++)
	{
		if( !adjacentArrayHasValue(cellGroup, nextVals[i].xPos, nextVals[i].yPos) && (array[nextVals[i].xPos][nextVals[i].yPos] == array[x][y]))
		{
			cellGroup.push(nextVals[i]);
			newCells.push(nextVals[i]);
		}
	}
	
	if(newCells.length > 0)
	{
		for(var i=0; i< newCells.length; i++)
		{
			cellGroup = getCellGroup(cellGroup, newCells[i].xPos, newCells[i].yPos);
		}
	}

	return cellGroup;
}

function removeSurrounded(cellGroup)
{
	for(var i=0; i< cellGroup.length; i++)
	{
		var nonZeroAdjacents = getAdjacentNonZeroValuesCount(cellGroup[i].xPos, cellGroup[i].yPos);
		//console.log("Non zero adjacents: " + nonZeroAdjacents + " at: (" + cellGroup[i].xPos + "," + cellGroup[i].yPos + ")");
		if(nonZeroAdjacents < 4)
		{
			return;
		}
	}
	
	for(var i=0; i< cellGroup.length; i++)
	{
		removeMove(cellGroup[i].xPos, cellGroup[i].yPos);
	}
}


