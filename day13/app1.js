let fs = require('fs')

let data1 = fs.readFileSync("./input.txt", "utf8");
let dataArray1 = data1.split(",").map(x => +x);

let intCode = require("./intcode") 

let row = 44;
let col = 44;
let grid = new Array(col).fill(' ').map(() => new Array(row).fill(' '));
let computer = new intCode(data1)

let allInstructions = []

while (!computer.mustHalt) {
    const instruction = computer.executeInstruction(0);

    if (instruction !== null){
        allInstructions.push(instruction)
    }
}


let maxX = 0;
let maxY = 0
let tileMap = {
    0: ' ',
    1: '|',
    2: 'o',
    3: '-',
    4: '0'
}
for(let i=0; i<allInstructions.length; i+=3){
    let x = allInstructions[i]
    let y = allInstructions[i + 1]
    let tileId = allInstructions[i+2]
    grid[x][y] = tileMap[tileId]
    maxX = Math.max(maxX, x)
    maxY = Math.max(maxY, y)

}

let blockCount = 0;

for(let i=0; i<grid.length; i++){
    for(let j=0; j<grid[i].length; j++){
        process.stdout.write(grid[j][i])
        if (grid[j][i] == tileMap[2]){
            blockCount++;
        }
    }
    console.log()
}

console.log(maxX, maxY)
console.log(blockCount)
//304
// console.table(grid)