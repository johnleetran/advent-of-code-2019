let fs = require('fs')

let data1 = fs.readFileSync("./input.txt", "utf8");
let dataArray1 = data1.split(",")

let intCode = require("./intcode")

let row = 44;
let col = 44;
let grid = new Array(col).fill(' ').map(() => new Array(row).fill(' '));

dataArray1[0] = 2;
data1 = dataArray1.join(",");
let computer = new intCode(data1)

let count = 0;
let x = 0;
let y = 0;
let tileId = 0;
let input = 0

let ballPos = 0;
let paddlePos = 0;

while (!computer.mustHalt) {
    const instruction = computer.executeInstruction(input);

    if (instruction !== null) {
        if(count == 0){
            x = instruction
        }else if(count == 1){
            y = instruction;
        }else if(count == 2){
            tileId = instruction
            console.log("x:", x, "y:", y, "tileId:", tileId)
            if(x == -1 && y == 0){
                console.log("score:", tileId)
            }else{
                if (tileId == 3){
                    paddlePos = x
                }else if(tileId == 4){
                    ballPos = x;
                }
                if (paddlePos < ballPos){
                    input = 1
                }else if(paddlePos > ballPos){
                    input = -1
                } else if (paddlePos == ballPos){
                    input = 0;
                }
            }
        }
        count = (count + 1) % 3;
    }
}
