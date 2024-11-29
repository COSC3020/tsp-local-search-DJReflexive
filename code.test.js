const fs = require('fs');
const assert = require('assert');

eval(fs.readFileSync('code.js')+'');

dm = [[]];
assert(tsp_ls(dm) == 0);

dm = [[0]];
assert(tsp_ls(dm) == 0);

dm = [[0, 0],
      [0, 0]];
assert(tsp_ls(dm) == 0);

dm = [[0, 8],
      [8, 0]];
assert(tsp_ls(dm) >= 8);

dm = [[0, 14],
      [14, 0]];
assert(tsp_ls(dm) >= 14);

dm = [[0,0,0],
      [0,0,0],
      [0,0,0]];
assert(tsp_ls(dm) == 0);

dm = [[0,1,2],
      [1,0,2],
      [2,2,0]];
assert(tsp_ls(dm) >= 3);

dm = [[0,15,22],
      [15,0,12],
      [22,12,0]];
assert(tsp_ls(dm) >= 27);

// https://people.sc.fsu.edu/~jburkardt/datasets/tsp/tsp.html
dm = [[0,3,4,2,7],
      [3,0,4,6,3],
      [4,4,0,5,8],
      [2,6,5,0,6],
      [7,3,8,6,0]];
assert(tsp_ls(dm) >= 13);

dm = [[0,32,64,22,77],
      [32,0,45,96,73],
      [64,45,0,25,18],
      [22,96,25,0,66],
      [77,73,18,66,0]];
assert(tsp_ls(dm) >= 138);
