// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {Script} from "forge-std/Script.sol";
import {DevOpsTools} from "foundry-devops/src/DevOpsTools.sol";

contract HelperConfig is Script {
    struct CrossChainDetails {
        address _router;
        uint64 _chainSelector;
        address _usdc;
    }

    mapping(uint256 _chainId => CrossChainDetails) public chainIdToCrossChainDetails;

    constructor() {
        if (block.chainid == 11155111) {
            setSepoliaConfigs();
        } else if (block.chainid == 80001) {
            setMumbaiConfigs();
        } else if (block.chainid == 43113) {
            setFujiConfigs();
        } else {
            setAnvilConfigs();
        }
    }

    function getChainDetails(uint256 _chainId) external view returns (address _router, uint64 _chainSelector) {
        return (chainIdToCrossChainDetails[_chainId]._router, chainIdToCrossChainDetails[_chainId]._chainSelector);
    }

    function setSepoliaConfigs() internal {
        chainIdToCrossChainDetails[11155111] = CrossChainDetails({
            _router: 0x0BF3dE8c5D3e8A2B34D2BEeB17ABfCeBaf363A59,
            _chainSelector: 16015286601757825753,
            _usdc: getUSDCAddress(block.chainid)
        });
    }

    function setMumbaiConfigs() internal {
        chainIdToCrossChainDetails[80001] = CrossChainDetails({
            _router: 0x1035CabC275068e0F4b745A29CEDf38E13aF41b1,
            _chainSelector: 12532609583862916517,
            _usdc: getUSDCAddress(block.chainid)
        });
    }

    function setFujiConfigs() internal {
        chainIdToCrossChainDetails[43113] = CrossChainDetails({
            _router: 0xF694E193200268f9a4868e4Aa017A0118C9a8177,
            _chainSelector: 14767482510784806043,
            _usdc: getUSDCAddress(block.chainid)
        });
    }

    function setAnvilConfigs() internal {
        chainIdToCrossChainDetails[31337] = CrossChainDetails({
            _router: 0x0BF3dE8c5D3e8A2B34D2BEeB17ABfCeBaf363A59,
            _chainSelector: 16015286601757825753,
            _usdc: getUSDCAddress(block.chainid)
        });
    }

    function getUSDCAddress(uint256 _chainId) public view returns (address _usdc) {
        _usdc = DevOpsTools.get_most_recent_deployment("BasicUSDC", _chainId);
    }

    function getTreasuryAddress(uint256 _chainId) public view returns (address _treasury) {
        _treasury = DevOpsTools.get_most_recent_deployment("Treasury", _chainId);
    }
}