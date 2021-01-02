let fs = require('fs')

let data1 = fs.readFileSync("./input.txt", "utf8");
let dataArray1 = data1.split(",").map(x => +x);

function intCodeProgram(input1, input2, dataArray){
    let i = 0;
    let output = 0;
    while (i < Object.keys(dataArray).length) {
        //console.table(dataArray)

        let opcodeRaw = dataArray[i]
        let expanedOpcode = String(opcodeRaw).padStart(5, 0)
        let opcode = +(expanedOpcode.split("").slice(3, expanedOpcode.length).join(""));
        //console.log(opcode)

        let A = +expanedOpcode[0]
        let B = +expanedOpcode[1]
        let C = +expanedOpcode[2]
        let posA = dataArray[i + 1]
        let posB = dataArray[i + 2]
        let posAnswer = dataArray[i + 3]

        let answer = 0;
        let valueA = dataArray[posA];
        let valueB = dataArray[posB];

        if (A == 1) {
            posAnswer = dataArray[i + 3]
        }
        if (B == 1) {
            valueB = posB
        }
        if (C == 1) {
            valueA = posA
        }
        if (opcode == 1) {
            answer = valueA + valueB
            dataArray[posAnswer] = answer
            i += 4;
        }
        else if (opcode == 2) {
            answer = valueA * valueB
            dataArray[posAnswer] = answer
            i += 4;
        } else if (opcode == 3) {
            let localInput = input1;
            if (input1 == Infinity){
                localInput = input2
            }
            let memoryLocation = dataArray[i + 1]
            dataArray[memoryLocation] = localInput;
            input1 = Infinity
            i += 2;
        }
        else if (opcode == 4) {
            //console.log("output:", valueA)
            output = valueA;
            i += 2;
        }
        else if (opcode == 5) {
            //console.log("JNZ")
            if (valueA != 0) {
                //console.log("JNZ", valueB)
                i = valueB;
            } else {
                i += 3
            }
        }
        else if (opcode == 6) {
            if (valueA == 0) {
                i = valueB;
            } else {
                i += 3
            }
        }
        else if (opcode == 7) {
            if (valueA < valueB) {
                dataArray[posAnswer] = 1
            } else {
                dataArray[posAnswer] = 0;
            }
            i += 4;
        }
        else if (opcode == 8) {
            if (valueA == valueB) {
                dataArray[posAnswer] = 1
            } else {
                dataArray[posAnswer] = 0;
            }
            i += 4;
        }
        else if (opcode == 99) {
            //console.log("opcode 99 - exiting")
            return output;
        } else {
            console.error("bad parsing")
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

let perms = permuation([0,1,2,3,4])
let overallOutput = []
for(let perm of perms){
    let output = null;
    let inputVal = 0;
    let d = JSON.parse(JSON.stringify(dataArray1))
    for (let p of perm){
        d = JSON.parse(JSON.stringify(d))
        inputVal = intCodeProgram(p, inputVal, d)
    }
    console.log(`results for ${perm.join("")}:`, inputVal)
    overallOutput.push(inputVal)
}
console.log("max: ", Math.max(...overallOutput) )


// let d = JSON.parse(JSON.stringify(dataArray1));
// //intCodeProgram(0, d)
// o = intCodeProgram(0, 0, d)

// d = JSON.parse(JSON.stringify(dataArray1));
// o = intCodeProgram(1, o, d)

// console.log(o)