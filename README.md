# Grandma's Phone

## Current Scenario
In the current web3 phase, we are used to having complex UX for sending funds to anyone.
This works for those who have been in the space for a long time (crypto-native) but for those who are not into the space and have no knowledge of tech, missing out on the power they can have using blockchain technology. 

We brought you **Grandma's Phone** to solve this significant mass adoption issue, starting with a minimal but most crucial function: _SENDING FUNDS_*.

## Overview

Grandma's Phone is a completely decentralized application where any user can send tokens (for now, USDC Only) to anyone without worrying about the different chains where they have funds.

### User Flow 
To send tokens to any address on any chain from any chain.\

The flow:
1. The user enters the recipient's address and the token amount.
2. The user signs the transaction.
3. The recipient receives the funds on the destination chain.

### Backend Flow 
We achieved this great UX using the following: 
- Particle Auth Auth Core SDK
- Chainlink CCIP
- Covalent API and Explorer it

The flow:
1. The user enters the recipient's address and the token amount.
2. The backend searches the user's address across all the supported chains using the **Covalent Unified API** and sorts them into an array concerning minimum gas fees and the number of tokens to be sent from each chain.
3. The transaction data is created, and the user signs the transaction.
   - The array then passes to the `MainContract` contract's `sendAsset` function.
4. Then, the `TreasuryCrossChain` contract's `sendAssetsToTreasury` is called.
   - First, the transaction on the **base chain (Avalanche Fuji)** is executed, and the funds are transferred to the user's wallet to the Treasury Address on Avalanche.
   - Then, a loop is executed where the funds are transferred from the user's wallet to the treasury on each chain present in the initial array using **Chainlink CCIP.**
   - At last, the initial amount is sent from the treasury to the recipient's wallet on the destination chain.

## Transaction Links
Scenario: 
The user wants to send 1100 $USDC to a receiver on Sepolia.
User wallet scenario:
- 300 $USDC on Avalanche Fuji
- 200 $USDC on Polygon Mumbai 
- 600 $USDC on Ethereum Sepolia

The user inputs the values, the backend creates the transaction data, and the user signs it on the base chain (Avalanche Fuji). 

1. Transaction initiation and funds transferred to the treasury on the base chain.
[TxLink](https://testnet.snowtrace.io/tx/0x0cdd7b249460741f35a43cfd9d777af785999bddf8b3633ef997e42a566284ad)

2. The Transaction to send funds from User's Wallet to treasury on Mumbai is initiated by CCIP.
[TxLink](https://ccip.chain.link/msg/0xca2d5000dc8d696e0e4b638e0b2327d94f65c17454a758a9af092e7d7827c8ca)

3. Funds are sent from User's Wallet to the Treasury on Mumbai.
[TxLink](https://mumbai.polygonscan.com/tx/0x8b8edec428646a910ff9338d85042351b9df443f729128335618a971c3375156)

4. The Transaction to send funds from the User's Wallet to the treasury on Sepolia is initiated by CCIP.
[TxLink](https://ccip.chain.link/msg/0x287cb2d04160c3b7b8d086a2731f6a53deb4b37f01cd81d6d3fc013f9a76117d)

5. The transaction to send the funds from the Treasury to the receiver on Sepolia is initiated by CCIP.
[TxLink](https://ccip.chain.link/msg/0xabdbd1e38fd2a800f3d7e6220a5ca40f00e66b941e934ea5c8b76cc7ddfea2b0)

6. Funds are dispatched from the User's Wallet to the Treasury and from the Treasury to the Receiver's Wallet on Sepolia.
[TxLink](https://sepolia.etherscan.io/tx/0xfff7ecf5de8b742c84ec0f02f3cf0e13483b889798f93f30730f6a7e4f5c4a97)

