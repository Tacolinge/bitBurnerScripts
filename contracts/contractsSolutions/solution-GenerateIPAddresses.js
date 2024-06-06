function isValidOctet(s) {
    // Check if the octet is valid: it should be between 0 and 255 and have no leading zeros
    if (s.length === 0 || (s.length > 1 && s[0] === '0') || parseInt(s) > 255) {
        return false;
    }
    return true;
}

function generateIPAddresses(s) {
    const n = s.length;
    const result = [];

    // We need to place 3 dots in the string, which will create 4 parts
    // The indices for the dots can range from 1 to n-3, 2 to n-2, 3 to n-1
    for (let i = 1; i < Math.min(4, n - 2); i++) {
        for (let j = i + 1; j < Math.min(i + 4, n - 1); j++) {
            for (let k = j + 1; k < Math.min(j + 4, n); k++) {
                const octet1 = s.slice(0, i);
                const octet2 = s.slice(i, j);
                const octet3 = s.slice(j, k);
                const octet4 = s.slice(k);

                if (isValidOctet(octet1) && isValidOctet(octet2) && isValidOctet(octet3) && isValidOctet(octet4)) {
                    result.push(`${octet1}.${octet2}.${octet3}.${octet4}`);
                }
            }
        }
    }
    return result;
}

// Example usage
const inputString = "25525511135";
console.log(generateIPAddresses(inputString));