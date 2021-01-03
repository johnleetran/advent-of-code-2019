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
for (let i = 0; i < numOfLayers; i++) {
    let layer = []
    for (let j = 0; j < numOfLayerData; j++) {
        layer.push(dataArray[curImgagePos++])
    }
    image.push(layer)
}

let layers = [];
for(let i=0; i<image.length; i++){
    let lay = []
    for(let j=0; j<image[i].length; j+=width){
        let l = []
        for(let k=0; k<width; k++){
            l.push(image[i][j+k])
        }
        lay.push(l)
    }
    layers.push(lay)
}
//console.log(layers)

let placeHolder = " "

const theImage = new Array(height).fill(placeHolder).map(() => new Array(width).fill(placeHolder));
for(let i=0; i<height; i++){
    for (let j = 0; j < width; j++) {
        for(let page of layers){
            if(page[i][j] == 0){
                process.stdout.write(" ")
                break
            } else if (page[i][j] == 1){
                process.stdout.write("*")
                break
            }
        }
    }
    console.log()
}
//console.log(theImage)


