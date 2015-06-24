module Go {

    export enum Value {
        EMPTY,
        PLAYER_1,
        PLAYER_2,
        OUT_OF_BOUNDS,
        AAARGH_AN_ERROR
    }

    export function otherValue(value: Value) {
        if (value == Value.PLAYER_1) {
            return Value.PLAYER_2;
        }
        else if (value == Value.PLAYER_2) {
            return Value.PLAYER_1;
        }
        else {
            return Value.AAARGH_AN_ERROR;
        }
    }

} 