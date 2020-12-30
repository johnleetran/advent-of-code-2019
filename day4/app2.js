// -It is a six - digit number.
// -The value is within the range given in your puzzle input.
// -Two adjacent digits are the same(like 22 in 122345).
// -Going from left to right, the digits never decrease; they only ever increase or stay the same(like 111123 or 135679).

let low = 206938
let high = 679128
let N = 6;

function isTwoAdjacentDigits(num) {
    let numStr = String(num)
    let prev = numStr[0];
    let isGood = false;
    let map = {}
    for (let i = 1; i < N; i++) {
        let cur = numStr[i]
        if (prev == cur) {
            if(cur in map){
                map[cur] += 1
            }else{
                map[cur] = 2;
            }
        }
        prev = cur
    }

    for(let [ key, value] of Object.entries(map)){
        if (value == 2 && isGood == false){
            isGood = true
        }
    }



    return isGood
}

function isIncreasing(num) {
    let numStr = String(num)
    let prev = +numStr[0]
    for (let i = 1; i < N; i++) {
        let cur = +numStr[i]
        if (prev > cur) {
            return false;
        }
        prev = cur
    }
    return true;
}

let possiblePassword = 0
for (let i = low; i <= high; i++) {
    if (isTwoAdjacentDigits(i) && isIncreasing(i)) {
        possiblePassword += 1
    console.log(i)
    }
}
console.log(possiblePassword)

// // 783 too low
// // 833 wrong
// // 1161 wrong
// // 1186 too high
// // 1466 too high

console.log(isTwoAdjacentDigits("222444"))