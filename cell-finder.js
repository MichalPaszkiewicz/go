function getAdjacentValues(x, y)
{
	var adjacentValues = [];
	for(var i = -1; i < 2; i += 2)
	{
		var a = x + i;
		var b = y + i;
		addToArray(adjacentValues, a, y);
		addToArray(adjacentValues, x, b);
	}
	return adjacentValues;
}

function getAdjacentNonZeroValues(x, y)
{
	var adjacentValues = [];
	for(var i = -1; i < 2; i += 2)
	{
		var a = x + i;
		var b = y + i;
		
		if(isOutOfBounds(a, y))
		{
			addToArray(adjacentValues, a, y);
		}
		else if(array[a][y] != 0)
		{
			addToArray(adjacentValues, a, y);			
		}
		
		if(isOutOfBounds(x, b))
		{
			addToArray(adjacentValues, x, b);
		}
		else if(array[x][b] != 0)
		{
			addToArray(adjacentValues, x, b);
		}
	}
	
	return adjacentValues;
}

function getAdjacentNonZeroValuesCount(x, y)
{
	return getAdjacentNonZeroValues(x, y).length;
}

function isOutOfBounds(x, y)
{
    var result = x < 0 || y < 0 || x >= size || y >= size;

    return result;
}

function addToArray(adjacentArray, x, y)
{
    if (isOutOfBounds(x, y)) {
        adjacentArray.push({ xPos: x, yPos: y, val: "OUT_OF_BOUND" });
    }
    else
    {
        adjacentArray.push({ xPos: x, yPos: y, val: array[x][y] });
    }

    return adjacentArray;
}

function addToArrayWithVal(adjacentArray, x, y, value)
{
    if (isOutOfBounds(x, y)) {
        adjacentArray.push({ xPos: x, yPos: y, val: "OUT_OF_BOUND" });
    }
    else {
        if(array[x][y] == value)
        {
            adjacentArray.push({ xPos: x, yPos: y, val: array[x][y] });
        }
    }

    return adjacentArray;
}

function getAdjacentWithValue(x, y, value)
{
	var adjacentWithValue = [];
	for(var i = -1; i < 2; i += 2)
	{
		var a = x + i;
		var b = y + i;
		    addToArrayWithVal(adjacentWithValue, a, y, value);
		    addToArrayWithVal(adjacentWithValue, x, b, value);
	}
	return adjacentWithValue;
}

function addToArrayWithExactVal(adjacentArray, x, y, value)
{
    if (isOutOfBounds(x, y)) {
        return adjacentArray;
    }
    else {
        if(array[x][y] == value)
        {
            adjacentArray.push({ xPos: x, yPos: y, val: array[x][y] });
        }
    }

    return adjacentArray;
}

function getAdjacentWithExactValue(x, y, value)
{
	var adjacentWithValue = [];
	for(var i = -1; i < 2; i += 2)
	{
		var a = x + i;
		var b = y + i;
		    addToArrayWithExactVal(adjacentWithValue, a, y, value);
		    addToArrayWithExactVal(adjacentWithValue, x, b, value);
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

function getLegalMoves(colour)
{
    var legalMoveArray = [];

    for(var i = 0; i < size ; i++)
    {
        for(var j = 0; j < size; j++)
        {
            if(canMove(i, j, colour))
            {
                legalMoveArray.push({ xPos : i, yPos : j});
            }
        }
    }

    return legalMoveArray;
}

function getScoresFromArray(legalMoveArray)
{
    var arrayLength = legalMoveArray.length;

    for(var i = 0; i < arrayLength; i++)
    {
        legalMoveArray[i].score = calculateScore(legalMoveArray[i].xPos, legalMoveArray[i].yPos);
    }

    return legalMoveArray;
}

function calculateMoveScore(x, y, colour)
{
    var tempArray = array;

    addMove(x, y, colour);

    var result = calculateScore();

    array = tempArray;

    return result;
}

function calculateScore()
{
    //todo: calculate the score on the board.
    return 0;
}