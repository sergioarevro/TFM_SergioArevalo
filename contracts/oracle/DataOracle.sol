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
    event SetLatestDataEvent(uint256 tokens, address employeeAddress);

    modifier onlyOwnerData() {
        require(
            owner() == _msgSender(),
            "DataOracle: caller is not the owner."
        );
        _;
    }

    function getLatestData() external override returns (uint256) {
        randNonce++;
        uint id = uint(
            keccak256(abi.encodePacked(block.timestamp, msg.sender, randNonce))
        ) % modulus;
        pendingRequests[id] = true;
        emit GetLatestDataEvent(msg.sender, id);
        return id;
    }

    function setLatestData(
        uint256 _tokens,
        address _employeeAddress,
        address _callerAddress,
        uint256 _id,
        bool _lastOne
    ) public onlyOwnerData {
        require(
            pendingRequests[_id],
            "This request is not in my pending list."
        );
        if (_lastOne) delete pendingRequests[_id];
        OracleCallerInterface callerContractInstance;
        callerContractInstance = OracleCallerInterface(_callerAddress);
        callerContractInstance.callback(
            msg.sender,
            _id,
            _tokens,
            _employeeAddress,
            _lastOne
        );
        emit SetLatestDataEvent(_tokens, _employeeAddress);
    }
}
