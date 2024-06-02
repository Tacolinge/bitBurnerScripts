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

  const onlyHomeServer = true //true for testing purposes
  const timeinterval = 300000 //300000 =5min
  const hostsAndContracts = new Map()

  //testing on contracts located on home only
  if (onlyHomeServer) {
    ns.tprint("ONLY HOME SERVER!")
    let cctFiles = ns.ls("home", "cct") //array
    if (cctFiles.length > 0) {
      hostsAndContracts.set("home", cctFiles)
    }
  }

  else if (onlyHomeServer === false) {
    const servers = await getServers(ns)

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
  }
  while (true) {
    if (onlyHomeServer === false) {
      checkServersForContracts()
    }
    //calls upon answer file and parse arguments
    if (hostsAndContracts.size > 0) {
      for (let [host, files] of hostsAndContracts.entries()) {
        const hostJson = JSON.stringify(host)
        const filesJson = JSON.stringify(files)
        //ns.tprint(`Json til args:  ${hostJson}, ${filesJson}`)
        ns.exec("contracts/contract-answers-@.js", "home", 1, hostJson, filesJson)
      }
      hostsAndContracts.clear()
    }
    await ns.sleep(timeinterval)
  }
}