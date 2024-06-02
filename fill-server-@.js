/** @param {NS} ns */
export async function main(ns) {
  let target = ns.args[0]

  ns.tprint(target)
  const script = "early-template.js"

  const scriptRAM = ns.getScriptRam(script, "home");
  let targetRAM = ns.getServerMaxRam(target)
 let maxThreads = Math.floor(targetRAM / scriptRAM) //deler server på script
      if (maxThreads > 0) {
        ns.scp(script, target, "home")
        ns.kill(script)
        ns.exec(script, target, maxThreads)
        ns.tprint("Startet ", maxThreads, " tråder ", target)

}
}