require("@nomiclabs/hardhat-waffle");

/**task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});
*/


/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",

  networks: {
    besu: {
      url: 'http://localhost:8545',
      gasPrice: 0,
      accounts: ['8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63']
     },  
  }
};
