/** @param {NS} ns */
//kjører deploy-3 på home med litt ram til overs
export async function main(ns) {
  const atkTarget = ns.read("atkTarget.txt");
  const deployTarget = "home";
  const deployTargetMaxRAM = ns.getServerMaxRam(deployTarget);
  const deployTargetUsedRAM = ns.getServerUsedRam(deployTarget)
  let deployTargetRAM = deployTargetMaxRAM - deployTargetUsedRAM
  deployTargetRAM -= 128 //GB alltid litt plass til å kjøre scripts
  ns.exec("monitor-target-@.js", "home", 1, atkTarget)
  ns.exec("deploy-3-scripts-@.js", "home", 1, deployTarget, deployTargetRAM, atkTarget, false);
}
