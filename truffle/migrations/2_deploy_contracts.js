//const ERC1400 = artifacts.require("../contracts/ERC1400/ERC1400.sol");
const SimpleStorage = artifacts.require("../contracts/SimpleStorage");

const controller = '0xfe3b557e8fb62b89f4916b721be55ceb828dbd73';

const partition1 = '0x7265736572766564000000000000000000000000000000000000000000000000'; // reserved in hex
const partition2 = '0x6973737565640000000000000000000000000000000000000000000000000000'; // issued in hex
const partition3 = '0x6c6f636b65640000000000000000000000000000000000000000000000000000'; // locked in hex
const partitions = [partition1, partition2, partition3];

module.exports = function(deployer, accounts) {
  //deployer.deploy(ERC1400);
  deployer.deploy(SimpleStorage, 'ERC1400Token', 'DAU', 1, [controller], partitions);
  //const optionNames = ["Option 1", "Option 2", "Option 3"]; // Nombres de las opciones de voto
  //deployer.deploy(Voting, optionNames);
};

