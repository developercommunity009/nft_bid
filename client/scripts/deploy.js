
const hre = require("hardhat");

async function main() {
  const NFTMarkitplace = await hre.ethers.getContractFactory("NFTMarkitplace");
  const nftMarkitplace = await NFTMarkitplace.deploy();

  await nftMarkitplace.waitForDeployment();

  console.log(`deployed contract Address ${nftMarkitplace.target}`);
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});




//  Localhost :    0x5FbDB2315678afecb367f032d93F642f64180aa3