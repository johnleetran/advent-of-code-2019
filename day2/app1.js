let fs = require('fs')

let data = fs.readFileSync("./input.txt", "utf8");
let dataArray = data.split(",").map(x => +x);

dataArray[1] = 12
dataArray[2] = 2

for(let i=0; i<dataArray.length; i+=4){
    let opcode = dataArray[i]
    let posA = dataArray[i + 1]
    let posB = dataArray[i + 2]
    let posAnswer = dataArray[i + 3]
    
    let answer = 0;
    if(opcode == 1){
        answer = dataArray[posA] + dataArray[posB]
        dataArray[posAnswer] = answer
    }
    if (opcode == 2) {
        answer = dataArray[posA] * dataArray[posB]
        dataArray[posAnswer] = answer
    }
    if(opcode == 99){
        break;
    }
}
console.log(dataArray[0])