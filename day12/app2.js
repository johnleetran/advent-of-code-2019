let fs = require('fs')
let crypto = require('crypto');

let data = fs.readFileSync("./input.txt", "utf8");
let dataArray = data.split("\n")

class Moon {
    constructor(x, y, z, dx, dy, dz) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.dx = dx || 0;
        this.dy = dy || 0;
        this.dz = dz || 0;
    }
}

function parseInput(dataArray) {
    let moons = [];
    for (let data of dataArray) {
        let d = data.replace("<", "").replace(">", "").split(",").join("").split("=").join("").split(/[a-z]/g)
        let m = new Moon(+d[1], +d[2], +d[3])
        moons.push(m)
    }
    return moons;
}

function calculateNewPosition(moon) {
    moon.x = moon.x + moon.dx;
    moon.y = moon.y + moon.dy;
    moon.z = moon.z + moon.dz;
}

function deepCopy(src) {
    return JSON.parse(JSON.stringify(src));
}

function calculateTotalEnergy(moons) {
    let sum = 0;
    for (let m of moons) {
        let pe = Math.abs(m.x) + Math.abs(m.y) + Math.abs(m.z)
        let ke = Math.abs(m.dx) + Math.abs(m.dy) + Math.abs(m.dz)
        sum += (pe * ke)
    }
    return sum
}

function applyGravityHelper(m1, m2) {
    if (m1.x != m2.x) {
        m1.dx += (m1.x < m2.x) ? 1 : -1
    }

    if (m1.y != m2.y) {
        m1.dy += (m1.y < m2.y) ? 1 : -1
    }

    if (m1.z != m2.z) {
        m1.dz += (m1.z < m2.z) ? 1 : -1
    }
}

function applyGravity(moon1, moon2) {
    applyGravityHelper(moon1, moon2)
    applyGravityHelper(moon2, moon1)
}

function timeStep(moons) {
    for (let i = 0; i < moons.length - 1; i++) {
        for (let j = i + 1; j < moons.length; j++) {
            let moon1 = moons[i];
            let moon2 = moons[j]
            applyGravity(moon1, moon2)
        }
    }

    for (let i = 0; i < moons.length; i++) {
        calculateNewPosition(moons[i])
    }
}

function saveMoons(history, moons){
    let dataX = JSON.stringify(moons.map((d) => { return {x: d.x, dx: d.dx }}))
    let dataY = JSON.stringify(moons.map((d) => { return { y: d.y, dy: d.dy } }))
    let dataZ = JSON.stringify(moons.map((d) => { return { z: d.z, dz: d.dz } }))

    let keyX = crypto.createHash('md5').update(dataX).digest("hex");
    let keyY = crypto.createHash('md5').update(dataY).digest("hex");
    let keyZ = crypto.createHash('md5').update(dataZ).digest("hex");

    history[keyX] = true;
    history[keyY] = true;
    history[keyZ] = true;

}

function didXexistedBefore(history, moons){
    let data = JSON.stringify(moons.map((d) => { return { x: d.x, dx: d.dx } }))
    let key = crypto.createHash('md5').update(data).digest("hex");
    return history[key]
}

function didYexistedBefore(history, moons) {
    let data = JSON.stringify(moons.map((d) => { return { y: d.y, dy: d.dy } }))
    let key = crypto.createHash('md5').update(data).digest("hex");
    return history[key]
}

function didZexistedBefore(history, moons) {
    let data = JSON.stringify(moons.map((d) => { return { z: d.z, dz: d.dz } }))
    let key = crypto.createHash('md5').update(data).digest("hex");
    return history[key]
}


function GCD(x, y) {
    if ((typeof x !== 'number') || (typeof y !== 'number'))
        return false;
    x = Math.abs(x);
    y = Math.abs(y);
    while (y) {
        var t = y;
        y = x % y;
        x = t;
    }
    return x;
}

let moons = parseInput(dataArray)
let history = {};
let x = null;
let y = null;
let z = null;

for (let i = 0; true; i++) {
    timeStep(moons)
    if (didXexistedBefore(history, moons) && x == null){
        console.log(`Step ${i}: X`)
        x = i;
    }
    if (didYexistedBefore(history, moons) && y == null) {
        console.log(`Step ${i}: Y`)
        y = i;
    }
    if (didZexistedBefore(history, moons) && z == null) {
        console.log(`Step ${i}: Z`)
        z = i;
    }
    if(x && y && z){
        break;
    }
    saveMoons(history, moons)
}

let xy = (x * y) / GCD(x, y)
let xyz = (xy * z) / GCD(xy, z)

console.log(xyz)
