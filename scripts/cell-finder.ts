/// <reference path="cell.ts" />
module Go {

    export function getValue(targetArray: number[][], x: number, y: number): Cell {
        if (isOutOfBounds(targetArray, x, y)) {
            return new Cell(x, y, Value.OUT_OF_BOUNDS);
        }

        return new Cell(x, y, targetArray[x][y]);
    }

    export function getAdjacentCells(targetArray: number[][], x: number, y: number): Cell[] {
        var adjacentValues = [];

        adjacentValues.push(getValue(targetArray, x - 1, y));
        adjacentValues.push(getValue(targetArray, x + 1, y));
        adjacentValues.push(getValue(targetArray, x, y - 1));
        adjacentValues.push(getValue(targetArray, x, y + 1));

        return adjacentValues;
    }

    export function getAdjacentNonZeroCells(targetArray: number[][], x: number, y: number): Cell[] {
        var nonZeroValues = [];

        var adjacentValues = getAdjacentCells(targetArray, x, y);

        for (var i = 0; i < adjacentValues.length; i++) {
            if (adjacentValues[i].value != Value.EMPTY) {
                nonZeroValues.push(adjacentValues[i]);
            }
        }

        return nonZeroValues;
    }

    export function getAdjacentNonZeroValuesCount(targetArray: number[][], x: number, y: number): number {
        return getAdjacentNonZeroCells(targetArray, x, y).length;
    }

    export function isOutOfBounds(targetArray: number[][], x: number, y: number): boolean {
        var result = x < 0 || y < 0 || x >= targetArray.length || y >= targetArray.length;

        return result;
    }

    export function getAdjacentWithValue(targetArray: number[][], x: number, y: number, value: Value): Cell[] {
        var adjacentWithValue = [];

        var adjacent = getAdjacentCells(targetArray, x, y);

        for (var i = 0; i < adjacent.length; i++) {
            if (adjacent[i].value == value) {
                adjacentWithValue.push(adjacent[i]);
            }
        }

        return adjacentWithValue;
    }

    export function getCellsWithValue(targetArray: number[][], value: Value): Cell[] {
        var cellList = [];
        for (var x = 0; x < targetArray.length; x++) {
            for (var y = 0; y < targetArray.length; y++) {
                var cell = getValue(targetArray, x, y);
                if (cell.value == value) {
                    cellList.push(cell);
                }
            }
        }
        return cellList;
    }
}