let fs = require('fs')

let data = fs.readFileSync("./input.txt", "utf8");
let dataArray = data.split("\n").map(x => +x);

let sum = 0;
for (let d of dataArray) {
    let fuelAmount = Math.floor(d / 3) - 2
    let tmpAmount = fuelAmount
    let extraFuel = 0;
    while (tmpAmount > 0){
        let t = Math.floor(tmpAmount / 3) - 2
        if(t > 0)
            extraFuel += t;

        tmpAmount = t;
        console.log(tmpAmount)
    }
    sum += fuelAmount + extraFuel;
}

console.log(sum)