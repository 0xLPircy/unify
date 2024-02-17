// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {IRouterClient} from "@chainlink/contracts-ccip/src/v0.8/ccip/interfaces/IRouterClient.sol";
import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import {CCIPReceiver} from "@chainlink/contracts-ccip/src/v0.8/ccip/applications/CCIPReceiver.sol";
import {IERC20} from
    "@chainlink/contracts-ccip/src/v0.8/vendor/openzeppelin-solidity/v4.8.0/contracts/token/ERC20/IERC20.sol";

import {Treasury} from "./Treasury.sol";
import {Utils} from "./Utils.sol";

contract TreasuryCrossChain is CCIPReceiver {
    error TreasuryCrossChain__InsufficientFunds();

    event TreasuryCrossChain__AllFundsSent(address indexed user, uint8 indexed txCounter);

    address public s_treasury;
    address public s_utils;
    address public s_linkToken;

    constructor(address _router, address _treasury, address _utils, address _linkToken) CCIPReceiver(_router) {
        s_treasury = _treasury;
        s_utils = _utils;
        s_linkToken = _linkToken;
    }

    function setTreasury(address _treasury) external {
        s_treasury = _treasury;
    }

    function setUtils(address _utils) external {
        s_utils = _utils;
    }

    function setLinkToken(address _linkToken) external {
        s_linkToken = _linkToken;
    }

    function getTreasuryCrossChainAddress(uint256 _chainId) public view returns (address) {
        return Utils(s_utils).getChainIdToTreasuryCrossChainAddress(_chainId);
    }

    function sendAssetsToTreasury(
        address _user,
        uint256[] memory _chainIds,
        uint256[] memory _amounts,
        uint8 _txCounter
    ) external {
        uint256 fundsStatus = _areEnoughFundsAvailable(_user, _chainIds, _amounts, _txCounter);
        if (fundsStatus == 1) {
            revert TreasuryCrossChain__InsufficientFunds();
        }
        address routerAddress = this.getRouter();
        if (fundsStatus == 2) {
            _sendFundsInNativeToken(_user, _chainIds, _amounts, _txCounter, routerAddress);
        } else if (fundsStatus == 3 || fundsStatus == 4) {
            uint256 totalFeeInLinkToken = _calculateFeeInLinkToken(_user, _chainIds, _amounts, _txCounter);
            IERC20(s_linkToken).approve(routerAddress, (totalFeeInLinkToken + 1e18));

            _sendFundsInLinkToken(_user, _chainIds, _amounts, _txCounter, routerAddress);
        }

        emit TreasuryCrossChain__AllFundsSent(_user, _txCounter);
    }

    function _sendFundsInNativeToken(
        address _user,
        uint256[] memory _chainIds,
        uint256[] memory _amounts,
        uint8 _txCounter,
        address routerAddress
    ) internal {
        for (uint256 i = 0; i < _chainIds.length; i++) {
            if (_chainIds[i] == block.chainid) {
                _sendFundsToTreasury(_user, _amounts[i], _txCounter);
            } else {
                Client.EVM2AnyMessage memory evm2AnyMessage =
                    _buildCCIPMessage(_user, _chainIds[i], _amounts[i], _txCounter);

                IRouterClient router = IRouterClient(routerAddress);
                uint64 _destinationChainSelector = Utils(s_utils).getChainIdToChainSelector(_chainIds[i]);

                uint256 fees = router.getFee(_destinationChainSelector, evm2AnyMessage);

                router.ccipSend{value: fees}(_destinationChainSelector, evm2AnyMessage);
            }
        }
    }

    function _sendFundsInLinkToken(
        address _user,
        uint256[] memory _chainIds,
        uint256[] memory _amounts,
        uint8 _txCounter,
        address routerAddress
    ) internal {
        for (uint256 i = 0; i < _chainIds.length; i++) {
            if (_chainIds[i] == block.chainid) {
                _sendFundsToTreasury(_user, _amounts[i], _txCounter);
            } else {
                Client.EVM2AnyMessage memory evm2AnyMessage =
                    _buildCCIPMessageWithLinkToken(_user, _chainIds[i], _amounts[i], _txCounter);

                IRouterClient router = IRouterClient(routerAddress);
                uint64 _destinationChainSelector = Utils(s_utils).getChainIdToChainSelector(_chainIds[i]);

                router.ccipSend(_destinationChainSelector, evm2AnyMessage);
            }
        }
    }

    /**
     * @notice This functions check whether the contract have succificient funds to make the CCIP calls.
     * @param _user The user address
     * @param _chainIds The chainIds to which the funds are to be sent
     * @param _amounts The amounts to be sent to the respective chains
     * @param _txCounter The transaction counter
     * @return _fundsStatus The status of the funds
     * @notice 1: Insufficient funds in both native token and link token
     * @notice 2: Succiient funds in native token
     * @notice 3: Succicient funds in link token
     * @notice 4: Sufficient funds in both native token and link token
     */
    function _areEnoughFundsAvailable(
        address _user,
        uint256[] memory _chainIds,
        uint256[] memory _amounts,
        uint8 _txCounter
    ) internal view returns (uint8 _fundsStatus) {
        uint256 totalFeeInNativeToken = _calculateFeeInNativeToken(_user, _chainIds, _amounts, _txCounter);
        uint256 nativeTokenBalance = address(this).balance;

        uint256 totalFeeInLinkToken = _calculateFeeInLinkToken(_user, _chainIds, _amounts, _txCounter);
        uint256 linkTokenBalance = IERC20(s_linkToken).balanceOf(address(this));

        if (nativeTokenBalance > totalFeeInNativeToken && linkTokenBalance > totalFeeInLinkToken) {
            return 4;
        } else if (nativeTokenBalance <= totalFeeInNativeToken && linkTokenBalance > totalFeeInLinkToken) {
            return 3;
        } else if (nativeTokenBalance > totalFeeInNativeToken && linkTokenBalance <= totalFeeInLinkToken) {
            return 2;
        } else if (nativeTokenBalance <= totalFeeInNativeToken && linkTokenBalance <= totalFeeInLinkToken) {
            return 1;
        }
    }

    function _calculateFeeInNativeToken(
        address _user,
        uint256[] memory _chainIds,
        uint256[] memory _amounts,
        uint8 _txCounter
    ) public view returns (uint256) {
        IRouterClient router = IRouterClient(this.getRouter());
        uint256 totalFeeInNativeToken = 0;
        for (uint256 i = 0; i < _chainIds.length; i++) {
            // if condition to check if the chain is the same as the current chain, and if ture then continue
            if (_chainIds[i] == block.chainid) continue;

            Client.EVM2AnyMessage memory evm2AnyMessageForNative =
                _buildCCIPMessage(_user, _chainIds[i], _amounts[i], _txCounter);
            uint64 _destinationChainSelector = Utils(s_utils).getChainIdToChainSelector(_chainIds[i]);
            uint256 feeInNative = router.getFee(_destinationChainSelector, evm2AnyMessageForNative);
            totalFeeInNativeToken += feeInNative;
        }
        return totalFeeInNativeToken;
    }

    function _calculateFeeInLinkToken(
        address _user,
        uint256[] memory _chainIds,
        uint256[] memory _amounts,
        uint8 _txCounter
    ) public view returns (uint256) {
        IRouterClient router = IRouterClient(this.getRouter());
        uint256 totalFeeInLinkToken = 0;
        for (uint256 i = 0; i < _chainIds.length; i++) {
            // if condition to check if the chain is the same as the current chain, and if ture then continue
            if (_chainIds[i] == block.chainid) continue;
            Client.EVM2AnyMessage memory evm2AnyMessageForLink =
                _buildCCIPMessage(_user, _chainIds[i], _amounts[i], _txCounter);
            uint64 _destinationChainSelector = Utils(s_utils).getChainIdToChainSelector(_chainIds[i]);
            uint256 feeInLink = router.getFee(_destinationChainSelector, evm2AnyMessageForLink);
            totalFeeInLinkToken += feeInLink;
        }
        return totalFeeInLinkToken;
    }

    function _ccipReceive(Client.Any2EVMMessage memory message) internal override {
        (address _user, uint256 _amount, uint8 _txCounter) = abi.decode(message.data, (address, uint256, uint8));
        _sendFundsToTreasury(_user, _amount, _txCounter);
    }

    function _sendFundsToTreasury(address _user, uint256 _amount, uint8 _txCounter) internal {
        Treasury(s_treasury).receiveFunds(_user, _amount, _txCounter);
    }

    function _buildCCIPMessage(address _user, uint256 _chainId, uint256 _amount, uint8 _txCounter)
        internal
        view
        returns (Client.EVM2AnyMessage memory)
    {
        return Client.EVM2AnyMessage({
            receiver: abi.encode(getTreasuryCrossChainAddress(_chainId)),
            data: abi.encode(_user, _amount, _txCounter),
            tokenAmounts: new Client.EVMTokenAmount[](0),
            extraArgs: Client._argsToBytes(
                // Additional arguments, setting gas limit
                Client.EVMExtraArgsV1({gasLimit: 200_000})
                ),
            feeToken: address(0)
        });
    }

    function _buildCCIPMessageWithLinkToken(address _user, uint256 _chainId, uint256 _amount, uint8 _txCounter)
        internal
        view
        returns (Client.EVM2AnyMessage memory)
    {
        return Client.EVM2AnyMessage({
            receiver: abi.encode(getTreasuryCrossChainAddress(_chainId)),
            data: abi.encode(_user, _amount, _txCounter),
            tokenAmounts: new Client.EVMTokenAmount[](0),
            extraArgs: Client._argsToBytes(
                // Additional arguments, setting gas limit
                Client.EVMExtraArgsV1({gasLimit: 200_000})
                ),
            feeToken: address(s_linkToken)
        });
    }

    receive() external payable {}
}
