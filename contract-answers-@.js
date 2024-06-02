/** @param {NS} ns */
// tar inn 1 arg, map (host,[cctFil])
export async function main(ns) {
  let hostsAndContracts = ns.args[0]
  //let hostsAndContracts = new Map() //test
  //hostsAndContracts.set("home", ["contract-841978.cct","contract-63692.cct","contract-720313.cct"]) //test
  let typesMissingSolution = []
  ns.tprint(`MAP; ${hostsAndContracts.get("home")}`)

  for (const [host, files] of hostsAndContracts.entries()) {
    //ns.tprint(`Host: ${host}, Files: ${files}`);

    for (const file of files) {
      const contractType = ns.codingcontract.getContractType(file);
      //ns.tprint(`Contract type for file ${file}: ${contractType}`);

      if (contractType === "HammingCodes: Encoded Binary to Integer") {
        ns.tprint("Prøver å kjøre løsning denne MANGLER/funker ikke!!");
        //ns.exec("solution-HammingCodes-Encoded-Binary-to-Integer-@.js", "home", 1, host, file);
        ns.tprint(`Kjørt løsning på: ${file}`);
      } 
      else if (contractType === "Hammin") {
        ns.tprint(`HAMMIN?!?!?!?! Kjørt løsning på: ${file}`);
        // ns.exec("solution-Hammin...","home",1, host, file);
      }


      else {
        continue
        //ns.tprint(`Ingen løsningsfil funnet for ${file}, Contract type: ${contractType}`);
      }
    }
  }
  ns.tprint(`Mangler løsning: ${typesMissingSolution}`)
}