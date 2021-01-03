let fs = require('fs')

let data = fs.readFileSync("./input.txt", "utf8");
let dataArray = data.split("").map(x => +x);

let width = 25
let height = 6


console.log()
let curImgagePos = 0;
let image = [];
let numOfLayers = dataArray.length / (width * height)
let numOfLayerData = (width * height)
for(let i = 0; i<numOfLayers; i++){
    let layer = []
    for(let j=0; j<numOfLayerData; j++){
        layer.push(dataArray[curImgagePos++])
    }
    image.push(layer)
}


let minZero = Infinity;
let minLayer = null;
for (let i = 0; i < numOfLayers; i++) {
    let numOfZeros = image[i].filter((x) => { return x == 0}).length
    if (numOfZeros < minZero){
        minLayer = image[i]
        console.log(numOfZeros)
        minZero = numOfZeros
    }
}

let ones = minLayer.filter((x) => { return x == 1 }).length
let twos = minLayer.filter((x) => { return x == 2 }).length

//1364 - too low
//2704 - too high
console.log(twos * ones)