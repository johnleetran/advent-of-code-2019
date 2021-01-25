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

function reduceFraction(numerator, demonitator){
    let gcd = GCD(numerator, demonitator)
    return {
        numerator: numerator / gcd,
        demonitator: demonitator / gcd
    }
}

function inputToMatrix(data){
    let matrix = []
    for(let i=0; i<data.length; i++){
        let m = dataArray[i].split("")
        matrix.push(m)
    }
    return matrix
}

function isValidPosition(matrix, x, y){
    return (x >= 0 && x < matrix.length && y >=0 && y<matrix[0].length)
}

function getAstroidSeen(astroidMap, oriX, oriY){
    let astroids = {}

    for (let row = 0; row < astroidMap.length; row++){
        for (let col = 0; col < astroidMap[0].length; col++){
            if (row == oriX && col == oriY){
                continue
            }
            if (isValidPosition(astroidMap, row, col) &&
                    astroidMap[row][col] == '#') {
                let y0 = col
                let y1 = oriY
                let x0 = row;
                let x1 = oriX;
                let Y = y1 - y0;
                let X = x1 - x0;

                let S = Y / X;
                let fraction = reduceFraction(Y, X);
                let key = `${fraction.numerator}/${fraction.demonitator}`
                if (!(key in astroids)){
                    //astroids[key] = [row, col];
                    astroids[key] = 1
                }else{
                    astroids[key] += 1
                }
            }
        }
    }
    return astroids
}

let astroidMap = inputToMatrix(dataArray)
let astroidSeenLog = []
for (let row = 0; row < astroidMap.length; row++){
    for(let col=0; col<astroidMap[0].length; col++){
        if (astroidMap[row][col] == '#'){
            let astro = getAstroidSeen(astroidMap, row, col)
            astroidSeenLog.push({ x: row, y: col, numSeen: Object.keys(astro).length, astro: astro })
        }
    }
}
//console.log(astroidSeenLog)
//let s = getAstroidSeen(astroidMap, slopes, 0, 1)
//console.log(s, Object.keys(s).length)

let max = -Infinity
let bestAstroid = null
for (let a of astroidSeenLog){
    if (a.numSeen > max){
        max = a.numSeen
        bestAstroid = a;
    }
}
//console.table(astroidMap)
console.log(max, bestAstroid)
//273 too low
//272 too low
//console.table(astroidMap)

//answer
// 280 asteroids visible from 20, 18
// #200: firing at theta - 0.825377, destroyed 7, 6