/// <reference path="extensions.ts" />
/// <reference path="cell-finder.ts" />
/// <reference path="cell.ts" />
/// <reference path="values.ts" />
module Go {

    export function addMove(x: number, y: number, value: Value) {
        if (canMove(GameService.Instance.board, x, y, value)) {

            GameService.Instance.board[x][y] = value;
            takePieces(GameService.Instance.board, x, y, value);

            sendMove(x, y);

            MemoryService.Instance.add(copyFrom(GameService.Instance.board));

            GameService.Instance.switchColour();

            if (GameService.Instance.gameMode == GameMode.Local) {
                PlayerService.Instance.switchSides();
            }
            if (GameService.Instance.gameMode == GameMode.AI) { }
            //todo: cal ai move, but not in here..
            
        }
        else {
            return;
        }
        updateDisplay();

        if (getLegalMoves().length == 0) {
            gameOver();
        }
    }

    function removeMove(targetArray, x, y) {
        targetArray[x][y] = 0;
    }

    function passesKoRule(x, y, value) {

        var history = MemoryService.Instance.history;

        if (history.length < 3) {
            return true;
        }

        var testArray = [];
        testArray = copyFrom(GameService.Instance.board);
	
        // todo: actually needs to take pieces, otherwise this will not be getting correct latest move
        testArray[x][y] = value;
        takePieces(testArray, x, y, value);

        // passes ko rule test array not the same as last time you moved
        var result = !arraysEqual(testArray, history[history.length - 2]);// !ARRAYminus2.equals(testArray);

        return result;
    }

    export function canMove(targetArray: number[][], x: number, y: number, value: Value) {
        var isEmpty = targetArray[x][y] == 0;

        var isPlayerTurn = true;

        // only true for actual turn in game
        if (arraysEqual(GameService.Instance.board, targetArray)) {
            isPlayerTurn = (value == GameService.Instance.Colour);
        }

        var ko = passesKoRule(x, y, value);

        var willPlaceNicely = notSuicide(targetArray, x, y, value);

        return isEmpty && isPlayerTurn && ko && willPlaceNicely;
    }

    function notSuicide(targetArray: number[][], x: number, y: number, value: Value) {
        var testArray = [];
        testArray = copyFrom(targetArray);
        var noTakeArray = [];
        noTakeArray = copyFrom(targetArray);
        noTakeArray[x][y] = value;

        testArray[x][y] = value;
        takePieces(testArray, x, y, value);

        var willRemove = false
	
        // this equals is returning a bad value... seems takepieces does not work
        if (!arraysEqual(testArray, noTakeArray)) {
            willRemove = true;
        }
	
        // need to calculate whether item must remove enemy pieces.
        var mustRemovePiece = mustRemove(targetArray, x, y, value);

        if (!mustRemovePiece) {
            return true;
        }

        return willRemove;
    }

    function mustRemove(targetArray: number[][], x: number, y: number, value: Value)
    {
        var testArray = copyFrom(targetArray);
        testArray[x][y] = value;

        var cellGroup = getCellGroup(testArray, x, y);

        var emptyCount = 0;
        var enemyCount = 0;

        for (var i = 0; i < cellGroup.length; i++) {
            var adjacents = getAdjacentCells(testArray, cellGroup[i].x, cellGroup[i].y);

            for (var j = 0; j < adjacents.length; j++) {
                if (adjacents[j].value == Value.EMPTY) {
                    emptyCount++;
                }
                if (adjacents[j].value == otherValue(value)) {
                    enemyCount++;
                }
            }
        }

        return emptyCount < 1;
    }

    // need to research how, and whether this actually works. Seems to break on all but active array.
    function takePieces(targetArray: number[][], x: number, y: number, value: Value) {
        var placedValue = value;
        var enemyValue = otherValue(value);
        var adjacentEnemies = getAdjacentWithValue(targetArray, x, y, enemyValue);

        for (var i = 0; i < adjacentEnemies.length; i++) {
            var cellGroup = getCellGroup(targetArray, adjacentEnemies[i].x, adjacentEnemies[i].y);
            removeSurrounded(targetArray, cellGroup);
        }
    }

    // this now works great!
    export function getCellGroup(targetArray: number[][], x: number, y: number): Cell[] {
        var startCell = getValue(targetArray, x, y);

        var cells = [];

        var queueCells: Cell[] = [startCell];
        while (queueCells.length > 0) {
            var researchCell = queueCells.pop();
            cells.push(researchCell);
            var adjacents = getAdjacentWithValue(targetArray, researchCell.x, researchCell.y, startCell.value);

            // ensure only adjacents not already in cells or listCells.
            for (var i = 0; i < adjacents.length; i++) {
                var addCell = true;

                for (var j = 0; j < cells.length; j++) {
                    if (adjacents[i].equalTo(cells[j])) {
                        addCell = false;
                        break;
                    }
                }

                for (var j = 0; j < queueCells.length; j++) {
                    if (adjacents[i].equalTo(queueCells[j])) {
                        addCell = false;
                        break;
                    }
                }

                if (addCell) {
                    queueCells.push(adjacents[i]);
                }
            }
        }
        return cells;
    }

    function removeSurrounded(targetArray: number[][], cellGroup: Cell[]) {
        for (var i = 0; i < cellGroup.length; i++) {
            var nonZeroAdjacents = getAdjacentNonZeroValuesCount(targetArray, cellGroup[i].x, cellGroup[i].y);
            //console.log("Non zero adjacents: " + nonZeroAdjacents + " at: (" + cellGroup[i].xPos + "," + cellGroup[i].yPos + ")");
            if (nonZeroAdjacents < 4) {
                return;
            }
        }

        for (var i = 0; i < cellGroup.length; i++) {
            removeMove(targetArray, cellGroup[i].x, cellGroup[i].y);
        }
    }


}