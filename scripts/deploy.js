const hre = require("hardhat");
const { ethers } = require("ethers");

const TFMTokenJSON = require(__dirname + '/../artifacts/contracts/TFMToken.sol/TFMToken.json');

async function main() {
  // Wallet provider
  const provider = new ethers.providers.JsonRpcProvider();
  const wallet = new ethers.Wallet("0x8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63");
  const signer = wallet.connect(provider);

  // Deployer info
  const deployer = signer;
  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy DataOracle
  const DataOracle = await hre.ethers.getContractFactory("DataOracle");
  const dataOracle = await DataOracle.deploy();
  await dataOracle.deployed();
  console.log("DataOracle deployed to:", dataOracle.address);

  // Deploy OracleCaller
  const OracleCaller = await hre.ethers.getContractFactory("OracleCaller");
  const oracleCaller = await OracleCaller.deploy();
  await oracleCaller.deployed();
  console.log("OracleCaller deployed to:", oracleCaller.address);

  // Set oracle instance on OracleCaller
  const setInstanceTx = await oracleCaller.setOracleInstanceAddress(dataOracle.address);
  await setInstanceTx.wait();
  const oracleInstanceAddress = await oracleCaller.getOracleInstanceAddress();
  console.log('OracleCaller oracle instance addr:', oracleInstanceAddress);

  // Deploy MyContract.sol
  const MyContract = await hre.ethers.getContractFactory("MyContract");
  const myContract = await MyContract.deploy();
  await myContract.deployed();
  console.log("MyContract deployed to: ", myContract.address);

  // Deploy TFMToken.sol
  const initialSupply = 1000;
  const TFMToken = await hre.ethers.getContractFactory("TFMToken");
  const tfmToken = await TFMToken.deploy(initialSupply);
  await tfmToken.deployed();
  console.log("TFMToken deployed to: ", tfmToken.address);

  // Getting initial balance of deployer
  const tokenCaller = new ethers.Contract(
    tfmToken.address,
    TFMTokenJSON.abi,
    signer
  );

  const balance = await tokenCaller.balanceOf(deployer.address);
  console.log("The initial supply of deployer account is: ",balance.toString());

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
