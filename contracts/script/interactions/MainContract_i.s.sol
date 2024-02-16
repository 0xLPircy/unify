// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {Script} from "forge-std/Script.sol";
import {HelperConfig} from "../HelperConfig.s.sol";

import {MainContract} from "../../src/MainContract.sol";

contract SetTreasuryCrossChainAddress is Script {
    uint256[] public chainIds = [11155111, 80001, 43113];

    function setTreasuryCrossChainAddress(address _mainContract, address _treasuryCrossChainAddress) public {
        vm.startBroadcast();
        MainContract mainContract = MainContract(_mainContract);
        mainContract.setTreasuryCrossChain(_treasuryCrossChainAddress);
        vm.stopBroadcast();
    }

    function setTreasuryCrossChainAddressUsingConfigs() public {
        HelperConfig helperConfig = new HelperConfig();
        uint256 chainId = block.chainid;
        address mainContract = helperConfig.getMainContractAddress(chainId);
        address treasuryCrossChain = helperConfig.getTreasuryCrossChainAddress(chainId);
        setTreasuryCrossChainAddress(mainContract, treasuryCrossChain);
    }

    function run() public {
        setTreasuryCrossChainAddressUsingConfigs();
    }
}

contract SendFundsOnSameChain is Script {
    address constant USER_A = 0x1Cb30cb181D7854F91c2410BD037E6F42130e860;
    address constant USER_B = 0xa60f738a60BCA515Ac529b7335EC7CB2eE3891d2;
    uint256 constant AMOUNT = 100e18;

    function sendFundsFromSameChain(
        address _mainContract,
        address _user,
        uint256[] memory _chainIds,
        uint256[] memory _amounts
    ) public {
        vm.startBroadcast(vm.envUint("PRIVATE_KEY"));
        MainContract mainContract = MainContract(_mainContract);
        mainContract.sendAssets(_user, _chainIds, _amounts);
        vm.stopBroadcast();
    }

    function sendFundsFromSameChainUsingConfigs() public {
        HelperConfig helperConfig = new HelperConfig();
        uint256 chainId = block.chainid;
        address mainContract = helperConfig.getMainContractAddress(chainId);
        uint256[] memory chainIds = new uint256[](1);
        uint256[] memory amounts = new uint256[](1);
        chainIds[0] = chainId;
        amounts[0] = AMOUNT;
        sendFundsFromSameChain(mainContract, USER_B, chainIds, amounts);
    }

    function run() public {
        sendFundsFromSameChainUsingConfigs();
    }
}

contract SendFundsOn_2Chains is Script {
    uint256 constant CHAIN_A = 43113;
    uint256 constant CHAIN_B = 80001;
    address constant USER_A = 0x1Cb30cb181D7854F91c2410BD037E6F42130e860;
    address constant USER_B = 0xa60f738a60BCA515Ac529b7335EC7CB2eE3891d2;
    uint256 constant AMOUNT_A = 300e18;
    uint256 constant AMOUNT_B = 200e18;

    function sendFundsOn_2Chains(
        address _mainContract,
        address _user,
        uint256[] memory _chainIds,
        uint256[] memory _amounts
    ) public {
        vm.startBroadcast(vm.envUint("PRIVATE_KEY"));
        MainContract mainContract = MainContract(_mainContract);
        mainContract.sendAssets(_user, _chainIds, _amounts);
        vm.stopBroadcast();
    }

    function sendFundsOn_2ChainsUsingConfigs() public {
        HelperConfig helperConfig = new HelperConfig();
        address mainContract = helperConfig.getMainContractAddress(block.chainid);
        uint256[] memory chainIds = new uint256[](2);
        uint256[] memory amounts = new uint256[](2);
        chainIds[0] = CHAIN_A;
        chainIds[1] = CHAIN_B;
        amounts[0] = AMOUNT_A;
        amounts[1] = AMOUNT_B;
        sendFundsOn_2Chains(mainContract, USER_B, chainIds, amounts);
    }

    function run() public {
        sendFundsOn_2ChainsUsingConfigs();
    }
}
