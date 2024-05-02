//const ERC1400 = artifacts.require("../contracts/ERC1400/ERC1400.sol");
const SimpleStorage = artifacts.require("../contracts/SimpleStorage");

const controller = '0xFE3B557E8Fb62b89F4916B721be55cEb828dBd73';

const partition1 = '0x7265736572766564000000000000000000000000000000000000000000000000'; // reserved in hex
const partitions = [partition1];

module.exports = function(deployer, accounts) {
  //deployer.deploy(ERC1400);
  deployer.deploy(SimpleStorage, 'ERC1400Token', 'SEC', 1, [controller], partitions);
  //const optionNames = ["Option 1", "Option 2", "Option 3"]; // Nombres de las opciones de voto
  //deployer.deploy(Voting, optionNames);
};

