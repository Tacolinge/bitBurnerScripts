/** @param {NS} ns */
//for å hente funksjoner fra andre filer:
//  import {f} from "./script.js"
//  await f1(ns) for å kjøre
//array med alle servere

//henter alle servere, sjekker så etter .cct filer for alltid
//sender så map med host,cct til Answers.js
//som finner rett svar fil til kontrakten
import { getServers } from "./f-getServers.js";
export async function main(ns) {
  ns.disableLog("scan")

  const servers = await getServers(ns)
  const hostsAndContracts = new Map()
  const timeinterval = 300000 //300000 =5min

  function checkServersForContracts() {
    //ns.tprint("checkServerForContracts har kjørt")
    for (let i = 0; i < servers.length; ++i) {
      const host = servers[i];
      //ns.tprint("host ", host) 
      let cctFiles = ns.ls(host, "cct") //array
      if (cctFiles.length > 0) {
        hostsAndContracts.set(host, cctFiles)
      }
    }
    if (hostsAndContracts.size > 0) {
      ns.print(hostsAndContracts.size, " contracts found! Servers scanned ", servers.length)
      return hostsAndContracts
    }
    if (hostsAndContracts.size == 0) {
      ns.print("INGEN NYE KONTRAKTER FUNNET! Servers scanned ", servers.length, " nytt søk om ", timeinterval, "ms")
    }
  }
  while (true) {
    checkServersForContracts()
    if (hostsAndContracts.size > 0) {
      //ns.tprint("kan kjøre contract-answers-@.js på contracts: ", hostsAndContracts.size)
      const hostsAndContractsArray =  Array.from(hostsAndContracts.entries());
      ns.exec("contract-answers-@.js", "home", 1, "home")
      hostsAndContracts.clear
    }
    //ns.tprint("SET med kontrakter: ", hostsAndContracts.size)
    await ns.sleep(timeinterval)
  }
}