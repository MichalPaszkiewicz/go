function getAdjacentValues(x, y)
{
	var adjacentValues = [];
	for(var i = -1; i < 2; i += 2)
	{
		var a = x + i;
		var b = y + i;
		adjacentValues.push({ xPos : a, yPos : y, val : array[a][y]});
		adjacentValues.push({ xPos : x, yPos : b, val : array[x][b]});
	}
	return adjacentValues;
}

function getAdjacentWithValue(x, y, value)
{
	var adjacentWithValue = [];
	for(var i = -1; i < 2; i += 2)
	{
		var a = x + i;
		var b = y + i;
		if(array[a][y] == value)
		{
			adjacentWithValue.push({ xPos : a, yPos : y, val : array[a][y]});
		}
		if(array[x][b] == value)
		{
			adjacentWithValue.push({ xPos : x, yPos : b, val : array[x][b]});
		}
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
