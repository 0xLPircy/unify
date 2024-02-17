// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {Script} from "forge-std/Script.sol";
import {HelperConfig} from "../HelperConfig.s.sol";
import {Utils} from "../../src/Utils.sol";

contract SetUpUtils is Script {
    uint256[] public chainIds = [11155111, 80001, 43113];

    function setUpUtils(address _utils, uint256 chainId, address _router, uint64 _chainSelector) public {
        vm.startBroadcast();
        Utils utils = Utils(_utils);
        utils.setChainIdToRouterAddress(chainId, _router);
        utils.setChainIdToChainSelector(chainId, _chainSelector);
        vm.stopBroadcast();
    }

    function setUpUtilsUsingConfigs() public {
        HelperConfig helperConfig = new HelperConfig();
        address utils = helperConfig.getUtilsAddress(block.chainid);
        for (uint256 i = 0; i < chainIds.length; i++) {
            (address router, uint64 chainSelector,) = helperConfig.getChainDetails(chainIds[i]);
            setUpUtils(utils, chainIds[i], router, chainSelector);
        }
    }

    function run() public {
        setUpUtilsUsingConfigs();
    }
}

contract SetTreasuryCrossChainAddress is Script {
    uint256[] public chainIds = [11155111, 80001, 43113];

    function setTreasuryCrossChainAddress(address _utils, uint256 _chainId, address _treasuryCrossChainAddress)
        public
    {
        vm.startBroadcast();
        Utils utils = Utils(_utils);
        utils.setChainIdToTreasuryCrossChainAddress(_chainId, _treasuryCrossChainAddress);
        vm.stopBroadcast();
    }

    function setTreasuryCrossChainAddressUsingConfigs() public {
        HelperConfig helperConfig = new HelperConfig();
        address utils = helperConfig.getUtilsAddress(block.chainid);
        for (uint256 i = 0; i < chainIds.length; i++) {
            address treasuryCrossChainAddress = helperConfig.getTreasuryCrossChainAddress(chainIds[i]);

            setTreasuryCrossChainAddress(utils, chainIds[i], treasuryCrossChainAddress);
        }
    }

    function run() public {
        setTreasuryCrossChainAddressUsingConfigs();
    }
}
