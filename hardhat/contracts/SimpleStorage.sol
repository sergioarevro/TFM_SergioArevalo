// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

import "./ERC1400/ERC1400.sol";

contract SimpleStorage is ERC1400 {
    uint256 public simpleData;

    /**
     * @dev Initialize ERC1400 + register the contract implementation in ERC1820Registry.
     * @param tokenName Name of the token.
     * @param tokenSymbol Symbol of the token.
     * @param tokenGranularity Granularity of the token.
     * @param initialControllers Array of initial controllers.
     * @param defaultPartitions Partitions chosen by default, when partition is
     * not specified, like the case ERC20 tranfers.
     */
    constructor(
        string memory tokenName,
        string memory tokenSymbol,
        uint256 tokenGranularity,
        address[] memory initialControllers,
        bytes32[] memory defaultPartitions
    )
        ERC1400(
            tokenName,
            tokenSymbol,
            tokenGranularity,
            initialControllers,
            defaultPartitions
        )
    {
        //_addController(msg.sender);
        // Resto de inicializaciones
    }

    function setData(uint256 _data) public {
        simpleData = _data;
    }

    function getData() public view returns (uint256) {
        return simpleData;
    }
}
