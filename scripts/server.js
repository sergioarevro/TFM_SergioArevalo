const hre = require("hardhat");
const { ethers } = require("ethers");
const axios = require('axios');

const { getInstance } = require ('./addresses.js');
const addresses = getInstance();
const dataOracleAddress = addresses.getDataOracleAddress();
const oracleCallerAddress = addresses.getOracleCallerAddress();
const healthyTokenAddress = addresses.getHealthyTokenAddress();
const deployerAddress = addresses.getDeployerAddress();

const DataOracleJSON = require(__dirname + '/../artifacts/contracts/oracle/DataOracle.sol/DataOracle.json');
const OracleCallerJSON = require(__dirname + '/../artifacts/contracts/oracle/OracleCaller.sol/OracleCaller.json');
const HealthyTokenJSON = require(__dirname + '/../artifacts/contracts/HealthyToken.sol/HealthyToken.json');

const MAX_RETRIES = 1;
const PROCESS_CHUNK = 3;

let pendingRequestQueue = []

async function fetchData() {
  const url = 'https://raw.githubusercontent.com/sergioarevro/project/main/info.json';
  const response = await axios.get(url);
  const data = response.data;
  return data;
}

  async function checkBalance(tokensToTransfer, healthyToken){
    const balance = await healthyToken.balanceOf(deployerAddress);
    console.log("SERVER - checkBalance - Deployer balance: ", balance.toString());
    if (balance < tokensToTransfer){
      try{
        const tx = await healthyToken.mint(10000, oracleCallerAddress);
        await tx.wait();
        const balance = await healthyToken.balanceOf(deployerAddress);
        console.log("SERVER - checkBalance - Nuevo minado. Deployer balance: ", balance.toString());
      } catch (error){
        console.log("SERVER - checkBalance - Error en el minado de tokens.");
        console.log(error);
      }
    }
  }

//async function setLatestData(dataOracle, id, data) {
  async function setLatestData(dataOracle, id, tokens, employeeAddress, lastOne){
  try {
    //const tx = await dataOracle.setLatestData(data, oracleCallerAddress, id);
    const tx = await dataOracle.setLatestData(tokens, employeeAddress, oracleCallerAddress, id, lastOne);
    await tx.wait();
  } catch (error) {
    console.log('SERVER - Error llamando a setLatestData');
    console.log(error);
  }
}

async function processRequest(dataOracle, id, healthyToken) {
  let retries = 0

  while (retries < MAX_RETRIES) {
    try {
      const data = await fetchData()
      
      //Gestión de la logica para transferencias
      const tokensPerMin = data['deporte-tokens'];
      const employees = data.empleados;

      for (let i = 0; i < employees.length; i++) {
        const employee = employees[i];
        const name = employee.nombre;
        const sports = employee.deportes;
        const employeeAddress = employee.cuenta;
        let totalTokens = 0;
        
        for (const sport in sports) {
          const exerciseTime = sports[sport];
          const tokensPerSport = tokensPerMin[sport] || 0;
          const tokensEarned = exerciseTime * tokensPerSport;
          totalTokens += tokensEarned;
        }
        
        console.log(`SERVER - Total de tokens para ${name}: ${totalTokens}`);
        
        const lastOne = i === employees.length - 1 ? true : false;

        if (totalTokens == 0) {
          console.log('SERVER - No se realiza transferencia a ${name}. No ha realizado actividad física.');
        }
        await checkBalance(totalTokens, healthyToken);
        await setLatestData(dataOracle, id, totalTokens, employeeAddress, lastOne);
      }
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

async function processRequestQueue(dataOracle, healthyToken) {
  console.log(">> SERVER - A la espera de solicitudes.");

  let processedRequests = 0;
  while (pendingRequestQueue.length > 0 && processedRequests < PROCESS_CHUNK) {
    const reqId = pendingRequestQueue.shift();
    await processRequest(dataOracle, reqId, healthyToken);
    processedRequests++;
  }
}

(async () => {
  const provider = new ethers.providers.JsonRpcProvider();
  const wallet = new ethers.Wallet("0x8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63");
  const signer = wallet.connect(provider);

  console.log('SERVER - Signer address:', await signer.getAddress());
  console.log('SERVER - Data Oracle Address: ', dataOracleAddress);
  console.log('SERVER - Oracle Caller Address: ', oracleCallerAddress);
  console.log('SERVER - Healthy Token Address: ', healthyTokenAddress);

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

  const healthyToken = new ethers.Contract(
    healthyTokenAddress,
    HealthyTokenJSON.abi,
    signer
  );

  oracleCaller.on("ReceivedNewRequestIdEvent", (_id) => {
    console.log("SERVER - Recibida una solicitud de actualización de datos.");
    pendingRequestQueue.push(_id);
  })

  oracleCaller.on("DataUpdatedEvent", (_id, _data) => {
    console.log("SERVER - Ultima solicitud realizada correctamente.");
  })

  setInterval(async () => {
    processRequestQueue(dataOracle, healthyToken);
  }, 2000);

})()
