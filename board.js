//set up settings
var array = [];
vWhite = 1;
vBlack = 2;
var size = 11;

var host = 0;
var gameMode = "online";

var player = vWhite;
var currentTurn = vWhite;

//store slightly old values
var OldArray-1 = [];
var OldArray-2 = [];
var OldMove-1 = [];
var OldMove-2 = [];

function switchTurn()
{
	currentTurn = otherValue(currentTurn);
}

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

function initiateArray()
{
	array = [];
	createArray();
	setArray();
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
	console.log("y");
	console.log(" |\\");
	for(var i = size - 1; i > -1; i--)
	{
		var newString = i + "|  ";
		for(var j = 0; j < size; j++)
		{
			newString += " " + array[j][i];
		}	
		console.log(newString);
	}
	console.log("   -----------------------> x");
}






















