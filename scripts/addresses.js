const fs = require('fs');
const path = require('path');

const addressesFile = path.join(__dirname, 'addresses.json');

function saveAddresses(addresses) {
    fs.writeFileSync(addressesFile, JSON.stringify(addresses, null, 2));
}

function loadAddresses() {
    if (fs.existsSync(addressesFile)) {
        return JSON.parse(fs.readFileSync(addressesFile));
    }
    return {};
}

let addresses = loadAddresses();
let instance = null;

function setDeployerAddress(address) {
    if (isValidAddress(address)) {
        addresses.deployerAddress = address;
        saveAddresses(addresses);
    } else {
        console.error('La dirección del contrato no es válida:', address);
    }
}

function getDeployerAddress() {
    return addresses.deployerAddress;
}

function setDataOracleAddress(address) {
    if (isValidAddress(address)) {
        addresses.dataOracleAddress = address;
        saveAddresses(addresses);
    } else {
        console.error('La dirección del contrato no es válida:', address);
    }
}

function getDataOracleAddress() {
    return addresses.dataOracleAddress;
}

function setOracleCallerAddress(address) {
    if (isValidAddress(address)) {
        addresses.oracleCallerAddress = address;
        saveAddresses(addresses);
    } else {
        console.error('La dirección del contrato no es válida:', address);
    }
}

function getOracleCallerAddress() {
    return addresses.oracleCallerAddress;
}

function setOracleInstanceAddress(address) {
    if (isValidAddress(address)) {
        addresses.oracleInstanceAddress = address;
        saveAddresses(addresses);
    } else {
        console.error('La dirección del contrato no es válida:', address);
    }
}

function getOracleInstanceAddress() {
    return addresses.oracleInstanceAddress;
}

function setHealthyTokenAddress(address) {
    if (isValidAddress(address)) {
        addresses.healthyTokenAddress = address;
        saveAddresses(addresses);
    } else {
        console.error('La dirección del contrato no es válida:', address);
    }
}

function getHealthyTokenAddress() {
    return addresses.healthyTokenAddress;
}

function isValidAddress(address) {
    return ethers.utils.isAddress(address);
}

function getInstance() {
    if (!instance) {
        instance = {
            setDeployerAddress,
            getDeployerAddress,
            setDataOracleAddress,
            getDataOracleAddress,
            setOracleCallerAddress,
            getOracleCallerAddress,
            setOracleInstanceAddress,
            getOracleInstanceAddress,
            setHealthyTokenAddress,
            getHealthyTokenAddress
        };
    }
    return instance;
}

module.exports = {
    getInstance
};