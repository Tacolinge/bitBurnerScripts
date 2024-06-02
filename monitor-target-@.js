/** @param {NS} ns */
//tar inn et argument target
export async function main(ns) {
  const target = ns.args[0];
  const sTime = 1000;
  ns.disableLog("sleep")
  while (true) {
    ns.getServerSecurityLevel(target)
    ns.getServerMoneyAvailable(target)
    ns.getServerMaxMoney(target)
    await ns.sleep(sTime)
  }
ns.l
}