/** @param {NS} ns */
//Find Largest Prime Factor
//2 args host file
export async function main(ns) {
    ns.tprint("Find Largest Prime Factor") //debug
    const host = ns.args[0];
    const file = ns.args[1];
    const inputData = ns.codingcontract.getData(file, host)
    let n = inputData
  
    function largestPrimeFactor(n) {
      let largest = 1;
      let divisor = 2;
  
      // Del tallet med 2 så mange ganger som mulig
      while (n % divisor === 0) {
        largest = divisor;
        n /= divisor;
      }
  
      // Fortsett med oddetall fra 3 oppover
      divisor = 3;
      while (n > 1 && divisor * divisor <= n) {
        while (n % divisor === 0) {
          largest = divisor;
          n /= divisor;
        }
        divisor += 2; // Gå til neste oddetall
      }
  
      // Hvis det fortsatt er et primtall større enn sqrt(n)
      if (n > 1) {
        largest = n;
      }
  
      return largest;
    }
  
  
    const answer = largestPrimeFactor(n)
    //ns.tprint("answer: ", answer) //debug
    ns.tprint(ns.codingcontract.attempt(answer, file, host))
  
  }
  