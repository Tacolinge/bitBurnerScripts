/** @param {NS} ns */
//buys servers to serverlimit is reached
export async function main(ns) {
  const targetRAM = 1024; //GB
  const atkTarget = ns.read("atkTarget.txt");
  let i = ns.getPurchasedServers().length 

  // Continuously try to purchase servers until the maximum
  const prisNy = ns.getPurchasedServerCost(targetRAM);
  ns.tprint("Pris for ny server: $", prisNy.toLocaleString(), "  med ", targetRAM, " GB")
  while (i < ns.getPurchasedServerLimit()) {
    // Check if we have enough money to purchase a server
    // And deploy script on the new server
    if (ns.getServerMoneyAvailable("home") > prisNy) {
      let target = ns.purchaseServer(targetRAM + "-pserv-" + i, targetRAM);
      ns.exec("deploy-3-scripts-@.js", "home", 1, target, targetRAM, atkTarget)
      ns.tprint("Kjøpt server for $", prisNy.toLocaleString());
      ++i;
    }
    await ns.sleep(500); //Removing this line will cause an infinite loop and crash the game.
  }
}
