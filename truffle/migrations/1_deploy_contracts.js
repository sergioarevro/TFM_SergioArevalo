const SimpleStorage = artifacts.require("../contracts/SimpleStorage");
const ERC1400 = artifacts.require("../contracts/ERC1400/ERC1400.sol");

module.exports = function(deployer, accounts) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(ERC1400);
  //const optionNames = ["Option 1", "Option 2", "Option 3"]; // Nombres de las opciones de voto
  //deployer.deploy(Voting, optionNames);
};

