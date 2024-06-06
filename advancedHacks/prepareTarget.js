/** @param {NS} ns */
export async function prepareTarget(ns) {
    ns.tprint("prepareTarget funksjonen kjører"); // debug
    const target = ns.read("advancedHacks/atkTargetAdvanced.txt").trim();
    const host = ns.getHostname();
    const server = ns.getServer(target); // formulas need server obj
    const person = ns.getPlayer(); // obj
  
    const minSecurity = ns.getServerMinSecurityLevel(target);
    let curretSecurity = ns.getServerSecurityLevel(target);
  
    const maxMoney = ns.getServerMaxMoney(target);
    let avaMoney = ns.getServerMoneyAvailable(target);
  
    while (curretSecurity > minSecurity || avaMoney < maxMoney) {
  
      const sRAM = ns.getServerMaxRam(host) - ns.getServerUsedRam(host);
      const wgThreadCount = Math.floor(sRAM / 1.75); // weaken script is 1.75GB
      ns.tprint(`sRAM: ${sRAM} - wgThreadCount: ${wgThreadCount}`);
      ns.tprint(`curretSecurity: ${curretSecurity}, minSecurity: ${minSecurity}, avaMoney: ${avaMoney}, maxMoney: ${maxMoney}`);
  
      if (wgThreadCount <= 0) {
        ns.tprint("0 Threads stops script, ingen ledige ");
        return false;
      }
  
      if (curretSecurity > minSecurity) {
        ns.tprint("kjører curretSecurity > minSecurity"); // debug
        const wtime = ns.formulas.hacking.weakenTime(server, person) + 4000; //ms safty
        ns.exec("advancedHacks/weaken.js", host, wgThreadCount, target);
        await ns.sleep(wtime);
        curretSecurity = ns.getServerSecurityLevel(target); // Update security level after weaken
        continue; //recheck 
      }
      if (avaMoney < maxMoney) {
        ns.tprint("kjører avaMoney < maxMoney"); // debug
        const gtime = ns.formulas.hacking.growTime(server, person) + 2000; //ms safty
        ns.exec("advancedHacks/grow.js", host, wgThreadCount, target);
        await ns.sleep(gtime);
        avaMoney = ns.getServerMoneyAvailable(target); // Update available money after grow
        curretSecurity = ns.getServerSecurityLevel(target); // Update security level after weaken
      }
  
      await ns.sleep(2000); // safety sleep
    }
  
    //ns.tprint("retunerer true"); // debug
    return true; // when target is prepared
  }
  