// scripts/estimateMint.js
require('dotenv').config();
const hre = require("hardhat");

async function main(){
  const [deployer] = await hre.ethers.getSigners();
  console.log("Signer:", deployer.address);
  const token = await hre.ethers.getContractAt("Tether", process.env.CONTRACT_ADDRESS, deployer); // or your contract name

  const amount = hre.ethers.utils.parseUnits("1000000", 18);
  const estimate = await token.estimateGas.mint(deployer.address, amount);
  const gasPrice = await hre.ethers.provider.getGasPrice();

  const costWei = estimate.mul(gasPrice);
  console.log("Estimated gasUsed:", estimate.toString());
  console.log("Gas price (gwei):", hre.ethers.utils.formatUnits(gasPrice, "gwei"));
  console.log("Estimated cost (ETH):", hre.ethers.utils.formatEther(costWei));
  // optionally convert to USD (approx) if you want; you'll need a price feed or set a constant
}

main().catch(console.error);
