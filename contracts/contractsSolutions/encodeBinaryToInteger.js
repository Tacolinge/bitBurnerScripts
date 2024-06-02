function decodeHamming(encoded) {
    // Konverter strengen til en liste med tall for enklere manipulering
    let bits = encoded.split('').map(Number);

    // Beregn antall paritetsbiter som trengs
    let n = bits.length;
    let m = 0;
    while ((2 ** m) <= n) {
        m += 1;
    }

    // Steg 1: Finn feil paritetsbiter og feilstillingsposisjonen
    let errorPosition = 0;
    for (let i = 0; i < m; i++) {
        let position = 2 ** i;
        let count = 0;
        // Start sjekk fra posisjon 2^i
        for (let j = position - 1; j < n; j += 2 * position) {
            count += bits.slice(j, j + position).reduce((a, b) => a + b, 0);
        }
        if (count % 2 !== 0) {
            errorPosition += position;
        }
    }

    // Korriger feil bit hvis det er en feil
    if (errorPosition !== 0) {
        bits[errorPosition - 1] ^= 1;  // flipp den feilaktige biten
    }

    // Steg 2: Ekstraher databiter
    let dataBits = [];
    for (let i = 0; i < n; i++) {
        if ((i + 1) & (i + 2)) {  // Hopp over posisjoner som er potens av 2 (paritetsbiter)
            dataBits.push(bits[i]);
        }
    }

    // Konverter databitene til en binær streng
    let dataStr = dataBits.join('');

    // Steg 3: Konverter den binære strengen til et desimaltall
    let decimalValue = parseInt(dataStr, 2);

    return decimalValue;
}

// Gitt kodet binær streng
let encodedString = '1110000000000000100000110010100011010001001110001111011011000010';

// Dekod Hamming-koden og konverter til desimal
let result = decodeHamming(encodedString);
console.log(result);
