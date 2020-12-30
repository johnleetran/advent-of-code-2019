let fs = require('fs')

let data = fs.readFileSync("./input.txt", "utf8");
let d = data.split(",").map(x => +x);

for(let j=0; j<=99; j++){
    for(let k=0; k<=99; k++){
        let dataArray = JSON.parse(JSON.stringify(d))
        dataArray[1] = j
        dataArray[2] = k

        for (let i = 0; i < dataArray.length; i += 4) {
            let opcode = dataArray[i]
            let posA = dataArray[i + 1]
            let posB = dataArray[i + 2]
            let posAnswer = dataArray[i + 3]

            let answer = 0;
            if (opcode == 1) {
                answer = dataArray[posA] + dataArray[posB]
                dataArray[posAnswer] = answer
            }
            if (opcode == 2) {
                answer = dataArray[posA] * dataArray[posB]
                dataArray[posAnswer] = answer
            }
            if (opcode == 99) {
                break;
            }
        }
        //console.log(dataArray[0])
        if (dataArray[0] == 19690720){
            console.log("anser:", 100 * j + k)
            break
        }
    }
}

