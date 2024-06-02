/** @param {NS} ns */

// main grow
export async function main(ns) {
  
  // @arg
  const target = ns.args[0];

  // Infinite loop that continously hacks target
  while (true) {
      await ns.grow(target);
    }
  
}