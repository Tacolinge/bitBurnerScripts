/** @param {NS} ns */
//script for å få tak i server info
//for å finne den beste serveren å hacke
export async function main(ns) {
  function getServers() {
    const foundServers = new Set([`home`]);
    for (const server of foundServers)
      ns.scan(server).forEach(adjacentServer => foundServers.add(adjacentServer));
    return [...foundServers].sort();
  }

  //let const
  let servers = getServers(); //----

  const playerHackLvl = ns.getHackingLevel()



  class Server {
    constructor(name, maxMoney, reqHackingLvl, chanceOfHack, minSecurityLvl,
      growthParam, timeHack, timeGrow, timeWeaken) {
      this.name = name;
      this.maxMoney = maxMoney;
      this.reqHackingLvl = reqHackingLvl;
      this.chanceOfHack = chanceOfHack; //hackAnalyzeChance
      this.minSecurityLvl = minSecurityLvl;
      this.growthParam = growthParam;
      this.timeHack = timeHack;
      this.timeGrow = timeGrow;
      this.timeWeaken = timeWeaken;
    }
  }

  // Liste for å lagre serverobjektene
  let serverStatsList = [];

  // Iterer gjennom servers-listen og opprett Server-objekter
  for (let i = 0; i < servers.length; ++i) {
    const target = servers[i];
    const server = new Server(
      target,
      ns.getServerMaxMoney(target), // Justert metode
      ns.getServerRequiredHackingLevel(target),
      ns.hackAnalyzeChance(target),
      ns.getServerMinSecurityLevel(target),
      ns.getServerGrowth(target),
      ns.getHackTime(target),
      ns.getGrowTime(target),
      ns.getWeakenTime(target)
    );
    // Legg til det nye serverobjektet i serverStatsList
    serverStatsList.push(server);
  };


  // Deretter bruker du reduce-funksjonen for å finne den høyeste summen
  let highestServer = serverStatsList.reduce((highest, current) => {
    return (highest.maxMoney > current.maxMoney) ? highest : current;
  }, { maxMoney: 0 });

  // Skriv ut navnet og reqHackingLvl-verdien for den serveren med høyest sum av penger
  ns.tprint(`$${highestServer.maxMoney.toLocaleString()}  ${highestServer.name}, Req Hacking Level = ${highestServer.reqHackingLvl}`);

  // Filtrer servere som kan hackes av spilleren
  let hackableServers = serverStatsList.filter(server => server.reqHackingLvl <= playerHackLvl); // /2
  //maxMoney > 0
  hackableServers = hackableServers.filter(server => server.maxMoney > 0);

  // Sorter hackable servers etter maks penger
  hackableServers.sort((a, b) => b.maxMoney - a.maxMoney);

  if (hackableServers.length === 0) {
    ns.tprint("No hackable servers found.");
  } else {
    ns.tprint("Best servers to hack now:");
    hackableServers.forEach(server => {
      ns.tprint(`$${server.maxMoney.toLocaleString()} ${server.name}`);
    });
    ns.tprint(hackableServers[0])
    ns.tprint(hackableServers[1])
    ns.tprint(hackableServers[2])



  }
}