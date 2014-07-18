var array = [];
vWhite = 1;
vBlack = 2;
var size = 10;

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






















