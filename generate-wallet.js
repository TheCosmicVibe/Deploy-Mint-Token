// generate-wallet.js
// run: node generate-wallet.js
const { ethers } = require("ethers");
const fs = require("fs");

const wallet = ethers.Wallet.createRandom(); // creates mnemonic + privateKey
const mnemonic = wallet.mnemonic.phrase;
const privateKey = wallet.privateKey;
const address = wallet.address;

console.log("ADDRESS:", address);
console.log("MNEMONIC:", mnemonic);
console.log("PRIVATE_KEY:", privateKey);

const out = `# Generated wallet (DO NOT COMMIT to Git)\nMNEMONIC="${mnemonic}"\nPRIVATE_KEY=${privateKey}\nADDRESS=${address}\n`;
fs.writeFileSync(".env.generated", out, { encoding: "utf8" });
console.log("\nWrote .env.generated (copy values into your real .env)\n");
