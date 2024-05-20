const hre = require("hardhat");
const { ethers } = require("ethers");
const axios = require('axios');

const DataOracleJSON = require(__dirname + '/../artifacts/contracts/oracle/DataOracle.sol/DataOracle.json');
const OracleCallerJSON = require(__dirname + '/../artifacts/contracts/oracle/OracleCaller.sol/OracleCaller.json'); 

const dataOracleAddress = '0x42699A7612A82f1d9C36148af9C77354759b210b';
const oracleCallerAddress = '0xa50a51c09a5c451C52BB714527E1974b686D8e77';

const MAX_RETRIES = 1;
const PROCESS_CHUNK = 3;

let pendingRequestQueue = []

async function fetchData() {
  const url ='https://raw.githubusercontent.com/sergioarevro/project/main/info.json?token=GHSAT0AAAAAACQE2QSS2O4TGCXCUEGIK5CIZSLN2KA';
  const response = await axios.get(url);
  const data = response.data;
  console.log('1- ',data);
  console.log('2- ', data.usuarios[0]);
  console.log('Nombre del primer usuario:', data.usuarios[0].nombre);
  console.log('Horas de correr del primer usuario:', data.usuarios[0].deportes.correr);
  return response.data;
}

async function setLatestData(dataOracle, id, data) {
  try {
    const tx = await dataOracle.setLatestData(data, oracleCallerAddress, id);
    await tx.wait();
  } catch (error) {
    console.log('Error encountered while calling setLatestData');
    console.log(error);
  }
}

async function processRequest(dataOracle, id) {
  let retries = 0
  while (retries < MAX_RETRIES) {
    try {
      const data = await fetchData()
      await setLatestData(dataOracle, id, data);
      return;
    } catch (error) {
      if (retries === MAX_RETRIES - 1) {
        // set data to empty string
        await setLatestData(dataOracle, id, "");
        return;
      }
      retries++
    }
  }
}

async function processRequestQueue(dataOracle) {
  console.log(">> processRequestQueue");

  let processedRequests = 0;
  while (pendingRequestQueue.length > 0 && processedRequests < PROCESS_CHUNK) {
    const reqId = pendingRequestQueue.shift();
    await processRequest(dataOracle, reqId);
    processedRequests++;
  }
}

(async () => {
  const provider = new ethers.providers.JsonRpcProvider();
  const wallet = new ethers.Wallet("0x8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63");
  const signer = wallet.connect(provider);

  console.log('Signer address:', await signer.getAddress());

  // Initialize contracts
  const dataOracle = new ethers.Contract(
    dataOracleAddress,
    DataOracleJSON.abi,
    signer
  );

  const oracleCaller = new ethers.Contract(
    oracleCallerAddress,
    OracleCallerJSON.abi,
    signer
  );

  oracleCaller.on("ReceivedNewRequestIdEvent", (_id) => {
    console.log("NEW EVENT - ReceivedNewRequestIdEvent:", _id);
    pendingRequestQueue.push(_id);
  })

  oracleCaller.on("DataUpdatedEvent", (_id, _data) => {
    console.log("NEW EVENT - DataUpdatedEvent: id =", _id, 'data =', _data);
  })

  setInterval(async () => {
    processRequestQueue(dataOracle);
  }, 2000);

})()
