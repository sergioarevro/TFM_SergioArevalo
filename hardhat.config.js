require("@nomiclabs/hardhat-waffle");
/*const { ethers } = require("ethers");

//const provider = new ethers.JsonRpcApiProvider('http://localhost:8545');
const provider = new ethers.providers.JsonRpcProvider();
const wallet = new ethers.Wallet('0x8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63');
// connect the wallet to the provider
const signer = wallet.connect(provider);

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",

  networks: {
    ganache: {
      url: 'http://localhost:8545',
      //gasPrice: 0,
      //accounts: ['8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63']
     },

    besu: {
      url: 'http://localhost:8545',
      //gasPrice: 0,
      //account: ['0x8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63']
     },  
  }
};
