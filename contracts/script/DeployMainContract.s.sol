// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {Script} from "forge-std/Script.sol";
import {HelperConfig} from "./HelperConfig.s.sol";

import {MainContract} from "../src/MainContract.sol";

contract DeployMainContract is Script {
    function deployMainContract(address _treasuryCrossChain) public returns (address) {
        vm.startBroadcast();
        MainContract mainContract = new MainContract(_treasuryCrossChain);
        vm.stopBroadcast();
        return address(mainContract);
    }

    function deployMainContractWithConfigs() public {
        HelperConfig helperConfig = new HelperConfig();
        address treasuryCrossChain = helperConfig.getTreasuryCrossChainAddress(block.chainid);
        deployMainContract(treasuryCrossChain);
    }

    function run() public {
        deployMainContractWithConfigs();
    }
}
