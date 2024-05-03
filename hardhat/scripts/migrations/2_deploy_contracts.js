const { ethers } = require("hardhat");

const controller = '0xfe3b557e8fb62b89f4916b721be55ceb828dbd73';

const partition1 = '0x7265736572766564000000000000000000000000000000000000000000000000'; // reserved in hex
const partition2 = '0x6973737565640000000000000000000000000000000000000000000000000000'; // issued in hex
const partition3 = '0x6c6f636b65640000000000000000000000000000000000000000000000000000'; // locked in hex
const partitions = [partition1, partition2, partition3];

module.exports = async function (deployments, network, accounts) {
  const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
  const simpleStorage = await SimpleStorage.deploy('ERC1400Token', 'DAU', 1, [controller], partitions);
  await simpleStorage.deployed();
  console.log("SimpleStorage deployed to:", simpleStorage.address);
};



