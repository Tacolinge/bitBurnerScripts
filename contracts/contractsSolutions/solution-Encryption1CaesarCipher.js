/** @param {NS} ns */
//Encryption I: Caesar Cipher
//2 args host file
export async function main(ns) {
    //ns.tprint("Encryption 1: caesa Cipher kjører") //debug
    const host = ns.args[0];
    const file = ns.args[1];
    const inputData = ns.codingcontract.getData(file, host)
    const plaintext = inputData[0]
    const shift = inputData[1]
  
    function shiftLetter(letter, shift) {
      const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      let index = alphabet.indexOf(letter);
      if (index === -1) return letter; // Hvis tegnet ikke finnes i alfabetet (f.eks. mellomrom)
  
      // Beregn ny indeks med wrapping
      let newIndex = (index - shift + alphabet.length) % alphabet.length;
      return alphabet[newIndex];
    }
  
    function caesarCipher(plaintext, shift) {
      let ciphertext = '';
      for (let i = 0; i < plaintext.length; i++) {
        ciphertext += shiftLetter(plaintext[i], shift);
      }
      return ciphertext;
    }
  
    const answer = caesarCipher(plaintext, shift)
    ns.tprint(ns.codingcontract.attempt(answer, file, host))
  
  }
  