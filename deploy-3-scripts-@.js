/** @param {NS} ns */


//BUG threads kan ikkje være 0 sikker noe i prosent funksjonen

//NB! tar inn 4 args
//deployserver, deployTargetRAM, atkTarget, doKill(true or false)
//kill all scripts på serveren
//kjører så gitte prosent andeler av de tre filene
export async function main(ns) {
  const deployTarget = ns.args[0]
  const deployTargetRAM = ns.args[1]
  const atkTarget = ns.args[2]
  const doKill = ns.args[3]

  const hackFile = "hack-only-@.js";
  const growFile = "grow-only-@.js";
  const weakenFile = "weaken-only-@.js";
  const scriptRAM = 1.75 // i GB, hardkodet for no bør endres etterhvert

  const hackProsent = 5;
  const growProsent = 75;
  const weakenProsent = 20;
  //summen fra det over bør alltid bli 100

  const targetMaxThreads = Math.floor(deployTargetRAM / scriptRAM) //deler server på script
  
  if (deployTargetRAM < scriptRAM) {
    ns.tprint("NOT ENOUGH RAM TO RUN SCRIPTS: ")
    return
  }
  else {
    //calculate prosent
    function findNumOfThreads(prosent, targetMaxThreads) {
      let calculatedThreads = Math.floor((prosent / 100) * targetMaxThreads)
      return calculatedThreads
    }
    let hackThr = findNumOfThreads(hackProsent, targetMaxThreads);
    let growThr = findNumOfThreads(growProsent, targetMaxThreads);
    let weakenThr = findNumOfThreads(weakenProsent, targetMaxThreads);

    //transfer files
    ns.scp([hackFile, growFile, weakenFile], deployTarget, "home");
    //execute
    if (doKill == true) {
    ns.killall(deployTarget);
    }
    if (hackThr > 0) {
      ns.exec(hackFile, deployTarget, hackThr, atkTarget);
    }
    if (growThr > 0) {
      ns.exec(growFile, deployTarget, growThr, atkTarget);
    }
    if (weakenThr > 0) {
      ns.exec(weakenFile, deployTarget, weakenThr, atkTarget);
    }

    ns.tprint("mot: ", atkTarget, " ---hack: ", hackThr, " grow: ", growThr, " weaken: ", weakenThr, " deployed on: ", deployTarget,);
  }
}