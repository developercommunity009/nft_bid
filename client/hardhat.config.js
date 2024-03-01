
// /** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
  //   solidity: "0.8.20",
  // };
  require('dotenv').config();
  // require("@nomiclabs/hardhat-ethers");
  require("@nomicfoundation/hardhat-toolbox");

const { API_URL, PRIVATE_KEY } = process.env;
console.log(PRIVATE_KEY ,API_URL )
module.exports = {
   solidity: "0.8.20",
   defaultNetwork: "polygon_mumbai",
   networks: {
      hardhat: {},
      polygon_mumbai: {
         url: API_URL,
         accounts: [`0x${PRIVATE_KEY}`],
         gas: 210000,
         gasPrice: 8000000000,
      }
   },
}
// require('@nomiclabs/hardhat-ethers');
// require('@nomiclabs/hardhat-waffle');

// module.exports = {
//   networks: {
//     mumbai: {
//       url: "https://rpc-mumbai.matic.today",
//       accounts: ['YOUR_PRIVATE_KEY']
//     }
//   },