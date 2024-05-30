const { ethers } = require("ethers");
const { getInstance } = require ('./addresses.js');
const addresses = getInstance();

const OracleCallerJSON = require(__dirname + '/../artifacts/contracts/oracle/OracleCaller.sol/OracleCaller.json');

const oracleCallerAddress = addresses.getOracleCallerAddress();

(async () => {
  const provider = new ethers.providers.JsonRpcProvider();
  const wallet = new ethers.Wallet("0x8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63");
  const signer = wallet.connect(provider);

  console.log('Signer address:', await signer.getAddress());
  console.log('Oracle Caller address: ', oracleCallerAddress);

  const oracleCaller = new ethers.Contract(
    oracleCallerAddress,
    OracleCallerJSON.abi,
    signer
  );

  // Trigger update data!
  const tx = await oracleCaller.updateData();
  await tx.wait();
})()
