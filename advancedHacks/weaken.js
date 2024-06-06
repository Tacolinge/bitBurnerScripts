/** @param {NS} ns */
//weaken once
//1 args target
export async function main(ns) {
    const target = ns.args[0]
    await ns.weaken(target)

}   