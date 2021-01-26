let fs = require('fs')

let data1 = fs.readFileSync("./input.txt", "utf8");
let dataArray1 = data1.split(",").map(x => +x);

function getNextPosition(row, col, direction) {
    if (direction == UP) {
        return { row: row - 1, col: col }
    }
    if (direction == DOWN) {
        return { row: row + 1, col: col }
    }
    if (direction == LEFT) {
        return { row: row, col: col - 1 }
    }
    if (direction == RIGHT) {
        return { row: row, col: col + 1 }
    }
}

function getDirection(instruction, direction) {
    //turn left
    if (instruction == 0 && direction == UP) {
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
let row = 14;
let col = 14;
let grid = new Array(col * 2).fill(0).map(() => new Array(row * 2).fill(0));
let visited = {};
let paintedCount = 0;
let computer = new intCode(data1)
grid[row][col] = 1;
let count = 0;
let color = 0;
while (!computer.mustHalt) {
    const instruction = computer.executeInstruction(grid[row][col]);

    if (instruction !== null) {
        if (count % 2 == 0) {
            color = instruction;
        } else {
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

for(let i=0; i<grid.length; i++){
    for(let j=0; j<grid[i].length; j++){
        if (grid[i][j] == 0){
            process.stdout.write(" ")
        }else{
            process.stdout.write("x")
        }
    }
    console.log()
}

//answer 1747