let fs = require('fs')

let data1 = fs.readFileSync("./input.txt", "utf8");
let dataArray1 = data1.split(",").map(x => +x);

class Boost {
    constructor(dataArray, testMode){
        this.output = null;
        this.isHalt = false;
        this.index = 0;
        this.dataArray = JSON.parse(JSON.stringify(dataArray))
        this.base = 0;
        this.testMode = testMode || false;
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

            if(C == 2){
                valueA = this.dataArray[posA + this.base]
            }

            if (opcode == 1) {
                answer = valueA + valueB
                this.dataArray[posAnswer] = answer
                this.index += 4;
            }
            else if (opcode == 2) {
                answer = valueA * valueB
                if (answer == 0){
                    console.log()
                }
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
                let memoryLocation = posAnswer
                this.dataArray[memoryLocation] = input[0];
                this.index += 2;

            }
            else if (opcode == 4) {
                //console.log("output:", valueA)
                this.output = valueA;
                this.index += 2;
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
                if(isInit){
                    this.isHalt = false;
                }else{
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
    


let boost = new Boost(dataArray1, true)
boost.run([1], false)
//console.log(boost.dataArray)
console.log("signal:", boost.output)
//203 too low
//209 too low
// 2621363025 too high

//answers
//2494485073,
//44997,
//
