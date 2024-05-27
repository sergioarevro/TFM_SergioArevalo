//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

interface OracleCallerInterface {
    function callback(
        uint256 _id,
        uint256 _tokens,
        address _employeeAddress
    ) external;
}
