let fs = require('fs')

let data = fs.readFileSync("./input.txt", "utf8");
let dataArray = data.split("\n");

function parseDirection(data) {
    let dir = data[0];
    let amount = data.split("").slice(1, data.length).join("")
    return {
        dir: dir,
        amount: +amount
    }
}

function solve(d){
    let wirePath = {};
    let crossed = [];

    for (let i = 0; i < d.length; i++) {
        let line = d[i].split(",")
        let x = 0;
        let y = 0;
        let isOrigin = false;
        let steps = 0;
        for (let j = 0; j < line.length; j++) {
            let d = parseDirection(line[j])
            let prevX = x;
            let prevY = y;
            switch (d.dir) {
                case 'R':
                    x += d.amount
                    for (let k = prevX; k < x; k++) {
                        let key = `${k},${y}`
                        if (key in wirePath && wirePath[key] != i && !isOrigin) {
                            crossed.push([k, y, steps, d]);
                        }
                        wirePath[key] = i
                        steps += 1
                    }
                    break;
                case 'L':
                    x -= d.amount
                    for (let k = prevX; k > x; k--) {
                        let key = `${k},${y}`
                        if (key in wirePath && wirePath[key] != i && !isOrigin) {
                            crossed.push([k, y, steps, d]);
                        }
                        wirePath[key] = i
                        steps += 1
                    }
                    break;
                case 'U':
                    y += d.amount
                    for (let k = prevY; k < y; k++) {
                        let key = `${x},${k}`
                        if (key in wirePath && wirePath[key] != i && !isOrigin) {
                            crossed.push([x, k, steps, d]);
                        }
                        wirePath[key] = i
                        steps += 1
                    }
                    break;
                case 'D':
                    y -= d.amount
                    for (let k = prevY; k > y; k--) {
                        let key = `${x},${k}`
                        if (key in wirePath && wirePath[key] != i && !isOrigin) {
                            crossed.push([x, k, steps, d]);
                        }
                        wirePath[key] = i
                        steps += 1
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
    return crossed;
}

let c1 = solve(dataArray);
let c2 = solve(dataArray.reverse());
console.table(c1.sort((a, b) => {
    if (a[0] == b[0]) {
        return a[1] - b[1]
    }
    return a[0] - b[0]
}))
console.table(c2.sort((a, b) => { 
    if(a[0] == b[0]){
        return a[1] - b[1]
    }
    return a[0] - b[0] 
}))

let stepsMap1 = new Map();
for(let i=0; i<c1.length; i++){
    let key = `${c1[i][0]},${c1[i][1]}`
    if (key == '0,0'){
        continue
    }
    if(!stepsMap1.has(key)){
        stepsMap1.set(key, c1[i][2])
    }
}

let stepsMap2 = new Map();
for (let i = 0; i < c2.length; i++) {
    let key = `${c2[i][0]},${c2[i][1]}`
    if (!stepsMap2.has(key)) {
        stepsMap2.set(key, c2[i][2])
    }
}

let min = Infinity
for(let key of stepsMap2.keys()){
    if (stepsMap1.has(key)){
        let steps = stepsMap1.get(key) + stepsMap2.get(key)
        if (steps < min) {
            min = steps
        }
    }

}

console.log(min)
