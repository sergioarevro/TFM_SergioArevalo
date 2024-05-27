//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

import "./OracleCallerInterface.sol";
import "./DataOracleInterface.sol";

contract DataOracle is DataOracleInterface, Ownable {
    uint private randNonce = 0;
    uint private modulus = 1000;

    mapping(uint256 => bool) pendingRequests;

    event GetLatestDataEvent(address callerAddress, uint id);
    //event SetLatestDataEvent(string data, address callerAddress);
    event SetLatestDataEvent(uint256 tokens, address employeeAddress);

    function getLatestData() external override returns (uint256) {
        randNonce++;
        uint id = uint(
            keccak256(abi.encodePacked(block.timestamp, msg.sender, randNonce))
        ) % modulus;
        pendingRequests[id] = true;
        emit GetLatestDataEvent(msg.sender, id);
        return id;
    }

    //TODO modificar la info que le llega para que sea del tipo 100 tokens a la dirección 0x1242342...
    /*function setLatestData(
        string memory _data,
        address _callerAddress,
        uint256 _id
    ) public onlyOwner {
        require(
            pendingRequests[_id],
            "This request is not in my pending list."
        );
        delete pendingRequests[_id];
        OracleCallerInterface callerContractInstance;
        callerContractInstance = OracleCallerInterface(_callerAddress);
        callerContractInstance.callback(_id, _data);
        emit SetLatestDataEvent(_data, _callerAddress);
    }*/

    function setLatestData(
        uint256 _tokens,
        address _employeeAddress,
        address _callerAddress,
        uint256 _id
    ) public onlyOwner {
        require(
            pendingRequests[_id],
            "This request is not in my pending list."
        );
        delete pendingRequests[_id];
        OracleCallerInterface callerContractInstance;
        callerContractInstance = OracleCallerInterface(_callerAddress);
        callerContractInstance.callback(_id, _tokens, _employeeAddress);
        emit SetLatestDataEvent(_tokens, _employeeAddress);
    }
}
