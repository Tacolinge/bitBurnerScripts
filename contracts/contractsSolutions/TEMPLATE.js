/** @param {NS} ns */
//NAME template
//2 args host file
export async function main(ns) {
    ns.tprint("NAME") //debug
    const host = ns.args[0];
    const file = ns.args[1];
    const inputData = ns.codingcontract.getData(file, host)
  
  
    const answer = nameFunction(inputData)
    ns.tprint(ns.codingcontract.attempt(answer, file, host))
  
  }
  