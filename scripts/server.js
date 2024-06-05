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
  console.log('SERVER: Buscando información sobre la actividad fisica de los empleados en info.json.');
  const url = 'https://raw.githubusercontent.com/sergioarevro/project/main/info.json';
  const response = await axios.get(url);
  const data = response.data;
  return data;
}

  async function checkBalance(tokensToTransfer, healthyToken){
    const balance = await healthyToken.balanceOf(deployerAddress);
    console.log('SERVER: Consultando el balance del Deployer. Balance: ', balance.toString());
    if (balance < tokensToTransfer){
      console.log('SERVER: Se necesita un nuevo minado de tokens.');
      try{
        const tx = await healthyToken.mint(10000, oracleCallerAddress);
        await tx.wait();
        const mintTransactionHash = tx.hash;
        console.log("Hash de la transacción de minado:", mintTransactionHash);
        const balance = await healthyToken.balanceOf(deployerAddress);
        console.log("SERVER: Nuevo minado realizado. Deployer balance: ", balance.toString());
      } catch (error){
        console.log("SERVER: Error en el minado de tokens.");
        console.log(error);
      }
    }
  }

  async function setLatestData(dataOracle, id, tokens, employeeAddress, lastOne){
  try {
    console.log('SERVER: Enviando la información sobre las transferencias a DataOracle.sol');
    const tx = await dataOracle.setLatestData(tokens, employeeAddress, oracleCallerAddress, id, lastOne);
    await tx.wait();
  } catch (error) {
    console.log('SERVER: Error llamando a setLatestData');
    console.log(error);
  }
}

async function processRequest(dataOracle, id, healthyToken) {
  let retries = 0

  while (retries < MAX_RETRIES) {
    try {
      const data = await fetchData()

      const tokensPerMin = data['deporte-tokens'];
      const employees = data.empleados;

      for (let i = 0; i < employees.length; i++) {
        const employee = employees[i];
        const name = employee.nombre;
        const sports = employee.deportes;
        const employeeAddress = employee.cuenta;
        let totalTokens = 0;

        console.log(`\n->SERVER: Iniciando el cálculo de tokens para ${name}`);
        
        for (const sport in sports) {
          const exerciseTime = sports[sport];
          const tokensPerSport = tokensPerMin[sport] || 0;
          const tokensEarned = exerciseTime * tokensPerSport;
          totalTokens += tokensEarned;
        }
        
        console.log(`SERVER: Total de tokens para ${name}: ${totalTokens} tokens.`);
        
        const lastOne = i === employees.length - 1 ? true : false;

        if (totalTokens == 0) {
          console.log(`SERVER: No se realiza transferencia a ${name}. No ha realizado actividad física.`);
        } else{
          await checkBalance(totalTokens, healthyToken);
          await setLatestData(dataOracle, id, totalTokens, employeeAddress, lastOne);
        }
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
  //console.log(">> SERVER - A la espera de solicitudes.");

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

  console.log('=========================== Iniciando server ===============================');
  console.log('Signer address:', await signer.getAddress());
  console.log('Data Oracle Address: ', dataOracleAddress);
  console.log('Oracle Caller Address: ', oracleCallerAddress);
  console.log('Healthy Token Address: ', healthyTokenAddress);
  console.log('============================================================================\n');
  console.log('SERVER: A la espera de solicitudes.\n');

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
    console.log("-> AVISO: Mensaje recibido desde OracleCaller.sol\n-> Recibida una solicitud de actualización de datos.\n");
    pendingRequestQueue.push(_id);
  })

  oracleCaller.on("DataUpdatedEvent", (_id, _tokens, _employeeAddress) => {
    console.log('-> AVISO: Mensaje emitido desde OracleCaller.sol\n-> La información ha llegado correctamente a la Blockchain.\n-> Realizando comunicación con HealthyToken.sol.\n');
  })

  healthyToken.on("newTransferDone" ,(_amount, _employeeAddress) => {
    console.log(`-> AVISO: Mensaje emitido desde HealthyToken.sol\n-> La transferencia de ${_amount} tokens a la cuenta ${_employeeAddress} se ha realizado correctamente.\n`)
  })

  healthyToken.on("newMintDone", (_tokens) => {
    console.log(`-> AVISO: Mensaje emitido desde HealthyToken.sol\n-> El minado de ${_tokens} nuevos tokens se ha realizado correctamente.\n`)
  })

  dataOracle.on("SetLatestDataEvent", (_tokens, _employeeAddress) => {
    console.log(`-> AVISO: Mensaje emitido desde DataOracle.sol\n-> Se ha transferido la información a OracleCaller.sol.\n`)
  })

  setInterval(async () => {
    processRequestQueue(dataOracle, healthyToken);
  }, 2000);

})()
