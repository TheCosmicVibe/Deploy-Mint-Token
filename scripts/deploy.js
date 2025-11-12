const hre = require("hardhat");
require('dotenv').config();

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with:", deployer.address);

  // Compile and get contract factory
  const Tether = await hre.ethers.getContractFactory("Tether");

  // Set initial supply (1,000,000 tokens with 18 decimals)
  const initialSupply = hre.ethers.utils.parseUnits("1000000", 18);

  // Deploy contract
  const token = await Tether.deploy("Tether", "USDT", initialSupply);
  await token.deployed();

  console.log("✅ Tether deployed to:", token.address);
  console.log(`\nVerify with:\n  npx hardhat verify --network sepolia ${token.address} "Tether" "USDT" "${initialSupply.toString()}"`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
