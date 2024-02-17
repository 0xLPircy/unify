// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {TreasuryCrossChain} from "./TreasuryCrossChain.sol";

contract MainContract {
    error MainContract__UnequalArray();
    error MainContract__ZeroAddress();

    event MainContract__AssetsSent(address indexed to, uint256 indexed amount, uint8 indexed txCounter);

    address public s_treasuryCrossChain;

    uint8 public tx_counter = 0;

    constructor(address _treasuryCrossChain) {
        s_treasuryCrossChain = _treasuryCrossChain;
    }

    modifier isZeroAddress(address _address) {
        if (_address == address(0)) {
            revert MainContract__ZeroAddress();
        }
        _;
    }

    function setTreasuryCrossChain(address _treasuryCrossChain) external {
        s_treasuryCrossChain = _treasuryCrossChain;
    }

    function sendAssets(address _to, uint256[] memory _chainIds, uint256[] memory _amounts)
        external
        isZeroAddress(_to)
    {
        if (_chainIds.length != _amounts.length) {
            revert MainContract__UnequalArray();
        }

        // call CCIP contract to transfer funds to the `chainIds[i]` chain treasury address
        TreasuryCrossChain(payable(s_treasuryCrossChain)).sendAssetsToTreasury(
            msg.sender, _chainIds, _amounts, tx_counter
        );

        emit MainContract__AssetsSent(_to, _amounts[0], tx_counter);

        unchecked {
            tx_counter++;
        }
    }
}
