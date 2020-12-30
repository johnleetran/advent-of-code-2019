// -It is a six - digit number.
// -The value is within the range given in your puzzle input.
// -Two adjacent digits are the same(like 22 in 122345).
// -Going from left to right, the digits never decrease; they only ever increase or stay the same(like 111123 or 135679).

let low = 206938
let high = 679128
let N = 6;

function isTwoAdjacentDigits(num){
    let numStr = String(num)
    let prev = numStr[0];
    for(let i=1; i<N; i++){
        let cur = numStr[i]
        if(prev == cur){
            return true
        }
        prev = cur
    }
    return false
}

function isIncreasing(num){
    let numStr = String(num)
    let prev = +numStr[0]    
    for(let i=1; i<N; i++){
        let cur = +numStr[i]
        if (prev > cur){
            return false;
        }
        prev = cur
    }
    return true;
}

let possiblePassword = 0
for(let i=low; i<=high; i++){
    if (isTwoAdjacentDigits(i) && isIncreasing(i)){
        possiblePassword += 1
        console.log(i)
    }
}

//27542 wrong too high
//1597 too low
console.log(possiblePassword)

