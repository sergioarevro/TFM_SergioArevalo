const hre = require("hardhat");
const { ethers } = require("ethers");

const { getInstance } = require ('./addresses.js');
const addresses = getInstance();

const HealthyTokenJSON = require(__dirname + '/../artifacts/contracts/HealthyToken.sol/HealthyToken.json');

async function main() {
  // Wallet provider
  const provider = new ethers.providers.JsonRpcProvider();
  const wallet = new ethers.Wallet("0x8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63");
  const signer = wallet.connect(provider);

  // Deployer info
  const deployer = signer;
  addresses.setDeployerAddress(deployer.address);
  console.log("Desplegando los contratos con la cuenta:", addresses.getDeployerAddress());

  // Deploy HealthyToken.sol
  const initialSupply = 1000;
  const HealthyToken = await hre.ethers.getContractFactory("HealthyToken");
  const healthyToken = await HealthyToken.deploy(initialSupply);
  await healthyToken.deployed();
  addresses.setHealthyTokenAddress(healthyToken.address);
  console.log("HealthyToken desplegado en la dirección: ", addresses.getHealthyTokenAddress());

  // Getting initial balance of deployer
  const healthyTokenCaller = new ethers.Contract(
    healthyToken.address,
    HealthyTokenJSON.abi,
    signer
  );
  
  const balance = await healthyTokenCaller.balanceOf(signer.address);
  console.log("El balance inicial de la cuenta del deployer es: ",balance.toString());

  // Deploy DataOracle
  const DataOracle = await hre.ethers.getContractFactory("DataOracle");
  const dataOracle = await DataOracle.deploy();
  await dataOracle.deployed();
  addresses.setDataOracleAddress(dataOracle.address);
  console.log("DataOracle desplegado en la dirección:", addresses.getDataOracleAddress());

  // Deploy OracleCaller
  const OracleCaller = await hre.ethers.getContractFactory("OracleCaller");
  const oracleCaller = await OracleCaller.deploy();
  await oracleCaller.deployed();
  addresses.setOracleCallerAddress(oracleCaller.address);
  console.log("OracleCaller desplegado en la dirección:", addresses.getOracleCallerAddress());

  //Approve OracleCaller to spent tokens for tranfer
  const setAllowanceTx = await healthyTokenCaller.approve(addresses.getOracleCallerAddress(), balance);
  await setAllowanceTx.wait();
  const OracleCallerAllowance = await healthyTokenCaller.allowance(signer.address, addresses.getOracleCallerAddress());
  console.log("Oracle Caller allowance: ", OracleCallerAllowance.toString());

  // Set oracle instance on OracleCaller
  const setInstanceTx = await oracleCaller.setOracleInstanceAddress(dataOracle.address);
  await setInstanceTx.wait();
  const oracleInstanceAddress = await oracleCaller.getOracleInstanceAddress();
  addresses.setOracleInstanceAddress(oracleInstanceAddress);
  console.log('Instancia OracleCaller en la dirección:', addresses.getOracleInstanceAddress());

  //Set HealthyToken instance on OracleCaller
  const setTokenTx = await oracleCaller.setHealthyTokenInstanceAddress(healthyToken.address);
  await setTokenTx.wait();
  const tokenInstanceAddress = await oracleCaller.getHealthyTokenInstanceAddress();
  addresses.setHealthyTokenAddress(tokenInstanceAddress);
  console.log('Instancia de HealthyToken en la dirección:', addresses.getHealthyTokenAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
