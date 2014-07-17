var array = []

var size = 10;

function createArray()
{
	for(var i = 0; i < size; i++)
	{
		array.push([]);
	}	
}

function setArray()
{
	for(var i = 0; i < size; i++)
	{
		for(var j = 0; j < size; j++)
		{
			array[i][j] = 0;
		}	
	}
}

function logArray()
{
	for(var i = 0; i < size; i++)
	{
		var newString = "";
		for(var j = 0; j < size; j++)
		{
			newString += " " + array[i][j];
		}	
		console.log(newString);
	}
}

function addMove(x, y, value)
{
	array[x][y] = value;
}

function removeMove(x, y)
{
	array[x][y] = 0;
}