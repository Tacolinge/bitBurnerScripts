/** @param {NS} ns */
export async function main(ns) {
  // How much RAM each purchased server will have. In this case, it'll
  // be 8GB.
  const targetRAM = 4096; //GB

  const atkTarget = "the-hub"

  // Iterator we'll use for our loop
  let i = 0;


  // Continuously try to purchase servers until we've reached the maximum
  // amount of servers

  const prisNy = ns.getPurchasedServerCost(targetRAM);
  ns.tprint("Pris for ny server: $", prisNy.toLocaleString(), "  med ", targetRAM, " GB")
  while (i < ns.getPurchasedServerLimit()) {
    // Check if we have enough money to purchase a server
    if (ns.getServerMoneyAvailable("home") > prisNy) {
      // If we have enough money, then:
      //  1. Purchase the server
      //  2. Copy our hacking script onto the newly-purchased server
      //  3. Run our hacking script on the newly-purchased server with 3 threads
      //  4. Increment our iterator to indicate that we've bought a new server
      let target = ns.purchaseServer(targetRAM + "-pserv-" + i, targetRAM);
      ns.exec("deploy-3-scripts-@.js", "home", 1, target, targetRAM, atkTarget)
      ns.tprint("Kjøpt server for $", prisNy);
      ++i;
      //Make the script wait for a second before looping again.
      //Removing this line will cause an infinite loop and crash the game.
    }
    await ns.sleep(1000); //NB! MÅ VÆRE I WHILE altså under if ikke inni if...    
  }
}