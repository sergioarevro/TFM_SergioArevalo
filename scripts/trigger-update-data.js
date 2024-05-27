const { ethers } = require("ethers");

const OracleCallerJSON = require(__dirname + '/../artifacts/contracts/oracle/OracleCaller.sol/OracleCaller.json');

// TODO: do not hardcode these!
const oracleCallerAddress = '0xe135783649BfA7c9c4c6F8E528C7f56166efC8a6';

(async () => {
  // We first initialize ethers by creating a provider using our local node
  const provider = new ethers.providers.JsonRpcProvider();
  const wallet = new ethers.Wallet("0x8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63");
  //connect the wallet to the provider
  const signer = wallet.connect(provider);

  console.log('Signer address:', await signer.getAddress());

  const oracleCaller = new ethers.Contract(
    oracleCallerAddress,
    OracleCallerJSON.abi,
    signer
  );

  // Trigger update data!
  const tx = await oracleCaller.updateData();
  await tx.wait()
})()
