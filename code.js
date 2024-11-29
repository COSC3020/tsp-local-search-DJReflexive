
function tsp_ls(distance_matrix) {
      // If size is 0 or 1, there is no distance
      if (distance_matrix.length <= 1) { return 0; }

      // Find any starting node, so pick the first with an existing edge
      let startingNodeIndex = findStartNode(distance_matrix);
    
      // If no edges exist, there is no distance
      if (startingNodeIndex == -1) { return 0; }

      // Returns random order of indexes
      let route = generateRandomRoute(distance_matrix, startingNodeIndex);

      return localSearch(distance_matrix, route);
}

function twoOptSwap(route, i, k) {
      let subRoute = [];

      // Isolate the subRoute
      for (let j = 0; j+i <= k; j++) { subRoute[j] = route[i+j]; }

      subRoute.reverse();

      // Plug in newly reversed subRoute
      for (let j = 0; j+i <= k; j++) { route[i+j] = subRoute[j]; }
}

// Implements Simulated Annealing
function localSearch(matrix, route) {
      const alpha = 0.99; // Rate at which tempurature decreases (Pretty Slow)
      const minTemp = 0.0000001; // Threshold when program terminates
      let temp = 100.0 * route.length; // Tempurature

      let bestWeight = evaluateRoute(matrix, route); // Current Best Route
      
      while (temp > minTemp) {
            // Psuedo:

            // Generate random i
            let i = getRandomInt(0, route.length);

            // Generate random k, cannot be i (loop until it gets a different value)
            let k = -1;
            do {
                  k = getRandomInt(0, route.length);
            } while (i == k);

            twoOptSwap(route, i, k);

            let newWeight = evaluateRoute(matrix, route);
            if (bestWeight > newWeight) {
                  bestWeight = newWeight;
            }

            temp *= alpha; // Lowers Tempurature, or "Cooling"
      }

      return bestWeight;
}




      /* Helper Function */

      

function evaluateRoute(matrix, route) {
      let sum = 0;

      for (let i = 0; i < route.length-1; i++) {
            sum += matrix[route[i]][route[i+1]];
      }
      
      return sum;
}

// Generates a random route of the matrix, returning the indices
function generateRandomRoute(matrix, startIndex) {
      let randomRoute = [];

      randomRoute.push(startIndex);

      while (randomRoute.length != matrix.length) {
            let newEntry = getRandomInt(0, matrix.length);

            // If newEntry already does not exist, add it
            if (randomRoute.indexOf(newEntry) == -1) {
                  randomRoute.push(newEntry);
            }
      }

      return randomRoute;
}

// Range of Random Integers from W3Schools.com
function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min) ) + min;
}

// Finds a start node (by finding the first available one)
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

