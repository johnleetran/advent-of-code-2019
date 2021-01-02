let fs = require('fs')

let data1 = fs.readFileSync("./input.txt", "utf8");
let dataArray1 = data1.split(",").map(x => +x);

class Amplifier {
    constructor(dataArray){
        this.output = null;
        this.isHalt = false;
        this.index = 0;
        this.dataArray = JSON.parse(JSON.stringify(dataArray))
    }

    intCodeProgram(input, isInit) {
        while (this.index < Object.keys(this.dataArray).length) {
            //console.table(this.dataArray)
            let opcodeRaw = this.dataArray[this.index]
            let expanedOpcode = String(opcodeRaw).padStart(5, 0)
            let opcode = +(expanedOpcode.split("").slice(3, expanedOpcode.length).join(""));
            //console.log(opcode)

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
                posAnswer = this.dataArray[this.index + 3]
            }
            if (B == 1) {
                valueB = posB
            }
            if (C == 1) {
                valueA = posA
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
                if (isInit) {
                    let l = input[0];
                    input.shift();
                    let memoryLocation = this.dataArray[this.index + 1]
                    this.dataArray[memoryLocation] = l;
                } else {
                    let memoryLocation = this.dataArray[this.index + 1]
                    this.dataArray[memoryLocation ] = input[0];
                }
                this.index += 2;
            }
            else if (opcode == 4) {
                //console.log("output:", valueA)
                this.output = valueA;
                this.index += 2;
                return this.index;
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
    
function swap(a, i, j) {
    let tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
}
function permuationHelper(array, startIndex, out) {
    if (startIndex == array.length) {
        out.push([...array])
        return
    }
    for (let i = startIndex; i < array.length; i++) {
        swap(array, startIndex, i)
        permuationHelper(array, startIndex + 1, out)
        swap(array, startIndex, i)
    }
}

function permuation(array) {
    let out = []
    permuationHelper(array, 0, out)
    return out;
}

// let perms = permuation([5,6,7,8,9])
// let overallOutput = []
// for (let perm of perms) {
//     let output = null;
//     let inputVal = 0;
//     let d = JSON.parse(JSON.stringify(dataArray1))
//     for (let p of perm) {
//         let amp = new Amplifier(d)
//         amp.intCodeProgram([p, inputVal], true)
//         inputVal = amp.output;
//     }
//     console.log(`results for ${perm.join("")}:`, inputVal)
//     overallOutput.push(inputVal)
// }
// console.log("max: ", Math.max(...overallOutput))

let perms = permuation([5,6,7,8,9])
let overallOutput = []



// d = JSON.parse(JSON.stringify(dataArray1));
for (let p of perms) {
    let isInit = true;
    let d = JSON.parse(JSON.stringify(dataArray1));
    let ampA = new Amplifier(d)
    let ampB = new Amplifier(d)
    let ampC = new Amplifier(d)
    let ampD = new Amplifier(d)
    let ampE = new Amplifier(d)
    while (true) {
        if (isInit) {
            ampA.intCodeProgram([p[0], 0], isInit)
            console.log("signal:", ampA.output)

            ampB.intCodeProgram([p[1], ampA.output], isInit)
            console.log("signal:", ampB.output)

            ampC.intCodeProgram([p[2], ampB.output], isInit)
            console.log("signal:", ampC.output)

            ampD.intCodeProgram([p[3], ampC.output], isInit)
            console.log("signal:", ampD.output)

            indexA = ampE.intCodeProgram([p[4], ampD.output], isInit)
            console.log("signal:", ampE.output)
        } else {
            //ampA.dataArray = JSON.parse(JSON.stringify(d));

            ampA.intCodeProgram([ampE.output])
            console.log("signal:", ampA.output)

            ampB.intCodeProgram([ampA.output])
            console.log("signal:", ampB.output)

            ampC.intCodeProgram([ampB.output])
            console.log("signal:", ampC.output)

            ampD.intCodeProgram([ampC.output])
            console.log("signal:", ampD.output)

            ampE.intCodeProgram([ampD.output])
            console.log("signal:", ampE.output)
            overallOutput.push(ampE.output)

            if (ampE.isHalt) {
                console.log(`results for ${p.join("")}:`)
                //overallOutput.push(ampE.output)
                console.log("output", ampE.output, "ampE.isHalt:", ampE.isHalt)
                break;
            }
        }
        isInit = false;
    }

}

console.log("max: ", Math.max(...overallOutput))


