const MyContract = artifacts.require("SimpleStorage");

module.exports = function(deployer, accounts) {
  deployer.deploy(MyContract);
};

