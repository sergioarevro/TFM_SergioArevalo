//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

//Añadido por mi
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "./DataOracleInterface.sol";
import "./OracleCallerInterface.sol";
import "../HealthyToken.sol";

contract OracleCaller is OracleCallerInterface, Ownable {
    uint256 tokens;
    address employeeAddress;

    DataOracleInterface private oracleInstance;
    address private oracleAddress;

    IERC20 private healthyToken;
    address private healthyTokenAddress;

    mapping(uint256 => bool) myRequests;

    event newOracleAddressEvent(address oracleAddress);
    event ReceivedNewRequestIdEvent(uint256 id);
    event DataUpdatedEvent(uint256 id, uint256 tokens, address employeeAddress);

    //TODO modificar que devuelva la ultima transacción
    function getData() public view returns (string memory) {}

    function getOracleInstanceAddress() public view returns (address) {
        return oracleAddress;
    }

    function setOracleInstanceAddress(
        address _oracleInstanceAddress
    ) public onlyOwner {
        oracleAddress = _oracleInstanceAddress;
        oracleInstance = DataOracleInterface(oracleAddress);
        emit newOracleAddressEvent(oracleAddress);
    }

    //Añadida por mi
    function setHealthyTokenInstanceAddress(
        address _healthyToken
    ) public onlyOwner {
        healthyTokenAddress = _healthyToken;
        healthyToken = IERC20(_healthyToken);
    }

    function getHealthyTokenInstanceAddress() public view returns (address) {
        return healthyTokenAddress;
    }

    function updateData() public {
        uint256 id = oracleInstance.getLatestData();
        myRequests[id] = true;
        emit ReceivedNewRequestIdEvent(id);
    }

    function callback(
        address _owner,
        uint256 _id,
        uint256 _tokens,
        address _employeeAddress,
        bool _lastOne
    ) external override onlyOracle {
        require(myRequests[_id], "This request is not in my pending list.");
        tokens = _tokens;
        employeeAddress = _employeeAddress;
        healthyToken.transferFrom(_owner, _employeeAddress, _tokens);

        if (_lastOne) delete myRequests[_id];
        emit DataUpdatedEvent(_id, _tokens, _employeeAddress);
    }

    modifier onlyOracle() {
        require(
            msg.sender == oracleAddress,
            "You are not authorized to call this function."
        );
        _;
    }
}
