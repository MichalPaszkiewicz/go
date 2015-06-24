module Go {

    // attach the .equals method to Array's prototype to call it on any array
    export function arraysEqual(targetArray: number[][], otherArray: number[][]) {
        // if the other array is a falsy value, return
        if (!targetArray || !otherArray) {
            throw new Error("One of the arrays is empty");
            return false;
        }

        // compare lengths - can save a lot of time 
        if (otherArray.length != targetArray.length) {
            return false;
        }

        for (var i = 0; i < otherArray.length; i++) {
           
            for (var j = 0; j < otherArray[i].length; j++) {
                if (targetArray[i][j] != otherArray[i][j]) {
                    return false;
                }
            }

        }
        return true;
    }   

    // set array to equal array properly.
    export function copyFrom(fromArray: number[][]): number[][] {
        // if the other array is a falsy value, return
        if (!fromArray || fromArray.length < 1) {
            return [];
        }

        var toArray = [];

        for (var i = 0; i < fromArray.length; i++) {
            toArray.push([]);
        } 

        for (var i = 0; i < fromArray.length; i++) {
            for (var j = 0; j < fromArray[i].length; j++) {
                toArray[i][j] = fromArray[i][j];
            }
        }
        return toArray;
    }

}