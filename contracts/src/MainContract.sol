// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {CrossChain} from "./CrossChain.sol";

contract MainContract {
    error MainContract__UnequalArray();
    error MainContract__ZeroAddress();

    event MainContract__AssetsSent(address indexed to, uint256 indexed amount, uint8 indexed txCounter);

    address public s_crossChain;

    uint8 public tx_counter = 0;

    constructor(address _crossChain) {
        s_crossChain = _crossChain;
    }

    modifier isZeroAddress(address _address) {
        if (_address == address(0)) {
            revert MainContract__ZeroAddress();
        }
        _;
    }

    function sendAssets(address _to, uint256[] memory _chainIds, uint256[] memory _amounts)
        external
        isZeroAddress(_to)
    {
        if (_chainIds.length != _amounts.length) {
            revert MainContract__UnequalArray();
        }
        for (uint256 i = 0; i < _chainIds.length; i++) {
            // call CCIP contract to transfer funds to the `chainIds[i]` chain treasury address
            CrossChain(s_crossChain).sendAssetsToTreasury(msg.sender, _amounts[i], _chainIds[i], tx_counter);
        }

        emit MainContract__AssetsSent(_to, _amounts[0], tx_counter);

        unchecked {
            tx_counter++;
        }
    }
}
