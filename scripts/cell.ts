module Go{

    export class Cell{

        equalTo(otherCell: Cell) {
            return this.x == otherCell.x && this.y == otherCell.y && this.value == otherCell.value;
        }

        constructor(public x: number, public y: number, public value: Value){


        }

    }

} 