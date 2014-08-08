function getAdjacentValues(targetArray, x, y)
{
	var adjacentValues = [];
	for(var i = -1; i < 2; i += 2)
	{
		var a = x + i;
		var b = y + i;
		addToArray(targetArray, adjacentValues, a, y);
		addToArray(targetArray, adjacentValues, x, b);
	}
	return adjacentValues;
}

function getAdjacentNonZeroValues(targetArray, x, y)
{
	var adjacentValues = [];
	for(var i = -1; i < 2; i += 2)
	{
		var a = x + i;
		var b = y + i;
		
		if(isOutOfBounds(a, y))
		{
		    addToArray(targetArray, adjacentValues, a, y);
		}
		else if(array[a][y] != 0)
		{
		    addToArray(targetArray, adjacentValues, a, y);
		}
		
		if(isOutOfBounds(x, b))
		{
		    addToArray(targetArray, adjacentValues, x, b);
		}
		else if(array[x][b] != 0)
		{
		    addToArray(targetArray, adjacentValues, x, b);
		}
	}
	
	return adjacentValues;
}

function getAdjacentNonZeroValuesCount(targetArray, x, y)
{
    return getAdjacentNonZeroValues(targetArray, x, y).length;
}

function isOutOfBounds(x, y)
{
    var result = x < 0 || y < 0 || x >= size || y >= size;

    return result;
}

function addToArray(targetArray, adjacentArray, x, y)
{
    if (isOutOfBounds(x, y)) {
        adjacentArray.push({ xPos: x, yPos: y, val: "OUT_OF_BOUND" });
    }
    else
    {
        adjacentArray.push({ xPos: x, yPos: y, val: targetArray[x][y] });
    }

    return adjacentArray;
}

//todo: check up on whether anything doesnt call target array
function addToArrayWithVal(targetArray, adjacentArray, x, y, value)
{
    if (isOutOfBounds(x, y)) {
        adjacentArray.push({ xPos: x, yPos: y, val: "OUT_OF_BOUND" });
    }
    else {
        if(array[x][y] == value)
        {
            adjacentArray.push({ xPos: x, yPos: y, val: targetArray[x][y] });
        }
    }

    return adjacentArray;
}

function getAdjacentWithValue(targetArray, x, y, value)
{
	var adjacentWithValue = [];
	for(var i = -1; i < 2; i += 2)
	{
		var a = x + i;
		var b = y + i;
		addToArrayWithVal(targetArray, adjacentWithValue, a, y, value);
		addToArrayWithVal(targetArray, adjacentWithValue, x, b, value);
	}
	return adjacentWithValue;
}

function addToArrayWithExactVal(targetArray, adjacentArray, x, y, value)
{
    if (isOutOfBounds(x, y)) {
        return adjacentArray;
    }
    else {
        if(array[x][y] == value)
        {
            adjacentArray.push({ xPos: x, yPos: y, val: targetArray[x][y] });
        }
    }

    return adjacentArray;
}

function getAdjacentWithExactValue(targetArray, x, y, value)
{
	var adjacentWithValue = [];
	for(var i = -1; i < 2; i += 2)
	{
		var a = x + i;
		var b = y + i;
		addToArrayWithExactVal(targetArray, adjacentWithValue, a, y, value);
		addToArrayWithExactVal(targetArray, adjacentWithValue, x, b, value);
	}
	return adjacentWithValue;
}

function adjacentArrayHasValue(adjacentArray, x, y)
{
	for(var i = 0; i < adjacentArray.length; i++)
	{
		if(adjacentArray[i].xPos == x && adjacentArray[i].yPos == y)
		{
			return true;
		}
	}
	return false;
}

function getLegalMoves(targetArray, colour)
{
    var legalMoveArray = [];

    for(var i = 0; i < size ; i++)
    {
        for(var j = 0; j < size; j++)
        {
            if (canMove(targetArray, i, j, colour))
            {
                legalMoveArray.push({ xPos : i, yPos : j});
            }
        }
    }

    return legalMoveArray;
}

function getScoresFromArray(targetArray, legalMoveArray)
{
    var arrayLength = legalMoveArray.length;

    for(var i = 0; i < arrayLength; i++)
    {
        legalMoveArray[i].score = calculateScore(targetArray, legalMoveArray[i].xPos, legalMoveArray[i].yPos);
    }

    return legalMoveArray;
}

function calculateMoveScore(targetArray, x, y, colour)
{
    var tempArray = array;

    addMove(x, y, colour);

    var result = calculateScore(targetArray);

    array = tempArray;

    return result;
}

function calculateScore(targetArray)
{
    //todo: calculate the score on the board.
    return 0;
}