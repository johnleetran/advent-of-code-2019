
let fs = require('fs')

let data = fs.readFileSync("./input.txt", "utf8");
let dataArray = data.split("\n");

const { Graph, DirectedGraph } = require('@datastructures-js/graph');
let graph = new DirectedGraph();

function parseData(d){
    let line = d.split(")")
    let mass = line[0];
    let orbiter = line[1]
    return {
        mass: mass,
        orbiter: orbiter
    };
}

let particals = new Set();
for(let d of dataArray){
    let system = parseData(d);

    //keep track of number particals
    particals.add(system.mass)
    particals.add(system.orbiter)

    //add particals to graph
    graph.addVertex(system.mass, system.mass)
    graph.addVertex(system.orbiter, system.orbiter)
    
    //add edge to graph 
    graph.addEdge(system.orbiter, system.mass, 0)
}

let countOrbits = 0;
for(let particle of particals.values()){
    graph.traverseDfs(particle, (v) => {
        if (particle != v.getKey()){
            console.log(`${v.getKey()}:${v.getValue()}`)
            countOrbits += 1;
        }
    });
}
console.log(countOrbits)

