let fs = require('fs')

let data = fs.readFileSync("./input.txt", "utf8");
let dataArray = data.split("\n").map(x=>+x);

let sum = 0;
for(let d of dataArray){
    let fuelAmount = Math.floor(d / 3) - 2
    sum += fuelAmount
}

console.log(sum)