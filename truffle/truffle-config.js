const HDWalletProvider = require('@truffle/hdwallet-provider');
const privateKey = "8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63";
const nodeUrl = "http://localhost:8545";
const hdWalletProvider = new HDWalletProvider(
  privateKey,
  nodeUrl,
);

module.exports = {
  networks: {
    besu: {
      host: "localhost",
      port: 8545,
      network_id: "*",
      gasPrice: 0,
      provider: hdWalletProvider,
     }

  },

  // JS library for build tests
  mocha: {
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.19",   
    }
  },
};
