// ----- finner alle servere NUKER og kjører gitt script på de alle
//burde endres til en while løkke
//må kjøres innimellom


/**
 * Returns an array with the hostnames of all servers in alphabetical order.
 * 
 * @returns {string[]} Returns an array with the hostnames of all servers in alphabetical order.
 */
export async function main(ns) {
  //ns.tprint(netscan(ns));

  // const scriptToRun = "script", "home" //finn ut seinere

  const scriptRAM = ns.getScriptRam("early-template.js", "home");

  function getServers() {
    const foundServers = new Set([`home`]);
    for (const server of foundServers)
      ns.scan(server).forEach(adjacentServer => foundServers.add(adjacentServer));
    return [...foundServers].sort();
  }
  let servers = getServers(); //----

  for (let i = 0; i < servers.length; ++i) {
    const target = servers[i];
    if (target == "home"){
      continue
    }

    if (!ns.hasRootAccess(target)) {
      if (ns.fileExists("BruteSSH.exe", "home")) {
        await ns.brutessh(target);
      }
      if (ns.fileExists("FTPCrack.exe", "home")) {
        await ns.ftpcrack(target);
      }
      if (ns.fileExists("relaySMTP.exe", "home")) {
        await ns.relaysmtp(target)
      }
       if (ns.fileExists("HTTPWorm.exe", "home")) {
        await ns.httpworm(target)
      }
       if (ns.fileExists("SQLInject.exe", "home")) {
        await ns.sqlinject(target)
      }
      //add all programmene her for å åpne porter
    }
    await ns.sleep(50);
    try { ns.nuke(target); }
    catch { ErrorEvent; }



    if (ns.hasRootAccess(target)) { //hvis man får rootAccess 
      await ns.killall(target) //fjerner alle kjørende scripts
      let targetRAM = ns.getServerMaxRam(target)
      let maxThreads = Math.floor(targetRAM / scriptRAM) //deler server på script
      if (maxThreads > 0) {
        ns.scp("early-template.js", target)
        ns.exec("early-template.js", target, maxThreads)
        ns.tprint("Startet ", maxThreads, " tråder ", target)
      }
      else {
        ns.tprint("!!---- NOT ENOUGH RAM on server ", target)
      }
    }

    else {
      let portsReq = ns.getServerNumPortsRequired(target)
      ns.tprint(target, " !! NOT NUKED, portsReq: ", portsReq)
    };
  }

  // 
}
