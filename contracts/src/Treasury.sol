// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Treasury {
    error Tresury__FundsReceiveFailed(address user, uint256 amount, uint8 txCounter);
    error Tresury__FundsSendFailed(address to, uint256 amount, uint8 txCounter);

    event Treasury__FundsReceived(address indexed user, uint256 indexed amount, uint8 indexed txCounter);
    event Treasury__FundsSent(address indexed to, uint256 indexed amount, uint8 indexed txCounter);

    address public i_usdc;

    constructor(address _usdc) {
        i_usdc = _usdc;
    }

    function receiveFunds(address _user, uint256 _amount, uint8 _txCounter) external {
        bool isSucess = IERC20(i_usdc).transferFrom(_user, address(this), _amount);

        if (!isSucess) revert Tresury__FundsReceiveFailed(_user, _amount, _txCounter);

        emit Treasury__FundsReceived(_user, _amount, _txCounter);
    }

    function sendFunds(address _to, uint256 _amount, uint8 _txCounter) external {
        bool isSuccess = IERC20(i_usdc).transfer(_to, _amount);

        if (!isSuccess) revert Tresury__FundsSendFailed(_to, _amount, _txCounter);

        emit Treasury__FundsSent(_to, _amount, _txCounter);
    }
}
