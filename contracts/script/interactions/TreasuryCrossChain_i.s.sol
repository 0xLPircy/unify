// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {Script} from "forge-std/Script.sol";
import {HelperConfig} from "../HelperConfig.s.sol";

import {TreasuryCrossChain} from "../../src/TreasuryCrossChain.sol";

contract SetUtils is Script {
    function setUtils(address _treasuryCrossChain, address _utils) public {
        vm.startBroadcast();
        TreasuryCrossChain treasuryCrossChain = TreasuryCrossChain(payable(_treasuryCrossChain));
        treasuryCrossChain.setUtils(_utils);
        vm.stopBroadcast();
    }

    function setUtilsUsingConfigs() public {
        HelperConfig helperConfig = new HelperConfig();
        address treasuryCrossChain = helperConfig.getTreasuryCrossChainAddress(block.chainid);
        address utils = helperConfig.getUtilsAddress(block.chainid);
        setUtils(treasuryCrossChain, utils);
    }

    function run() public {
        setUtilsUsingConfigs();
    }
}
