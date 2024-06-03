/** @param {NS} ns */
// tar inn 2 arg host, [cctfile(s)]
export async function main(ns) {
  const hostJson = ns.args[0];
  const filesJson = ns.args[1];
  //pakk ut Json
  const host = JSON.parse(hostJson)
  const files = JSON.parse(filesJson)

  let typesMissingSolution = [];
  //ns.tprint(`ARGS; ${host}, ${files}`); //debugging

  for (const file of files) {
    const contractType = ns.codingcontract.getContractType(file, host);
    //ns.tprint(`Contract type for file ${file}: ${contractType}`);

    if (contractType === "HammingCodes: Encoded Binary to Integer") {
      //ns.exec("solution-HammingCodes-Encoded-Binary-to-Integer-@.js", "home", 1, host, file);
      ns.tprint(`Kjørt løsning på: ${file} mangler script!`);
    }
    else if (contractType === "Hammin") {
      ns.tprint(`HAMMIN?!?!?!?! Kjørt løsning på: ${file}`);
      // ns.exec("solution-Hammin...","home",1, host, file);
    }

    else {
      typesMissingSolution.push(contractType)
      continue
      //ns.tprint(`Ingen løsningsfil funnet for ${file}, Contract type: ${contractType}`);
    }
  }
  ns.tprint(`Mangler løsning: ${typesMissingSolution}`)
}
