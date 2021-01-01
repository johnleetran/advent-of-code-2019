
let fs = require('fs')

let data = fs.readFileSync("./input.txt", "utf8");
let dataArray = data.split("\n");

class Graph {
    constructor() {
        this.adjacencyList = {};
    }

    addEdge(u, v) {
        if (u in this.adjacencyList) {
            this.adjacencyList[u].push(v);
        } else {
            this.adjacencyList[u] = [v];
        }
    }


    dfs(startIndex, visited) {
        if (visited[startIndex] == true){
            return;
        }
        if (visited[startIndex] != true) {
            console.log(startIndex)
        }

        visited[startIndex] = true;
        if (!(startIndex in this.adjacencyList)) {
            return;
        }
        for (let i = 0; i < this.adjacencyList[startIndex].length; i++) {
            if (visited[i] != true) {
                this.dfs(this.adjacencyList[startIndex][i], visited)
            }
        }
    }

    minEdgeBFS(u, v){
        let edges = this.adjacencyList;
        let visited = {};
        let distance = {};

        let queue = []; 
        distance[u] = 0;

        queue.push(u);
        visited[u] = true;

        while(queue.length > 0){
            let x = queue.shift();
            console.log(x)
            for (let i = 0; i < edges[x].length; i++){
                let edge = edges[x][i]
                if (visited[edge] == true){
                    continue;
                }
                distance[edge] = distance[x] + 1;
                queue.push(edge)
                visited[edge] = 1
            }
        }
        return distance[v];
    }

    topologicalSortHelper(key, visited, stack) {
        visited[key] = true;
        if (key in this.adjacencyList) {
            //for all neighbors
            for (let k of this.adjacencyList[key]) {
                if (visited[k] != true) {
                    this.topologicalSortHelper(k, visited, stack)
                }
            }
        }

        stack.push(key)
    }

    topologicalSort() {
        let stack = [];
        let visited = {};

        //for each key in adjList, call a helper that will go through the edges
        for (let [key, values] of Object.entries(this.adjacencyList)) {
            if (visited[key] != true) {
                this.topologicalSortHelper(key, visited, stack)
            }
        }

        return stack.reverse()
    }

    printDFS(v) {
        let visited = {}
        this.dfs(v, visited)
    }
}
let graph = new Graph();

function parseData(d) {
    let line = d.split(")")
    let mass = line[0];
    let orbiter = line[1]
    return {
        mass: mass,
        orbiter: orbiter
    };
}

let particals = new Set();
for (let d of dataArray) {
    let system = parseData(d);

    //keep track of number particals
    //particals.add(system.mass)
    //particals.add(system.orbiter)

    //add particals to graph
    //graph.addVertex(system.mass, system.mass)
    //graph.addVertex(system.orbiter, system.orbiter)

    //add edge to graph 
    //graph.addEdge(system.orbiter, system.mass, 0)
    graph.addEdge(system.mass, system.orbiter, 0)
    graph.addEdge(system.orbiter, system.mass, 0)

}

function findMinToSan(startVal, endVal, graph){
    let countOrbits = 0
    let min = graph.minEdgeBFS(startVal, endVal)
    return min//Math.min(countOrbits, Infinity)
}

let startVal = 'YOU'
let endVal = 'Q7Z'
let minToSan = findMinToSan(startVal, endVal, graph);
console.log(minToSan - 1)

