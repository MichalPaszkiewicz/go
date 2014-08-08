//for testing single take
function createAlmostTaker() {
    createArray();
    setArray();
    addMove(5, 5, 1);
    addMove(6, 5, 2);
    addMove(4, 5, 2);
    addMove(5, 4, 2);
    logArray(array);
}

//for testing line
function createLineTake(){
	createArray();
	setArray();
	addMove(5, 5, 1);
	addMove(5, 6, 1);
	addMove(5, 7, 1);
	addMove(6, 7, 1);
	addMove(4, 5, 2);
	addMove(5, 4, 2);
	addMove(6, 5, 2);
	addMove(4, 6, 2);
	addMove(4, 7, 2);
	addMove(5, 8, 2);
	addMove(6, 8, 2);
	addMove(7, 7, 2);
	logArray(array);
	
	//next move: 6,6,2
}

function addBlackPiece(x,y)
{
	addMove(x,y,2);
	logArray(array);
}

function Main()
{
	createLineTake();
	addBlackPiece(6,6);
}
