pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TFMToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("TFMToken", "TFM") {
        _mint(msg.sender, initialSupply);
    }
}
