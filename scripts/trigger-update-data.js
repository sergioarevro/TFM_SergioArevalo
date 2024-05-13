const { ethers } = require("ethers");

const OracleCallerJSON = require(__dirname + '/../artifacts/contracts/oracle/OracleCaller.sol/OracleCaller.json');

// TODO: do not hardcode these!
//const oracleCallerAddress = '0x8A791620dd6260079BF849Dc5567aDC3F2FdC318';
const oracleCallerAddress = '0x686AfD6e502A81D2e77f2e038A23C0dEf4949A20';

(async () => {
  // We first initialize ethers by creating a provider using our local node
  const provider = new ethers.providers.JsonRpcProvider();

  const signer = provider.getSigner();
  //const signer = provider.getSigner('0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199');
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
