const hre = require("hardhat");
const { ethers } = require("ethers");
const MyContractJSON = require(__dirname + '/../artifacts/contracts/MyContract.sol/MyContract.json');
  
async function deployContract() {
    //TODO: (modificar el nombre del contrato) Deploy MyContract.sol
    const MyContract = await hre.ethers.getContractFactory("MyContract");
    const dataOracleAddress = '0x5EB5888938e3fE7b334b1838B19C1e828c5148aA';
    const oracleCallerAddress = '0x4261D524bc701dA4AC49339e5F8b299977045eA5';
    const myContract = await MyContract.deploy();
    await myContract.deployed();
    console.log("MyContract deployed to: ", myContract.address);

    const myContractCaller = new ethers.Contract(
        myContract.address,
        MyContractJSON.abi,
        signer
      );

    await myContractCaller.setOracleCaller(oracleCallerAddress);
    console.log("Oracle Caller Address set to MyContract.sol");

    const responseTest = await myContractCaller.getOracleData();
    console.log("The oracle data is: ", responseTest);
}

const provider = new ethers.providers.JsonRpcProvider();
const wallet = new ethers.Wallet("0x8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63");
//connect the wallet to the provider
const signer = wallet.connect(provider);

//const deployer = await ethers.getSigner();
const deployer = signer;
console.log("Deploying contracts with the account:", deployer.address);

deployContract();