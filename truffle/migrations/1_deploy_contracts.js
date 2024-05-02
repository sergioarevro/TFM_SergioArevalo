const SimpleStorage = artifacts.require("../contracts/SimpleStorage");
const Voting = artifacts.require("Voting")

module.exports = function(deployer, accounts) {
  deployer.deploy(SimpleStorage);
  //const optionNames = ["Option 1", "Option 2", "Option 3"]; // Nombres de las opciones de voto
  //deployer.deploy(Voting, optionNames);
};

