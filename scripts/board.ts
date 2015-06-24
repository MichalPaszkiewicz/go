module Go {
    export function logArray(targetArray: number[][]): void {
        console.log("y");
        console.log(" |\\");
        for (var i = targetArray.length - 1; i > -1; i--) {
            var newString = i + "|  ";
            for (var j = 0; j < targetArray[i].length; j++) {
                newString += " " + targetArray[j][i];
            }
            console.log(newString);
        }
        console.log("   -----------------------> x");
    }
}




















