require('dotenv').config();
const { ethers } = require("ethers");
const fs = require("fs");
const path = require("path");

const ABI_PATH = path.join(__dirname, "..", "artifacts", "contracts", "MyToken.sol", "MyToken.json");

async function main() {
  const RPC_URL = process.env.RPC_URL;
  const PRIVATE_KEY = process.env.PRIVATE_KEY;
  const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS; // set this in .env after deploy

  if (!RPC_URL || !PRIVATE_KEY || !CONTRACT_ADDRESS) {
    throw new Error("Set RPC_URL, PRIVATE_KEY, and CONTRACT_ADDRESS in .env");
  }

  const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
  const signer = new ethers.Wallet(PRIVATE_KEY, provider);

  const artifact = JSON.parse(fs.readFileSync(ABI_PATH, "utf8"));
  const contract = new ethers.Contract(CONTRACT_ADDRESS, artifact.abi, signer);

  const to = signer.address;
  const amount = ethers.utils.parseUnits("1000000", 18); // mint 100 tokens

  const tx = await contract.mint(to, amount);
  console.log("Mint tx hash:", tx.hash);
  await tx.wait();
  console.log("Minted", ethers.utils.formatUnits(amount, 18), "to", to);
}

main().catch(console.error);
