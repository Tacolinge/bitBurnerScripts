/** @param {NS} ns */
export async function main(ns) {
    const hackTarget = ns.read("hackTarget.txt") ;

    // Infinite loop that continously hacks/grows/weakens the target server
    while (true) {
        if (ns.getServerSecurityLevel(hackTarget) > ns.getServerMinSecurityLevel(hackTarget) + 2) {
            await ns.weaken(hackTarget) ;
            continue ;
        }
        else if (ns.getServerMoneyAvailable(hackTarget) <= ns.getServerMaxMoney(hackTarget) * 0.75) {
            await ns.grow(hackTarget) ;
        }
        else {
            await ns.hack(hackTarget) ;
        }
    }
}