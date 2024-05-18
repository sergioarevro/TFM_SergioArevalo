pragma solidity ^0.8.0;

import "./oracle/OracleCaller.sol";

contract MyContract {
    address public oracleCallerAddress;
    OracleCaller oracleCaller;
    //address public dataCaller;

    constructor() {}

    //Setters and Getters
    function setOracleCaller(address _oracleCallerAddress) public {
        oracleCallerAddress = _oracleCallerAddress;
        oracleCaller = OracleCaller(oracleCallerAddress);
    }

    function getOracleData() public returns (string memory) {
        string memory oracleData = oracleCaller.getData();
        return oracleData;
    }
}
