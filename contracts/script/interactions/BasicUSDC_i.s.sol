// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {Script} from "forge-std/Script.sol";
import {HelperConfig} from "../HelperConfig.s.sol";
import {BasicUSDC} from "../../src/BasicUSDC.sol";

contract MintUSDCToTreasuryContracts is Script {
    uint256 constant USDC_TO_MINT = 1000e18;

    function mintUSDCToTreasuryContracts(address _treasuryAddress, address _usdcAddress) public {
        vm.startBroadcast();
        BasicUSDC usdc = BasicUSDC(_usdcAddress);
        usdc.mint(_treasuryAddress, USDC_TO_MINT);
        vm.stopBroadcast();
    }

    function mintUSDCToTreasuryContractsUsingConfigs() public {
        HelperConfig helperConfig = new HelperConfig();

        address treasuryAddress = helperConfig.getTreasuryAddress(block.chainid);
        address usdcAddress = helperConfig.getUSDCAddress(block.chainid);

        mintUSDCToTreasuryContracts(treasuryAddress, usdcAddress);
    }

    function run() public {
        mintUSDCToTreasuryContractsUsingConfigs();
    }
}

contract MintUSDCToAddress is Script {
    uint256 constant USDC_TO_MINT = 1000_000e18;

    function mintUSDCToAddress(address _user, address _usdcAddress) public {
        vm.startBroadcast();
        BasicUSDC usdc = BasicUSDC(_usdcAddress);
        usdc.mint(_user, USDC_TO_MINT);
        vm.stopBroadcast();
    }

    function mintUSDCToAddressUsingConfigs() public {
        HelperConfig helperConfig = new HelperConfig();

        address user = 0x1Cb30cb181D7854F91c2410BD037E6F42130e860;
        address usdcAddress = helperConfig.getUSDCAddress(block.chainid);

        mintUSDCToAddress(user, usdcAddress);
    }

    function run() public {
        mintUSDCToAddressUsingConfigs();
    }
}
