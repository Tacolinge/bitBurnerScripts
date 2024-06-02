/** @param {NS} ns */

// main weaken
export async function main(ns) {
  
  // @arg
  const target = ns.args[0];

  // Infinite loop that continously hacks target
  while (true) {
      await ns.weaken(target);
    }
  
}