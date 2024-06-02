/** @param {NS} ns */

/* find all servers includes home
 * Returns an array with the hostnames of all servers in alphabetical order.
 */
export async function getServers(ns) {
  const foundServers = new Set([`home`]);
  for (const server of foundServers)
    ns.scan(server).forEach(adjacentServer => foundServers.add(adjacentServer));
  return [...foundServers].sort();
}