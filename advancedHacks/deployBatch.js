/** @param {NS} ns */
//NAME template
//args
import { prepareTarget } from "./advancedHacks/prepareTarget.js";
export async function main(ns) {
  ns.tprint("-----------------DEPLOY BATCH KJØRER ---------------") //debug
  const target = ns.read("advancedHacks/atkTargetAdvanced.txt")
  const targetPrepared = await prepareTarget(ns)

  const minSecurityLvl = ns.getServerMinSecurityLevel(target)
  const currentSecurityLvl = ns.getServerSecurityLevel(target)
  const checkMoney = ns.getServerMaxMoney(target) - ns.getServerMoneyAvailable(target)
  if (targetPrepared != true) {
    ns.tprint("Target false")
  }
  if (minSecurityLvl != currentSecurityLvl) {
    ns.tprint("Target not weaken to limit")
  }
  if (checkMoney != 0) {
    ns.tprint("Target not full on money")
  }
  else {
    ns.tprint("Target skal være prepet")
  }

}   