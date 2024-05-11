const { ethers } = require("ethers");

const OracleCallerJSON = require(__dirname + '/../artifacts/contracts/oracle/OracleCaller.sol/OracleCaller.json');

// TODO: do not hardcode these!
//const oracleCallerAddress = '0x8A791620dd6260079BF849Dc5567aDC3F2FdC318';
const oracleCallerAddress = '0x2E1f232a9439C3D459FcEca0BeEf13acc8259Dd8';

(async () => {
  // We first initialize ethers by creating a provider using our local node
  const provider = new ethers.providers.JsonRpcProvider();

  //const signer = provider.getSigner(0);
  const signer = provider.getSigner('0xF0e244Cfa3E36F45f84130c44958Ae56D7bEd841');
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
