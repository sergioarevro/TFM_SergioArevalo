const hre = require("hardhat");
const { ethers } = require("ethers");

const HealthyTokenJSON = require(__dirname + '/../artifacts/contracts/HealthyToken.sol/HealthyToken.json');

async function main() {
  // Wallet provider
  const provider = new ethers.providers.JsonRpcProvider();
  const wallet = new ethers.Wallet("0x8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63");
  const signer = wallet.connect(provider);

  // Deployer info
  const deployer = signer;
  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy HealthyToken.sol
  const initialSupply = 1000;
  const HealthyToken = await hre.ethers.getContractFactory("HealthyToken");
  const healthyToken = await HealthyToken.deploy(initialSupply);
  await healthyToken.deployed();
  console.log("HealthyToken deployed to: ", healthyToken.address);

  // Getting initial balance of deployer
  const healthyTokenCaller = new ethers.Contract(
    healthyToken.address,
    HealthyTokenJSON.abi,
    signer
  );
  
    const balance = await healthyTokenCaller.balanceOf(deployer.address);
    console.log("The initial supply of deployer account is: ",balance.toString());

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

  //Set HealthyToken instance on OracleCaller
  const setTokenTx = await oracleCaller.setHealthyTokenInstanceAddress(healthyToken.address);
  await setTokenTx.wait();
  const tokenInstanceAddress = await oracleCaller.getHealthyTokenInstanceAddress();
  console.log('Token oracle instance addr:', tokenInstanceAddress);

  // Deploy MyContract.sol
  /*const MyContract = await hre.ethers.getContractFactory("MyContract");
  const myContract = await MyContract.deploy();
  await myContract.deployed();
  console.log("MyContract deployed to: ", myContract.address);*/
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
