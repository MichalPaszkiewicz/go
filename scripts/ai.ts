module Go {

    export function getLegalMoves(): Cell[] {
        var array = GameService.Instance.board;
        var value = GameService.Instance.Colour;

        var emptyCells = getCellsWithValue(array, Value.EMPTY);

        var legalMoves = [];

        for (var i = 0; i < emptyCells.length; i++) {
            if (canMove(array, emptyCells[i].x, emptyCells[i].y, value)) {
                legalMoves.push(emptyCells[i]);
            }
        }

        return legalMoves;
    }

    export function aiMove() {
        var aiPlayer = PlayerService.Instance.otherPlayer();
        var legalMoves = getLegalMoves();

        var i = Math.floor(legalMoves.length * Math.random());

        var x = legalMoves[i].x;
        var y = legalMoves[i].y;

        addMove(x, y, aiPlayer);


        if ($('#IsUserAI').is(':checked')) {
            autoMove();
        }
    }


}