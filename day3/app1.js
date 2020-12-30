let fs = require('fs')

let data = fs.readFileSync("./input.txt", "utf8");
let dataArray = data.split("\n");

function parseDirection(data){
    let dir = data[0];
    let amount = data.split("").slice(1, data.length).join("")
    return {
        dir: dir,
        amount: +amount
    }
}

let wirePath = {};
let crossed = [];

for(let i=0; i<dataArray.length; i++){
    let line = dataArray[i].split(",")
    let x = 0;
    let y = 0;
    let isOrigin = true;
    for(let j=0; j<line.length; j++){
        let d = parseDirection(line[j])
        let prevX = x;
        let prevY = y;
        switch(d.dir){
            case 'R':
                x += d.amount
                for(let k=prevX; k<x; k++){
                    let key = `${k},${y}`
                    if (key in wirePath && wirePath[key] != i && !isOrigin){
                        crossed.push([k,y]);
                    }
                    wirePath[key] = i
                }
                break;
            case 'L':
                x -= d.amount
                for (let k = prevX; k > x; k--) {
                    let key = `${k},${y}`
                    if (key in wirePath && wirePath[key] != i && !isOrigin) {
                        crossed.push([k, y]);
                    }
                    wirePath[key] = i
                }
                break;
            case 'U':
                y += d.amount
                for (let k = prevY; k < y; k++) {
                    let key = `${x},${k}`
                    if (key in wirePath && wirePath[key] != i && !isOrigin) {
                        crossed.push([x, k]);
                    }
                    wirePath[key] = i
                }
                break;
            case 'D':
                y -= d.amount
                for (let k = prevY; k > y; k--) {
                    let key = `${x},${k}`
                    if (key in wirePath && wirePath[key] != i && !isOrigin) {
                        crossed.push([x, k]);
                    }
                    wirePath[key] = i
                }
                break;
            default:
                console.log("bad parsing", d)
                process.exit(1)
        }
        isOrigin = false;

    }
    //wires[i] = x + y
}

console.table(crossed)
let minDistance = Infinity
for(let c of crossed){
    let distance = Math.abs(c[0]) + Math.abs(c[1])
    if(distance < minDistance){
        minDistance = distance
    }
}
console.log(minDistance)