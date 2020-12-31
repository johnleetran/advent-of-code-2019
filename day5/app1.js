let fs = require('fs')

let data = fs.readFileSync("./input.txt", "utf8");
let dataArray = data.split(",").map(x => +x);

let input = 5;
// dataArray[1] = 12
// dataArray[2] = 2

let i = 0;
// let dataArray = {}
// for(let i=0; i<dataArrayOriginal.length; i++){
//     dataArray[i] = dataArrayOriginal[i];
// }

while(i < Object.keys(dataArray).length){
//for(let i=0; i<dataArray.length; i+=4){
    let opcodeRaw = dataArray[i]
    let expanedOpcode = String(opcodeRaw).padStart(5,0)
    let opcode = +(expanedOpcode.split("").slice(3, expanedOpcode.length).join(""));
    console.log(opcode)

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
        let memoryLocation = dataArray[i + 1]
        dataArray[memoryLocation] = input;
        i += 2;
    }
    else if (opcode == 4) {
        let output = dataArray[i + 1]
        if (C == 1){
            output = valueA;
        }else{
            let memoryLocation = dataArray[i + 1]
            output = dataArray[memoryLocation]
        }
        //console.log("opcode 4: ", dataArray[memoryLocation])
        console.log("output:", output)
        i += 2;
    }
    else if(opcode == 5){
        console.log("JNZ")
        if (valueA != 0){
            console.log("JNZ", valueB)
            i = valueB;
        }else{
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
        }else{
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
        console.log("opcode 99 - exiting")
        break;
    }else{
        console.error("bad parsing")
    }
}
console.log(dataArray[0])