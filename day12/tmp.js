
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



let x = 18;
let y = 28;
let z = 44

let a = (x * y) / GCD(x, y)
console.log(a)

let b = (a * z) / GCD(a, z)
console.log(b)