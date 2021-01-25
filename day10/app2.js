let fs = require('fs')

let data = fs.readFileSync("./input.txt", "utf8");
let dataArray = data.split("\n")

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

function reduceFraction(numerator, demonitator) {
    let gcd = GCD(numerator, demonitator)
    return {
        numerator: numerator / gcd,
        demonitator: demonitator / gcd
    }
}

function inputToMatrix(data) {
    let matrix = []
    for (let i = 0; i < data.length; i++) {
        let m = dataArray[i].split("")
        matrix.push(m)
    }
    return matrix
}

function isValidPosition(matrix, x, y) {
    return (x >= 0 && x < matrix.length && y >= 0 && y < matrix[0].length)
}

function calculateAngle(Y, X) {
    let value = Math.atan2(Y, X) * 180 / Math.PI;
    if (value < 0) {
        value += 360
    }
    return value;
}

function getAstroidSeenLaserTime(astroidMap, x, y) {
    let astroids = {}

    for (let row = 0; row < astroidMap.length; row++) {
        for (let col = 0; col < astroidMap[0].length; col++) {
            if (row == y && col == x) {
                continue
            }
            if (isValidPosition(astroidMap, col, row) &&
                astroidMap[col][row] == '#') {
                let y0 = row
                let y1 = x
                let x0 = col;
                let x1 = y;
                let Y = y1 - y0;
                let X = x1 - x0;

                let gcd = GCD(Y, X);
                if (gcd < 0) {
                    gcd *= -1;
                }
                let angle = calculateAngle(-Y, X)//`${-Y / gcd},${X / gcd}`;

                let key = angle
                if (!(key in astroids)) {
                    astroids[key] = [row, col];
                } else {
                    astroids[key].push([row, col]);
                }
            }
        }
    }
    return astroids
}

let astroidMap = inputToMatrix(dataArray)
let astroidSeenLog = []
function getAstroidFunc() {
    for (let row = 0; row < astroidMap.length; row++) {
        for (let col = 0; col < astroidMap[row].length; col++) {
            if (astroidMap[row][col] == '#') {
                let astro = getAstroidSeenLaserTime(astroidMap, row, col)
                astroidSeenLog.push({ x: row, y: col, numSeen: Object.keys(astro).length, astro: astro })
            }
        }
    }
}
getAstroidFunc()

let max = -Infinity
let bestAstroid = null
for (let a of astroidSeenLog) {
    if (a.numSeen > max) {
        max = a.numSeen
        bestAstroid = a;
    }
}

//answer
// 280 asteroids visible from 20, 18
// #200: firing at theta - 0.825377, destroyed 7, 6

console.log("max seen:", max)
console.log("best x:", bestAstroid.x, "best y:", bestAstroid.y)

let laserTime = getAstroidSeenLaserTime(astroidMap, bestAstroid.x, bestAstroid.y)
//let laserTime = getAstroidSeenLaserTime(astroidMap, bestAstroid.x, bestAstroid.y)

let toSort = []
for (let [key, coords] of Object.entries(laserTime)) {
    toSort.push({ key: key, coords: JSON.stringify(coords) })
}

toSort.sort((a, b) => { return +a.key - +b.key });
let answerCoord = toSort[199]
console.log(answerCoord)
let AnsCoords = answerCoord.coords.replace("[", "").replace("]", "").split(",").map((d) => { return +d })
let answer = (100 * AnsCoords[0]) + AnsCoords[1]
console.log("answer:", answer)