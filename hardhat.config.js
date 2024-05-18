require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.4",

  networks: {
    ganache: {
      url: 'http://localhost:8545',
     },

    besu: {
      url: 'http://localhost:8545',
      //gasPrice: 0,
      //gas: 'auto',
      accounts: ['8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63']
     },  
  }
};
