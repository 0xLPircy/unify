// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {Script} from "forge-std/Script.sol";
import {CREATE3} from "@solmate/contracts/utils/Create3.sol";
import {HelperConfig} from "./HelperConfig.s.sol";

import {Treasury} from "../src/Treasury.sol";

contract DeployTreasury is Script {
    bytes32 public constant SALT = keccak256(bytes("Treasury"));

    function deployTreasury(address _usdc) public returns (address treasury) {
        vm.startBroadcast();
        // crossChain = CREATE3.deploy(SALT, _bytecode, 0);
        Treasury treasuryContract = new Treasury(_usdc);
        vm.stopBroadcast();
        return address(treasuryContract);
    }

    function deployTreasuryWithConfigs() public {
        HelperConfig helperConfig = new HelperConfig();
        address usdcAddress = helperConfig.getUSDCAddress(block.chainid);

        // bytes memory bytecode = abi.encodePacked(
        //     type(Treasury).creationCode,
        //     abi.encode(usdcAddress) // Encoding constructor parameters
        // );

        deployTreasury(usdcAddress);
    }

    function run() public {
        deployTreasuryWithConfigs();
    }
}
