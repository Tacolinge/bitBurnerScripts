// ----- finner alle servere NUKER og kjører gitt script på de alle
//burde endres til en while løkke
//må kjøres innimellom


//finner alle servere
//prøver kjøre programmer og NUKE.exe
//deployer så deploy-3-scripts-@.js på alle nuket
import { getServers } from "./f-getServers.js";
export async function main(ns) {

  const atkTarget = ns.read("atkTarget.txt");
  const scriptRAM = ns.getScriptRam("early-template.js", "home");
  const deployDelay = 10000 //ms for at ikke alle servrene skal jobbe helt likt
  const servers = await getServers(ns);

  //starter monitor av target på home server, må kanskje finne en løsning
  //for at den ikke skal åpne mange av samme
  ns.exec("monitor-target-@.js", "home", 1, atkTarget)
  ns.tprint(`Deployer med ${deployDelay}ms delay...`)

  for (let i = 0; i < servers.length; ++i) {
    const target = servers[i];
    if (target == "home") {
      continue
    }

    //programmene for å åpne porter
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
    }
    await ns.sleep(50);
    try { ns.nuke(target); }
    catch { ErrorEvent; }



    if (ns.hasRootAccess(target)) { //hvis man får rootAccess 
      await ns.killall(target) //fjerner alle kjørende scripts
      let targetRAM = ns.getServerMaxRam(target)
      let maxThreads = Math.floor(targetRAM / scriptRAM) //deler server på script
      if (maxThreads > 0) {
        ns.exec("deploy-3-scripts-@.js", "home", 1, target, targetRAM, atkTarget, true)
        await ns.sleep(deployDelay) //for at ikke alle servrene skal jobbe helt likt 10sek
      }
      else {
        ns.print("NOT ENOUGH RAM on server ", target)
      }
    }
    else {
      let portsReq = ns.getServerNumPortsRequired(target)
      ns.tprint(`NOT NUKED, ${target}, portsReq: , ${portsReq}`)
    };
  }
  ns.tprint("Finished")

  // 
}
