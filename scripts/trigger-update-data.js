const { ethers } = require("ethers");

const OracleCallerJSON = require(__dirname + '/../artifacts/contracts/oracle/OracleCaller.sol/OracleCaller.json');

// TODO: do not hardcode these!
const oracleCallerAddress = '0xa50a51c09a5c451C52BB714527E1974b686D8e77';

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
