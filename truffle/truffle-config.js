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
      //gas: "0x1ffffffffffffe",
      provider: hdWalletProvider,
     }

  },

  // Set default mocha options here, use special reporters, etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.21",      // Fetch exact version from solc-bin (default: truffle's version)

    }
  },
};
