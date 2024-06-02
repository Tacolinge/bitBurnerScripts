/** @param {NS} ns */
//sletter kjøpte server som inneholder

const nameToDelete = "pserv-" 


export async function main(ns) {
  function getServers() {
    const foundServers = new Set([`home`]);
    for (const server of foundServers)
      ns.scan(server).forEach(adjacentServer => foundServers.add(adjacentServer));
    return [...foundServers].sort();
  }
  let servers = getServers(); //----
  ns.tprint(servers.length, " alle servere")
  
  for (let i = 0; i < servers.length; ++i) {
    if (servers[i].includes(nameToDelete)){
      ns.killall(servers[i])
      ns.deleteServer(servers[i])
      ns.tprint(servers[i])
    }
  }
  


}