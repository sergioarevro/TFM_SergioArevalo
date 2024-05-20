const hre = require("hardhat");
const { ethers } = require("ethers");
const MyContractJSON = require(__dirname + '/../artifacts/contracts/MyContract.sol/MyContract.json');
  
async function deployContract() {
    //TODO: (modificar el nombre del contrato) Deploy MyContract.sol
    const MyContract = await hre.ethers.getContractFactory("MyContract");
    const dataOracleAddress = '0x42699A7612A82f1d9C36148af9C77354759b210b';
    const oracleCallerAddress = '0xa50a51c09a5c451C52BB714527E1974b686D8e77';
    const myContract = await MyContract.deploy();
    await myContract.deployed();
    console.log("MyContract deployed to: ", myContract.address);

    /*const oracleCaller = new ethers.Contract(
      oracleCallerAddress,
      OracleCallerJSON.abi,
      signer
    );

    const tx = await oracleCaller.updateData();
    await tx.wait();*/

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