module Go {

    export class PlayerService {

        private static _instance: PlayerService;

        static get Instance(): PlayerService {
            if (!PlayerService._instance) {
                PlayerService._instance = new PlayerService();
            }
            return PlayerService._instance;
        }

        player: Value;

        setWhite() {
            this.player = Value.PLAYER_1;
        }

        setBlack() {
            this.player = Value.PLAYER_2;
        }

        switchSides() {
            this.player = otherValue(this.player);
        }

        otherPlayer(): Value {
            if (this.player == Value.PLAYER_1) {
                return Value.PLAYER_2;
            }
            return Value.PLAYER_1;
        }

        constructor() {
            this.player = Value.PLAYER_1;
        }

    }

} 