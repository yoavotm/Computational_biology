L = 3;
SIZE = 100;

var probability = function(n) {
    return !!n && Math.random() <= n;
};

// population 
var people = [];
for(var i=0; i<SIZE; i++) {
    people[i] = [];
    for(var j=0; j<SIZE; j++) {
        people[i][j] = Math.floor(Math.random() * 5);
    }
}

// matrix saving the spread of rumors
var lights = [];
for(var i=0; i<SIZE; i++) {
    lights[i] = [];
    for(var j=0; j<SIZE; j++) {
        lights[i][j] = 0;
    }
}

// folow-up rumors grid
var grid = [];
for(var i=0; i<SIZE; i++) {
    grid[i] = [];
    for(var j=0; j<SIZE; j++) {
        grid[i][j] = {"s":people[i][j], "L":0, "heard":0};
    }
}


// pass the rumor to neighbors
function tell_neighbors(grid,i,j){
    var x = [-1, 0, 1, 0];
    var y = [0, -1, 0, 1];
    const zip = (a, b) => a.map((k, i) => [k, b[i]]);
    for (const [dx, dy] of zip(x,y)) {
        if(i+dx >= 0 && i+dx < SIZE && j+dy >= 0 && j+dy < SIZE ){
            grid[i + dx][j + dy]["heard"] += 1;
        }
      }

}

// the first to spread the rumor
function choose_one(grid){
    i = Math.floor(Math.random() * SIZE);
    j = Math.floor(Math.random() * SIZE);
    grid[i][j]["L"] = L;
    lights[i][j] = 1;
    tell_neighbors(grid, i, j);
}

function doubt(cell){
    var s = cell["s"];
    if (s == 0){
        // no one there
        return false;
    }
    if(s == 1){
        // belives in anything
        return true;
    }
    if (cell["heard"] > 1){
        // level of doubt decrease
        s = s - 1;
    }
    if (s == 4){
        // belives nothing
        return false;
    }
    if (s == 3 && probability(1/3)){
        return true;
    }
    if ( s== 2 && probability(2/3)){
        return true;
    }
    return false;
}

function start_round(grid){
    var positions = [];
    for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE; j++){
            if (grid[i][j]["L"] > 0){
                grid[i][j]["L"] --;
                continue;
            }
            if (grid[i][j]["heard"] > 0){
                if(doubt(grid[i][j])){
                    // before passing - wait L rounds
                    grid[i][j]["L"] = L;
                    lights[i][j] = 1;
                    positions.push([i,j]); 
                }
                // before the next round
                grid[i][j]["heard"] = 0;
            }
        }
        
    }

    // pass the rumor
    for (var [i,j] of positions){
        tell_neighbors(grid, i, j);
    }
}

choose_one(grid);
var round = 1;
while(true){
    // console.log("ROUND", round);
    // console.log("____________________________________");
    round++;
    // for(var i=0; i<SIZE; i++){
    //     console.log(lights[i]);
    // }
    start_round(grid);
}




