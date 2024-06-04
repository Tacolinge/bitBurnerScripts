/** @param {NS} ns */
//Unique Paths in a Grid I
//2 args host file
export async function main(ns) {
    ns.tprint("Unique Paths in a Grid I") //debug
    const host = ns.args[0];
    const file = ns.args[1];
    const inputData = ns.codingcontract.getData(file, host)
    const rows = inputData[0]
    const cols = inputData[1]
    // chatGPT to the rescue 
    function uniquePaths(m, n) {
      // Calculate factorial
      function factorial(x) {
        return x === 0 ? 1 : x * factorial(x - 1);
      }
  
      // Calculate binomial coefficient
      return factorial(m + n - 2) / (factorial(m - 1) * factorial(n - 1));
    }
  
    const answer = uniquePaths(rows, cols)
    ns.tprint(ns.codingcontract.attempt(answer, file, host))
  
  }
  