
/** @param {NS} ns */
//Array Jumping Game
//2 args host file
export async function main(ns) {
    ns.tprint("Array Jumping Game") //debug
    const host = ns.args[0];
    const file = ns.args[1];
    const inputData = ns.codingcontract.getData(file, host)
  
    function arrayJumpingGame(inputData) {
      let position = inputData[0]
      let newPosition = 0
      const totalLength = inputData.length
      let sum = 0
      if (position === 0) {
        return 0
      }
      while (position + sum < totalLength) {
        console.log("while kjører")
        if (position >= totalLength) {
          position = totalLength - 1 //siste index
        }
        for (let i = 0; i <= position; i++) {
          sum += inputData[i]; //summen av besøkte indexer
          console.log("sum:", sum)
        }
        newPosition += sum
        if (newPosition >= totalLength) {
          return 1
        }
        position = inputData[newPosition]
        console.log("position", position)
      }
  
    }
    await ns.sleep(100)
  
  
    const answer = arrayJumpingGame(inputData)
    ns.tprint(ns.codingcontract.attempt(answer, file, host))
  
  }
  