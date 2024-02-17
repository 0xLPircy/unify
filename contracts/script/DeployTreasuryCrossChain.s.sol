// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {Script} from "forge-std/Script.sol";
import {HelperConfig} from "./HelperConfig.s.sol";

import {TreasuryCrossChain} from "../src/TreasuryCrossChain.sol";

contract DeployTreasuryCrossChain is Script {
    function deployTreasuryCrossChain(address _router, address _treasury, address _utils, address linkToken)
        public
        returns (address treasuryCrossChain)
    {
        vm.startBroadcast();
        TreasuryCrossChain treasuryCrossChainContract = new TreasuryCrossChain(_router, _treasury, _utils, linkToken);
        vm.stopBroadcast();
        treasuryCrossChain = address(treasuryCrossChainContract);
    }

    function deployTreasuryCrossChainUsingConfigs() public {
        HelperConfig helperConfig = new HelperConfig();
        (address router,, address linkToken) = helperConfig.getChainDetails(block.chainid);
        address treasuryAddress = helperConfig.getTreasuryAddress(block.chainid);
        address utils = helperConfig.getUtilsAddress(block.chainid);
        deployTreasuryCrossChain(router, treasuryAddress, utils, linkToken);
    }

    function run() public {
        deployTreasuryCrossChainUsingConfigs();
    }
}
