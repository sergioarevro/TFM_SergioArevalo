pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract HealthyToken is ERC20, Ownable {
    event newTransferDone(uint256 amount, address employeeAddres);
    event newMintDonde(uint256 amount);

    constructor(uint256 _initialSupply) ERC20("HealthyToken", "HT") {
        _mint(msg.sender, _initialSupply);
        emit newMintDonde(_initialSupply);
    }

    function transferFrom(
        address _sender,
        address _employeeAddress,
        uint256 _amount
    ) public override onlyOwner returns (bool) {
        bool result = super.transferFrom(_sender, _employeeAddress, _amount);
        if (result) {
            emit newTransferDone(_amount, _employeeAddress);
        }
        return result;
    }
}
