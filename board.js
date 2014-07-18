var array = [];
vWhite = 1;
vBlack = 2;

function otherValue(value)
{
	if(value == vWhite)
	{
		return vBlack;
	}
	else if(value == vBlack)
	{
		return vWhite;
	}
	else
	{
		return "asdasksdgfmlksdfgklmsdfgmk";
	}
}

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
	if(canMove(x,y,value))
	{
		array[x][y] = value;
		takePieces(x,y,value);
	}
	else{
		return;
	}
}

function takePieces(x,y,value)
{
	var placedValue = value;
	var enemyValue = otherValue();
	
	var adjacentEnemies = getAdjacentWithValue(x, y, enemyValue);
}

function removeMove(x, y)
{
	array[x][y] = 0;
}

//for testing purposes
function createAlmostTaker()
{
	createArray();
	setArray();
	addMove(5,5,1);
	addMove(6,5,2);
	addMove(4,5,2);
	addMove(5,4,2);
	logArray();
}





















