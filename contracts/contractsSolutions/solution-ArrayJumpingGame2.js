/** @param {NS} ns */
//Array Jumping Game 2
//2 args host file
export async function main(ns) {
    //ns.tprint("NAME") //debug
    const host = ns.args[0];
    const file = ns.args[1];
    const inputData = ns.codingcontract.getData(file, host)

    function arrayJumpingGame2(inputData) {
    // Edge case: if the array has only one element, we're already at the end
    if (inputData.length <= 1) return 0;

    let jumps = 0; // Number of jumps made
    let currentEnd = 0; // End of the range we can reach with the current number of jumps
    let farthest = 0; // Farthest position we can reach

    for (let i = 0; i < inputData.length - 1; i++) {
        // Update the farthest we can reach from current position
        farthest = Math.max(farthest, i + inputData[i]);

        // If we've reached the end of the current range
        if (i === currentEnd) {
            jumps++; // We need to make another jump
            currentEnd = farthest; // Update the range we can reach with the new number of jumps

            // If the current end is beyond or at the last position, we can reach the end
            if (currentEnd >= inputData.length - 1) {
                return jumps;
            }
        }
    }

    // If we finished the loop without being able to reach the end, return 0
    return 0;
}
  
    
        
    const answer = arrayJumpingGame2(inputData)
    ns.tprint(ns.codingcontract.attempt(answer, file, host))
  
  }
  