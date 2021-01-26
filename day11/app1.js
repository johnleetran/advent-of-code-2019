let fs = require('fs')

let data1 = fs.readFileSync("./input.txt", "utf8");
let dataArray1 = data1.split(",").map(x => +x);

class Robot {
    constructor(dataArray, testMode) {
        this.output = null;
        this.isHalt = false;
        this.index = 0;
        this.dataArray = JSON.parse(JSON.stringify(dataArray))
        this.base = 0;
        this.testMode = testMode || false;

        this.instructions = []

        this.debugCount = 0;
        this.inputs = fs.readFileSync("./out.txt", "utf8").split("\n");
    }

    run(input, isInit) {
        while (this.index < Object.keys(this.dataArray).length) {
            let opcodeRaw = this.dataArray[this.index]
            let expanedOpcode = String(opcodeRaw).padStart(5, 0)
            let opcode = +(expanedOpcode.split("").slice(3, expanedOpcode.length).join(""));

            let A = +expanedOpcode[0]
            let B = +expanedOpcode[1]
            let C = +expanedOpcode[2]
            let posA = this.dataArray[this.index + 1]
            let posB = this.dataArray[this.index + 2]
            let posAnswer = this.dataArray[this.index + 3]

            let answer = 0;
            let valueA = this.dataArray[posA];
            let valueB = this.dataArray[posB];

            if (A == 1) {
                posAnswer = posAnswer
            }
            if (B == 1) {
                valueB = posB
            }
            if (C == 1) {
                valueA = posA
            }

            if (A == 2) {
                posAnswer += this.base

            }
            if (B == 2) {
                valueB = this.dataArray[posB + this.base]
            }

            if (C == 2) {
                valueA = this.dataArray[posA + this.base]
            }

            if (opcode == 1) {
                answer = valueA + valueB
                this.dataArray[posAnswer] = answer
                this.index += 4;
            }
            else if (opcode == 2) {
                answer = valueA * valueB
                this.dataArray[posAnswer] = answer
                this.index += 4;
            } else if (opcode == 3) {
                // if (isInit) {
                //     let l = input[0];
                //     input.shift();
                //     let memoryLocation = this.dataArray[this.index + 1]
                //     this.dataArray[memoryLocation] = l;
                // } else if(this.testMode == true){
                //     let memoryLocation = this.base
                //     this.dataArray[memoryLocation] = 2;
                //     //this.testMode = false;
                // }
                // else {
                //     let memoryLocation = this.dataArray[this.index + 1]
                //     this.dataArray[memoryLocation ] = input[0];
                // }
                let memoryLocation = posA
                console.log(memoryLocation)
                this.dataArray[memoryLocation] = input[0];
                this.index += 2;

            }
            else if (opcode == 4) {
                //console.log("output:", valueA)
                this.instructions.push(valueA)
                this.output = valueA;
                this.index += 2;
                return valueA
            }
            else if (opcode == 5) {
                if (valueA != 0) {
                    this.index = valueB;
                } else {
                    this.index += 3
                }
            }
            else if (opcode == 6) {
                if (valueA == 0) {
                    this.index = valueB;
                } else {
                    this.index += 3
                }
            }
            else if (opcode == 7) {
                if (valueA < valueB) {
                    this.dataArray[posAnswer] = 1
                } else {
                    this.dataArray[posAnswer] = 0;
                }
                this.index += 4;
            }
            else if (opcode == 8) {
                if (valueA == valueB) {
                    this.dataArray[posAnswer] = 1
                } else {
                    this.dataArray[posAnswer] = 0;
                }
                this.index += 4;
            } else if (opcode == 9) {
                this.base += valueA;
                this.index += 2;
            }
            else if (opcode == 99) {
                //this.output = 
                console.log("opcode 99 - exiting", this.output)
                if (isInit) {
                    this.isHalt = false;
                } else {
                    this.isHalt = true;
                }
                this.index += 1;
                break;
            } else {
                console.error("bad parsing")
                break;
            }
        }
    }
}

function getNextPosition(row, col, direction){
    if (direction == UP){
        return { row: row - 1, col: col }
    }
    if (direction == DOWN) {
        return { row: row + 1, col: col }
    }
    if (direction == LEFT) {
        return { row: row, col: col - 1}
    }
    if (direction == RIGHT) {
        return { row: row, col: col + 1}
    }
}

function getDirection(instruction, direction){
    //turn left
    if (instruction == 0 && direction == UP){
        return LEFT
    }
    if (instruction == 0 && direction == DOWN) {
        return RIGHT
    }
    if (instruction == 0 && direction == RIGHT) {
        return UP
    }
    if (instruction == 0 && direction == LEFT) {
        return DOWN
    }

    //turn right
    if (instruction == 1 && direction == UP) {
        return RIGHT
    }
    if (instruction == 1 && direction == DOWN) {
        return LEFT
    }
    if (instruction == 1 && direction == RIGHT) {
        return DOWN
    }
    if (instruction == 1 && direction == LEFT) {
        return UP
    }

}

let UP = "UP"
let LEFT = "LEFT"
let DOWN = "DOWN"
let RIGHT = "RIGHT"

let intCode = require("./intcode") 

let direction = UP;
let row = 4500;
let col = 4500;
let grid = new Array(col * 2).fill(0).map(() => new Array(row * 2).fill(0));
let visited = {};
let paintedCount = 0;
let computer = new intCode(data1)
grid[row][col] = 0;
let count = 0;
let color = 0;
while (!computer.mustHalt) {
    const instruction = computer.executeInstruction(grid[row][col]);

    if (instruction !== null){
        if(count % 2 == 0){
            color = instruction;
        }else{
            if (visited[`${row},${col}`] != true) {
                paintedCount++;
            }
            visited[`${row},${col}`] = true;
            grid[row][col] = color;


            //next
            direction = getDirection(instruction, direction)
            let nextPos = getNextPosition(row, col, direction);
            row = nextPos.row
            col = nextPos.col
        }
        count++
    }
}


console.log(paintedCount)
//18803 too high
//236 too low
//answer 1747