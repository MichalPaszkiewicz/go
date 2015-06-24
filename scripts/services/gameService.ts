/// <reference path="../values.ts" />
module Go {

    export enum GameMode {
        Local,
        Online,
        AI
    }

    export class GameService {

        private static _instance: GameService;

        private _colour: Value;

        get Colour(){
            return this._colour;
        }

        static get Instance(): GameService {
            if (!GameService._instance) {
                GameService._instance = new GameService();
            }
            return GameService._instance;
        }

        isHost: boolean;
        gameMode: GameMode;
        board: number[][];

        newGame(size: number) {
            this._colour = Value.PLAYER_1;

            MemoryService.Instance.clearHistory();

            this.board = [];
            for (var i = 0; i < size; i++) {

                this.board.push([]);

                for (var j = 0; j < size; j++) {
                    this.board[i][j] = Value.EMPTY;
                }
            }
        }

        setColour(val: Value) {
            this._colour = val;
        }

        switchColour() {
            this._colour = otherValue(this._colour);
        }

        constructor() {
            this.gameMode = GameMode.Local;
            this._colour = Value.PLAYER_1;
        }

    }

} 