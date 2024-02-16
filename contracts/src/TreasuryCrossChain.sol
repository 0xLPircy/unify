// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {IRouterClient} from "@chainlink/contracts-ccip/src/v0.8/ccip/interfaces/IRouterClient.sol";
import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import {CCIPReceiver} from "@chainlink/contracts-ccip/src/v0.8/ccip/applications/CCIPReceiver.sol";

import {Treasury} from "./Treasury.sol";
import {Utils} from "./Utils.sol";

contract TreasuryCrossChain is CCIPReceiver {
    address public s_treasury;
    address public s_utils;

    constructor(address _router) CCIPReceiver(_router) {}

    function setTreasury(address _treasury) external {
        s_treasury = _treasury;
    }

    function setUtils(address _utils) external {
        s_utils = _utils;
    }

    function sendAssetsToTreasury(address _user, uint256 _amount, uint256 _chainId, uint8 _txCounter)
        external
        returns (bytes32 messageId)
    {
        if (_chainId == block.chainid) {
            sendFundsToTreasury(_user, _amount, _txCounter);
        } else {
            Client.EVM2AnyMessage memory evm2AnyMessage = _buildCCIPMessage(_user, _amount, _txCounter);

            IRouterClient router = IRouterClient(this.getRouter());
            uint64 _destinationChainSelector = Utils(s_utils).getChainIdToChainSelector(_chainId);

            uint256 fees = router.getFee(_destinationChainSelector, evm2AnyMessage);

            messageId = router.ccipSend{value: fees}(_destinationChainSelector, evm2AnyMessage);
        }
    }

    function _ccipReceive(Client.Any2EVMMessage memory message) internal override {
        (address _user, uint256 _amount, uint8 _txCounter) = abi.decode(message.data, (address, uint256, uint8));
        sendFundsToTreasury(_user, _amount, _txCounter);
    }

    function sendFundsToTreasury(address _user, uint256 _amount, uint8 _txCounter) internal {
        Treasury(s_treasury).receiveFunds(_user, _amount, _txCounter);
    }

    function _buildCCIPMessage(address _user, uint256 _amount, uint8 _txCounter)
        internal
        view
        returns (Client.EVM2AnyMessage memory)
    {
        return Client.EVM2AnyMessage({
            receiver: abi.encode(address(this)),
            data: abi.encode(_user, _amount, _txCounter),
            tokenAmounts: new Client.EVMTokenAmount[](0),
            extraArgs: Client._argsToBytes(
                // Additional arguments, setting gas limit
                Client.EVMExtraArgsV1({gasLimit: 200_000})
                ),
            feeToken: address(0)
        });
    }
}
