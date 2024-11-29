
function tsp_ls(distance_matrix) {
      // If size is 0 or 1, there is no distance
      if (distance_matrix.length <= 1) { return 0; }

      // Find any starting node, so pick the first with an existing edge
      let startingNodeIndex = findStartNode(distance_matrix);
    
      // If no edges exist, there is no distance
      if (startingNodeIndex == -1) { return 0; }

      // Returns random indices order
      let route = generateRandomRoute(distance_matrix, startingNodeIndex);

      // TODO: - The Stopping Criteria is when the Tempurature reaches 0
      //       - I am going to randomly choose i and k (not allowing a state to run twice)

      return -1;
}

// Systematically goes through 
function localSearch(matrix, route) {

}

function twoOptSwap(route, i, k) {
      let subRoute = [];

      // Isolate the subRoute
      for (let j = 0; j+i <= k; j++) { subRoute[j] = route[i+j]; }

      subRoute.reverse();

      // Plug in newly reversed subRoute
      for (let j = 0; j+i <= k; j++) { route[i+j] = subRoute[j]; }
}

// Generates a random route of the matrix, returning the indices
function generateRandomRoute(matrix, startIndex) {
      let randomRoute = [];

      randomRoute.push(startIndex);

      while (randomRoute.length != matrix.length) {
            let newEntry = getRndIndex(0, matrix.length);

            // If newEntry already does not exist, add it
            if (randomRoute.indexOf(newEntry) == -1) {
                  randomRoute.push(newEntry);
            }
      }

      return randomRoute;


      // Range of Random Integers from W3Schools.com
      function getRndIndex(min, max) {
            return Math.floor(Math.random() * (max - min) ) + min;
      }
}

// Finds a new start node
function findStartNode(cities) {
      let size = cities.length;

      for (let i = 0; i < size; i++) {
          for (let j = 0; j < size; j++) {
              // Checks for an existing edge
              if (cities[i][j] > 0) return i; 
  
              // If there were no nodes in the matrix that contained an edge
              if (i == size-1) return -1;
          }
      }
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
