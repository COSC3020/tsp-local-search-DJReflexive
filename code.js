
function tsp_ls(distance_matrix) {
      
      if (distance_matrix.length <= 1) { return 0; }

      return -1;
}


function twoOptSwap(route, i, k) {
      let subRoute = [];

      // Isolate the subRoute
      for (let j = 0; j+i <= k; j++) { subRoute[j] = route[i+j]; }

      subRoute.reverse();

      // Plug in newly reversed subRoute
      for (let j = 0; j+i <= k; j++) { route[i+j] = subRoute[j]; }
}


dm = [[0,0,0],
      [0,0,0],
      [0,0,0]];
console.log("1st Result: " + tsp_ls(dm));
console.assert(tsp_ls(dm) == 0);

dm = [[0,1,2],
      [1,0,2],
      [2,2,0]];
console.log("2nd Result: " + tsp_ls(dm));
console.assert(tsp_ls(dm) >= 3);
