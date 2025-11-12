const hre = require("hardhat");
require('dotenv').config();

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with:", deployer.address);

  const MyToken = await hre.ethers.getContractFactory("MyToken");
  // name, symbol, initial supply (use parseUnits for decimals)
  const initialSupply = hre.ethers.utils.parseUnits("1000000", 18); // 1000 tokens
  const token = await MyToken.deploy("Tether", "USDT", initialSupply);
  await token.deployed();

  console.log("MyToken deployed to:", token.address);
  console.log("Verify with: npx hardhat verify --network <network> <address> \"MyToken\" \"MTK\" \"1000000000000000000000\"");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
