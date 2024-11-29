# Traveling Salesperson Problem -- Local Search

This exercise is about the Traveling Salesperson Problem I mentioned in the
lecture on NP-hard problems -- given a set of cities, determine the length of
the shortest tour that visits all of them. We can get from any city to any other
city, i.e. the graph of cities is completely connected. We consider the version
of the Traveling Salesperson Problem that finds the shortest tour to visit $n$
cities, starting at a city and ending at the $n$ th city; it *does not* go
back to the start. The start city may be any of the cities. Remember that the
graph for a TSP is undirected, i.e. the cost is the same in either direction.

The 2-opt algorithm for solving the Traveling Salesperson Problem is a
randomized local search algorithm that, at each iteration, reverses part of the
route. It starts with a random route (this is the randomized part), and changes
part of the route in each step (this is the local search part, sprinkled with
more randomness). The pseudocode for one iteration is as follows:

```javascript
2optSwap(route, i, k)
  cities 1 to i-1 stay in the order they are
  cities i to k are reversed
  cities k + 1 to n stay in the order they are
```

For example, if I call the above function with route A--B--C--D--E--F, $i=2$,
$k=4$, the resulting route is A--B--E--D--C--F.

The algorithm starts with a random route; if the new route at the end of an
iteration decreases the total length, it is retained as the current incumbent.
The incumbent after the final iteration is returned as the solution.

Implement the 2-opt algorithm, which repeatedly runs the above steps. Your
implementation needs to fix two design parameters that I have left open. First,
you need to design a stopping criterion -- when would it make sense to stop and
return the shortest route found so far rather than trying another iteration?
Second, design a way to choose $i$ and $k$ -- note that they need to be
different in subsequent iterations, as one iteration would simply undo what
the previous one did otherwise. Start with the template I provided in `code.js`.
Describe in your code how you designed your stopping criterion and ways of
choosing $i$ and $k$ and why.

The function takes a distance matrix (the adjacency matrix for the graph where
the values in the cells are the distances between the corresponding cities) and
returns the length of the shortest tour (not the tour itself).

Test your new function; I've provided some basic testing code in `code.test.js`.

# Runtime Analysis

What is the worst-case asymptotic time complexity of your implementation? What
is the worst-case asymptotic memory complexity? Add your answer, including your
reasoning, to this markdown file.


# My Analysis
### Choosing how to terminate

My implementation of this algorithm uses Simulated Annealing. A technique which uses randomness and probability to choose how long the algorithm will run for. The idea of using a tempurature, and it decreasing over every iteration of the program. Eventually, the idea is that the algorithm will find the best case result within this time. Once the tempurature reaches (a value very close to) zero, the program terminates and returns the best answer it finds.

### How I choose i and k

The Simulated Annealing implementation has the characteristic of randomly choosing new routes. If the randomly chosen route happens to be better than the original route, it will make the new route the base in which it will make more decisions off of.

### Runtime Analysis

Upon the algorithm starting, it first checks to see if the matrix is a valid size, if not, returns 0. Otherwise the program will seek a starting node. If the matrix is full of zeros, the algorithm will see this and terminate in $\Theta(n^2)$ time, since every node in the matrix must be checked. However, if the matrix is not full of zeros, it will run in constant time because this means the graph is a completely connected graph (it will pick the first available node). 

The algorithm then generates a random route to be process. This takes $\Theta(n)$ time since it only needs to generate a one-dimensional array.

The bestWeight is calculated in $\Theta(n)$ time since all it needs to do is evaluate the length of the route.

At this point, the local search is executed. The Simulated Annealing portion (the while loop) actually will run in a constant time. No matter what the input size is, it will always run the same amount of times. The is a do-while that could technically run infinitely due to random number generation, but we will assume this is a constant time operation since it is more likely to not loop indefinitely. The twoOptSwap() method is called, taking a time complexity of $\Theta(2n)$ since the subarray is iterated through twice. And finally another evaluation of the current route, which takes $\Theta(n)$ time.

Once the Simulated Annealing while loop ends, the program terminates and returns the result. Combining all the complexities, we get $\Theta(n^2 + n + n + 2n + n)$ or $\Theta(n^2)$.

### Memory Analysis

Upon calling the tsp_ls function, we need a distance_matrix, which takes up a space of $\Theta(n^2)$ since it is a square matrix. Only a single index (constant amount) is needed to represent the startingNodeIndex. For the route array, it needs $\Theta(n)$ space since it needs to keep a tour of all the locations in the matrix.

A few constant variables are delcared in localSearch(), but never grow or change in size. In all of the loops, most of the variable changes are in-place.

In twoOptSwap(), there is an auxilary array called to help reverse, taking a space of $\Theta(n)$, and is no longer needed after. Since twoOptSwap() is within a while loop that takes a constant number of operations, the complexity doesn't change.

The evaulateRoute() method declares a sum variable, but doesn't grow, so it is a constant operation.

Combining these complexities results in $\Theta(n^2 + n + n)$ space complexity, which is just $\Theta(n^2)$ when reduced.

# Sources

- https://www.youtube.com/watch?v=SC5CX8drAtU - Vizualization/Intro Video to the algorithm (where I got the idea to go with Simulated Annealing)
- https://www.youtube.com/watch?v=NPE3zncXA5s - Description of Simulated Annealing with Vizualization
- https://www.w3schools.com/js/js_random.asp - For generating a range of random numbers with Math.random()

# Plagiarism Acknowledgement

I certify that I have listed all sources used to complete this exercise, including the use of any Large Language Models. All of the work is my own, except where stated otherwise. I am aware that plagiarism carries severe penalties and that if plagiarism is suspected, charges may be filed against me without prior notice.
