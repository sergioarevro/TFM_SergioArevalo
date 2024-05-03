require("@nomiclabs/hardhat-waffle");

module.exports = {
  networks: {
    hardhat: {
      // No necesitas configurar nada aquí si estás usando Hardhat en modo local
    },
    besu: {
      url: "http://localhost:8545", // Cambia esta URL según tu entorno de red
      accounts: ["8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63"], // Escribir la clave privada aquí
      gasPrice: 0, // Precio del gas
      gas: "auto", // Limite de gas
      chainId: 1337, // ID de la cadena de la red Besu
    },
  },
  solidity: {
    version: "0.8.0",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};

