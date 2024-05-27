const hre = require("hardhat");
const { ethers } = require("ethers");
const axios = require('axios');

const jsonreader = require('./jsonreader')

const DataOracleJSON = require(__dirname + '/../artifacts/contracts/oracle/DataOracle.sol/DataOracle.json');
const OracleCallerJSON = require(__dirname + '/../artifacts/contracts/oracle/OracleCaller.sol/OracleCaller.json'); 

const dataOracleAddress = '0xfeae27388A65eE984F452f86efFEd42AaBD438FD';
const oracleCallerAddress = '0xe135783649BfA7c9c4c6F8E528C7f56166efC8a6';

const MAX_RETRIES = 1;
const PROCESS_CHUNK = 3;

let pendingRequestQueue = []

async function fetchData() {
  const url = 'https://raw.githubusercontent.com/sergioarevro/project/main/info.json';
  const response = await axios.get(url);
  const data = response.data;
  return data;
}

//Modificado
//async function setLatestData(dataOracle, id, data) {
  async function setLatestData(dataOracle, id, tokens, employeeAddress){
  try {
    //const tx = await dataOracle.setLatestData(data, oracleCallerAddress, id);
    const tx = await dataOracle.setLatestData(tokens, employeeAddress, oracleCallerAddress, id);
    await tx.wait();
  } catch (error) {
    console.log('Error encountered while calling setLatestData');
    console.log(error);
  }
}

/**TODO la variable data tendrá todo el JSON, pasarselo a un nuevo js que trate todo el json y envíe de 1 en un 1 al setLatestData algo parecido
a 100 tokens a la dirección 0x4532452346234. Hay que seguir modificando el setLatestData del dataOracle para que envíe los datos como queremos.
Después modificar el callback del OracleCaller para que llame al ERC20 y haga la transfer
**/
async function processRequest(dataOracle, id) {
  let retries = 0
  while (retries < MAX_RETRIES) {
    try {
      const data = await fetchData()
      
      //Gestión de la logica para transferencias
      const tokensPerMin = data['deporte-tokens'];
      const employees = data.empleados;

      employees.forEach(employee => {
        const name = employee.nombre;
        const sports = employee.deportes;
        let totalTokens = 0;
    
        for (const sport in sports) {
          const exerciceTime = sports[sport];
          const tokensPerSport = tokensPerMin[sport] || 0;
          const tokensEarned = exerciceTime * tokensPerSport;
          totalTokens += tokensEarned;
          console.log(`${name} ha hecho ${exerciceTime} minutos de ${sport}, lo que equivale a ${tokensEarned} tokens.`);
        }
    
        console.log(`Total de tokens para ${name}: ${totalTokens}`);
      });

      //await setLatestData(dataOracle, id, tokens, employeeAddress);
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
