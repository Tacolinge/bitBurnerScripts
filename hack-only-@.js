/** @param {NS} ns */
// main hack 
export async function main(ns) {
  
  // @arg
  const target = ns.args[0];

  // Infinite loop that continously hacks target
  while (true) {
      await ns.hack(target);
    }
  
}