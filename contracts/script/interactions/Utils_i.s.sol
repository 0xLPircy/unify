// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {Script} from "forge-std/Script.sol";
import {HelperConfig} from "../HelperConfig.s.sol";
import {Utils} from "../../src/Utils.sol";

contract SetUpUtils is Script {
    function setUpUtils(address _utils, address _router, uint64 _chainSelector) public {
        vm.startBroadcast();
        Utils utils = Utils(_utils);
        utils.setChainIdToRouterAddress(block.chainid, _router);
        utils.setChainIdToChainSelector(block.chainid, _chainSelector);
        vm.stopBroadcast();
    }

    function setUpUtilsUsingConfigs() public {
        HelperConfig helperConfig = new HelperConfig();
        address utils = helperConfig.getUtilsAddress(block.chainid);
        (address router, uint64 chainSelector) = helperConfig.getChainDetails(block.chainid);

        setUpUtils(utils, router, chainSelector);
    }

    function run() public {
        setUpUtilsUsingConfigs();
    }
}
