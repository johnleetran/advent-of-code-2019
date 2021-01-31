let fs = require('fs')

let data = fs.readFileSync("./input.txt", "utf8");
let dataArray = data.split("\n")

class Moon{
    constructor(x, y, z, dx, dy, dz){
        this.x = x;
        this.y = y;
        this.z = z;
        this.dx = dx || 0;
        this.dy = dy || 0;
        this.dz = dz || 0;
    }
}

function parseInput(dataArray){
    let moons = [];
    for(let data of dataArray){
        let d = data.replace("<", "").replace(">", "").split(",").join("").split("=").join("").split(/[a-z]/g)
        let m = new Moon( +d[1], +d[2], +d[3])
        moons.push(m)
    }
    return moons;
}

function calculateNewPosition(moon){
    moon.x = moon.x + moon.dx;
    moon.y = moon.y + moon.dy;
    moon.z = moon.z + moon.dz;
}

function deepCopy(src){
    return JSON.parse(JSON.stringify(src));
}

function calculateTotalEnergy(moons){
    let sum = 0;
    for(let m of moons){
        let pe = Math.abs(m.x) + Math.abs(m.y) + Math.abs(m.z)
        let ke = Math.abs(m.dx) + Math.abs(m.dy) + Math.abs(m.dz)
        sum += (pe * ke)
    }
    return sum
}

function applyGravityHelper(m1, m2){
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

function applyGravity(moon1, moon2){
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


let moons  = parseInput(dataArray)
console.log("Step 0:")
console.log(moons)
for(let i=1; i<=1000; i++){
    timeStep(moons)
    console.log(`Step ${i}:`)
    console.log(moons)
}

let totalEnergy = calculateTotalEnergy(moons)
console.log(totalEnergy)

