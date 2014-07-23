function addMove(x, y, value) {
    if (canMove(x, y, value)) {
        array[x][y] = value;
        takePieces(x, y, value);
    }
    else {
        return;
    }
    
    updateDisplay();
}

function removeMove(x, y) {
    array[x][y] = 0;
}

function canMove(x, y, value)
{
	//todo: implement this
	return true;
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
    
    //console.log("Adj ene: " + adjacentEnemies + " | placedValue: " + placedValue + " | enemy value: " + enemyValue);

    for (var i = 0; i < adjacentEnemies.length; i++)
    {
        //console.log(adjacentEnemies[i]);
        //if(mustRemove(adjacentEnemies[i]))
        //{
        //    removeMove(adjacentEnemies[i].xPos, adjacentEnemies[i].yPos);
        //}
        
        var cellGroup = [];
        
        cellGroup = getCellGroup(cellGroup, adjacentEnemies[i].xPos, adjacentEnemies[i].yPos);
        
        removeSurrounded(cellGroup);
    }
}

//this will need to be tested.
function getCellGroup(cellGroup, x, y)
{
	var newCells = [];
	
	if( !adjacentArrayHasValue(cellGroup, x, y) )
	{   
		cellGroup.push({ xPos: x, yPos: y, val: array[x][y] });
	}
	
	var nextVals = getAdjacentWithExactValue(x, y, array[x][y]);
	
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


