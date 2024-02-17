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
    error TreasuryCrossChain__NothingToWithdraw();
    error TreasuryCrossChain__FailedToWithdrawEth(address sender, address beneficiary, uint256 amount);

    event TreasuryCrossChain__AllCrossChainFundsSent(
        address indexed _sender, address indexed _receiver, uint8 indexed txCounter
    );

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
        address _sender,
        address _receiver,
        uint256 _totalAmount,
        uint256 _destinationChainId,
        uint256[] memory _chainIds,
        uint256[] memory _amounts,
        uint8 _txCounter
    ) external {
        uint256 fundsStatus = _areEnoughFundsAvailable(
            _sender, _receiver, _totalAmount, _destinationChainId, _chainIds, _amounts, _txCounter
        );
        if (fundsStatus == 1) {
            revert TreasuryCrossChain__InsufficientFunds();
        }
        address routerAddress = this.getRouter();
        if (fundsStatus == 2) {
            _sendFundsWithNativeToken(
                _sender, _receiver, _totalAmount, _destinationChainId, _chainIds, _amounts, _txCounter, routerAddress
            );
        } else if (fundsStatus == 3 || fundsStatus == 4) {
            uint256 totalFeeInLinkToken = calculateFeeInLinkToken(
                _sender, _receiver, _totalAmount, _destinationChainId, _chainIds, _amounts, _txCounter
            );
            IERC20(s_linkToken).approve(routerAddress, (totalFeeInLinkToken + 1e18));

            _sendFundsInLinkToken(
                _sender, _receiver, _totalAmount, _destinationChainId, _chainIds, _amounts, _txCounter, routerAddress
            );
        }

        emit TreasuryCrossChain__AllCrossChainFundsSent(_sender, _receiver, _txCounter);
    }

    function _sendFundsWithNativeToken(
        address _sender,
        address _receiver,
        uint256 _totalAmount,
        uint256 _destinationChainId,
        uint256[] memory _chainIds,
        uint256[] memory _amounts,
        uint8 _txCounter,
        address routerAddress
    ) internal {
        bool isDirectTransferCall = false;
        for (uint256 i = 0; i < _chainIds.length; i++) {
            if (_chainIds[i] == block.chainid) {
                _sendFundsToTreasury(_sender, _amounts[i], _txCounter);
            } else {
                Client.EVM2AnyMessage memory evm2AnyMessage =
                    _buildCCIPMessage(_sender, _chainIds[i], _amounts[i], _txCounter, isDirectTransferCall);

                IRouterClient router = IRouterClient(routerAddress);
                uint64 _destinationChainSelector = Utils(s_utils).getChainIdToChainSelector(_chainIds[i]);

                uint256 fees = router.getFee(_destinationChainSelector, evm2AnyMessage);

                router.ccipSend{value: fees}(_destinationChainSelector, evm2AnyMessage);
            }
        }

        _sendTotalFundsWithNative(_receiver, _destinationChainId, _totalAmount, _txCounter, routerAddress);
    }

    function _sendFundsInLinkToken(
        address _sender,
        address _receiver,
        uint256 _totalAmount,
        uint256 _destinationChainId,
        uint256[] memory _chainIds,
        uint256[] memory _amounts,
        uint8 _txCounter,
        address routerAddress
    ) internal {
        bool isDirectTransferCall = false;

        for (uint256 i = 0; i < _chainIds.length; i++) {
            if (_chainIds[i] == block.chainid) {
                _sendFundsToTreasury(_sender, _amounts[i], _txCounter);
            } else {
                Client.EVM2AnyMessage memory evm2AnyMessage =
                    _buildCCIPMessageWithLinkToken(_sender, _chainIds[i], _amounts[i], _txCounter, isDirectTransferCall);

                IRouterClient router = IRouterClient(routerAddress);
                uint64 _destinationChainSelector = Utils(s_utils).getChainIdToChainSelector(_chainIds[i]);

                router.ccipSend(_destinationChainSelector, evm2AnyMessage);
            }
        }

        _sendTotalFundsWithLink(_receiver, _destinationChainId, _totalAmount, _txCounter, routerAddress);
    }

    function _sendTotalFundsWithNative(
        address _receiver,
        uint256 _destinationChainId,
        uint256 _totalAmount,
        uint8 _txCounter,
        address _routerAddress
    ) internal {
        bool isDirectTransferCall = true;
        if (_destinationChainId == block.chainid) {
            _sendFundsFromTreasury(_receiver, _totalAmount, _txCounter);
        } else {
            Client.EVM2AnyMessage memory evm2AnyMessage =
                _buildCCIPMessage(_receiver, _destinationChainId, _totalAmount, _txCounter, isDirectTransferCall);
            IRouterClient router = IRouterClient(_routerAddress);
            uint64 _destinationChainSelector = Utils(s_utils).getChainIdToChainSelector(_destinationChainId);
            uint256 fees = router.getFee(_destinationChainSelector, evm2AnyMessage);
            router.ccipSend{value: fees}(_destinationChainSelector, evm2AnyMessage);
        }
    }

    function _sendTotalFundsWithLink(
        address _receiver,
        uint256 _destinationChainId,
        uint256 _totalAmount,
        uint8 _txCounter,
        address _routerAddress
    ) internal {
        bool isDirectTransferCall = true;
        if (_destinationChainId == block.chainid) {
            _sendFundsFromTreasury(_receiver, _totalAmount, _txCounter);
        } else {
            Client.EVM2AnyMessage memory evm2AnyMessage = _buildCCIPMessageWithLinkToken(
                _receiver, _destinationChainId, _totalAmount, _txCounter, isDirectTransferCall
            );
            IRouterClient router = IRouterClient(_routerAddress);
            uint64 _destinationChainSelector = Utils(s_utils).getChainIdToChainSelector(_destinationChainId);

            router.ccipSend(_destinationChainSelector, evm2AnyMessage);
        }
    }

    /**
     * @notice This functions check whether the contract have succificient funds to make the CCIP calls.
     * @param _sender The user address
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
        address _sender,
        address _receiver,
        uint256 _totalAmount,
        uint256 _destinationChainId,
        uint256[] memory _chainIds,
        uint256[] memory _amounts,
        uint8 _txCounter
    ) internal view returns (uint8 _fundsStatus) {
        uint256 totalFeeInNativeToken = calculateFeeInNativeToken(
            _sender, _receiver, _totalAmount, _destinationChainId, _chainIds, _amounts, _txCounter
        );
        uint256 nativeTokenBalance = address(this).balance;

        uint256 totalFeeInLinkToken = calculateFeeInLinkToken(
            _sender, _receiver, _totalAmount, _destinationChainId, _chainIds, _amounts, _txCounter
        );
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

    function calculateFeeInNativeToken(
        address _sender,
        address _receiver,
        uint256 _totalAmount,
        uint256 _destinationChainId,
        uint256[] memory _chainIds,
        uint256[] memory _amounts,
        uint8 _txCounter
    ) public view returns (uint256) {
        IRouterClient router = IRouterClient(this.getRouter());
        uint256 totalFeeInNativeToken = 0;
        bool isDirectTransferCall = false;

        // For sending funds to Treasury on different chains.
        for (uint256 i = 0; i < _chainIds.length; i++) {
            // if condition to check if the chain is the same as the current chain, and if ture then continue
            if (_chainIds[i] == block.chainid) continue;

            Client.EVM2AnyMessage memory evm2AnyMessageForNative =
                _buildCCIPMessage(_sender, _chainIds[i], _amounts[i], _txCounter, isDirectTransferCall);
            uint64 _destinationChainSelector = Utils(s_utils).getChainIdToChainSelector(_chainIds[i]);
            uint256 feeInNative = router.getFee(_destinationChainSelector, evm2AnyMessageForNative);
            totalFeeInNativeToken += feeInNative;
        }

        // For sending funds from the treasury to the receiver on the destination chain.
        if (_destinationChainId != block.chainid) {
            Client.EVM2AnyMessage memory evm2AnyMessageForNative =
                _buildCCIPMessage(_receiver, _destinationChainId, _totalAmount, _txCounter, true);
            uint64 _destinationChainSelector = Utils(s_utils).getChainIdToChainSelector(_destinationChainId);
            uint256 feeInNative = router.getFee(_destinationChainSelector, evm2AnyMessageForNative);
            totalFeeInNativeToken += feeInNative;
        }

        return totalFeeInNativeToken;
    }

    function calculateFeeInLinkToken(
        address _sender,
        address _receiver,
        uint256 _totalAmount,
        uint256 _destinationChainId,
        uint256[] memory _chainIds,
        uint256[] memory _amounts,
        uint8 _txCounter
    ) public view returns (uint256) {
        IRouterClient router = IRouterClient(this.getRouter());
        uint256 totalFeeInLinkToken = 0;
        bool isDirectTransferCall = false;
        for (uint256 i = 0; i < _chainIds.length; i++) {
            // if condition to check if the chain is the same as the current chain, and if ture then continue
            if (_chainIds[i] == block.chainid) continue;
            Client.EVM2AnyMessage memory evm2AnyMessageForLink =
                _buildCCIPMessage(_sender, _chainIds[i], _amounts[i], _txCounter, isDirectTransferCall);
            uint64 _destinationChainSelector = Utils(s_utils).getChainIdToChainSelector(_chainIds[i]);
            uint256 feeInLink = router.getFee(_destinationChainSelector, evm2AnyMessageForLink);
            totalFeeInLinkToken += feeInLink;
        }

        // For sending funds from the treasury to the receiver on the destination chain.
        if (_destinationChainId != block.chainid) {
            Client.EVM2AnyMessage memory evm2AnyMessageForLink =
                _buildCCIPMessage(_receiver, _destinationChainId, _totalAmount, _txCounter, true);
            uint64 _destinationChainSelector = Utils(s_utils).getChainIdToChainSelector(_destinationChainId);
            uint256 feeInLink = router.getFee(_destinationChainSelector, evm2AnyMessageForLink);
            totalFeeInLinkToken += feeInLink;
        }

        return totalFeeInLinkToken;
    }

    function _ccipReceive(Client.Any2EVMMessage memory message) internal override {
        (address _user, uint256 _amount, uint8 _txCounter, bool _isDirectCall) =
            abi.decode(message.data, (address, uint256, uint8, bool));
        if (_isDirectCall) {
            _sendFundsFromTreasury(_user, _amount, _txCounter);
        } else {
            _sendFundsToTreasury(_user, _amount, _txCounter);
        }
    }

    function _sendFundsToTreasury(address _sender, uint256 _amount, uint8 _txCounter) internal {
        Treasury(s_treasury).receiveFunds(_sender, _amount, _txCounter);
    }

    function _sendFundsFromTreasury(address _receiver, uint256 _totalAmount, uint8 _txCounter) internal {
        Treasury(s_treasury).sendFunds(_receiver, _totalAmount, _txCounter);
    }

    function _buildCCIPMessage(
        address _user,
        uint256 _chainId,
        uint256 _amount,
        uint8 _txCounter,
        bool isDirectTransferCall
    ) internal view returns (Client.EVM2AnyMessage memory) {
        return Client.EVM2AnyMessage({
            receiver: abi.encode(getTreasuryCrossChainAddress(_chainId)),
            data: abi.encode(_user, _amount, _txCounter, isDirectTransferCall),
            tokenAmounts: new Client.EVMTokenAmount[](0),
            extraArgs: Client._argsToBytes(
                // Additional arguments, setting gas limit
                Client.EVMExtraArgsV1({gasLimit: 200_000})
                ),
            feeToken: address(0)
        });
    }

    function _buildCCIPMessageWithLinkToken(
        address _sender,
        uint256 _chainId,
        uint256 _amount,
        uint8 _txCounter,
        bool isDirectTransferCall
    ) internal view returns (Client.EVM2AnyMessage memory) {
        return Client.EVM2AnyMessage({
            receiver: abi.encode(getTreasuryCrossChainAddress(_chainId)),
            data: abi.encode(_sender, _amount, _txCounter, isDirectTransferCall),
            tokenAmounts: new Client.EVMTokenAmount[](0),
            extraArgs: Client._argsToBytes(
                // Additional arguments, setting gas limit
                Client.EVMExtraArgsV1({gasLimit: 200_000})
                ),
            feeToken: address(s_linkToken)
        });
    }

    receive() external payable {}

    /// @notice Allows the contract owner to withdraw the entire balance of Ether from the contract.
    /// @dev This function reverts if there are no funds to withdraw or if the transfer fails.
    /// It should only be callable by the owner of the contract.
    /// @param _beneficiary The address to which the Ether should be sent.
    function withdraw(address _beneficiary) public {
        // Retrieve the balance of this contract
        uint256 amount = address(this).balance;

        // Revert if there is nothing to withdraw
        if (amount == 0) revert TreasuryCrossChain__NothingToWithdraw();

        // Attempt to send the funds, capturing the success status and discarding any return data
        (bool sent,) = _beneficiary.call{value: amount}("");

        // Revert if the send failed, with information about the attempted transfer
        if (!sent) revert TreasuryCrossChain__FailedToWithdrawEth(msg.sender, _beneficiary, amount);
    }

    /// @notice Allows the owner of the contract to withdraw all tokens of a specific ERC20 token.
    /// @dev This function reverts with a 'TreasuryCrossChain__NothingToWithdraw' error if there are no tokens to withdraw.
    /// @param _beneficiary The address to which the tokens will be sent.
    /// @param _token The contract address of the ERC20 token to be withdrawn.
    function withdrawToken(address _beneficiary, address _token) public {
        // Retrieve the balance of this contract
        uint256 amount = IERC20(_token).balanceOf(address(this));

        // Revert if there is nothing to withdraw
        if (amount == 0) revert TreasuryCrossChain__NothingToWithdraw();

        IERC20(_token).transfer(_beneficiary, amount);
    }
}
