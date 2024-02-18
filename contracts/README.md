# Steps to test the contracts
1. Deploy USDC
2. Deploy Treasury
3. Mint USDC to Treasury
4. Mint USDC to **UserA** 
5. Approve USDC to Treasury by **UserA**
   1. ```make approveUSDCToTreasury ARGS="--network fuji"```
   2. ```make approveUSDCToTreasury ARGS="--network sepolia"```
   3. ```make approveUSDCToTreasury ARGS="--network mumbai"```

6. Deploy Utils
7. Setup Utils
8. Deploy TreasuryCrossChain
   1. ```make deployTreasuryCrossChain ARGS="--network mumbai"```
   2. ```make deployTreasuryCrossChain ARGS="--network sepolia"```
   3. ```make deployTreasuryCrossChain ARGS="--network fuji"```
9.  Set TreasuryCrossChainAddress in Utils
   1.  ```make setTreasuryCrossChainAddressOnUtils ARGS="--network mumbai"```
   2.  ```make setTreasuryCrossChainAddressOnUtils ARGS="--network sepolia"```
   3.  ```make setTreasuryCrossChainAddressOnUtils ARGS="--network fuji"```
10. Deploy MainContract
    1. ```make deployMainContract ARGS="--network mumbai" ```
    2. ```make deployMainContract ARGS="--network sepolia" ```
    3. ```make deployMainContract ARGS="--network fuji" ```
    - If required, you can set TreasuryCrossChainAddress separately.
11. Interact With MainContract
   1.  Send Funds [AVAX -> AVAX]
   2.  Send Funds On 2 Chains [AVAX -> AVAX & AVAX -> Mumbai]
   3.  Send Funds on 3 Chains [AVAX -> AVAX & AVAX -> Mumbai & AVAX -> Sepolia]
       1.  ```make sendFundsOn_3Chains ARGS="--network fuji"```

# USDC
0x55104Ed9ab9f3b58dB55D60429091cA203302FaF

# Treasury 
- Mumbai: [0x9E3B1911B82660873E499dE432A1dcA9e7fACC6f](https://mumbai.polygonscan.com/address/0x9e3b1911b82660873e499de432a1dca9e7facc6f)
- Sepolia: [0x24920786E8ACa61e83A5C6Ab29e3931B9D1878e0](https://sepolia.etherscan.io/address/0x67fa0e46ca78549c0ef176ad658bd64d9619be20)
- Fuji: [0x35343628C66991404ecE443083b90B0d1CDDe4Fa](https://testnet.snowtrace.io/address/0x35343628c66991404ece443083b90b0d1cdde4fa)

# Utils
0x0f5698ED0aE0B8Fb87FF235bD1849cfA9175D642

# TreasuryCrossChain
- Mumbai: [0x08c3BCc634ca19ceEf782Cdc47198F3E0531aDD8](https://mumbai.polygonscan.com/address/0x08c3BCc634ca19ceEf782Cdc47198F3E0531aDD8)
- Sepola: [0xeb95D49f847309935f59b54B239dbacF7b2dFD33](https://sepolia.etherscan.io/address/0xeb95D49f847309935f59b54B239dbacF7b2dFD33)
- Fuji: [0x74dc19725cC7E6d81f762adD93bA7f508eAaB454](https://testnet.snowtrace.io/address/0x74dc19725cC7E6d81f762adD93bA7f508eAaB454)

# MainContract
- Mumbai: [0x9B7CAed9e3e9995edA099822Ef74701aD6606603](https://mumbai.polygonscan.com/address/0x9B7CAed9e3e9995edA099822Ef74701aD6606603)
- Sepola: [0x3d77c9Ef3d7f06B1881CD69e409b56c5f9585Ad3](https://sepolia.etherscan.io/address/0x3d77c9Ef3d7f06B1881CD69e409b56c5f9585Ad3)
- Fuji: [0x75e45dB056dc5844BcDa23e468ab3493A427e932](https://testnet.snowtrace.io/address/0x75e45dB056dc5844BcDa23e468ab3493A427e932)

## Main Contract Interactions
- Send Funds on the same Chain
  - https://testnet.snowtrace.io/tx/0x368c666785ab194e763455492415f05d739d4ec57049331f62fc14271b8c1a95?chainId=43113
- Send Funds on the 2 chains [Fuji & Mumbai]
  - Fuji[Source Tx]: https://testnet.snowtrace.io/tx/0x32e58991f88b7f42597c57c2331783d3f96b70698735b6df6dceb35a5dffddc6
  - Mumbai[Funds Receive Tx]: https://mumbai.polygonscan.com/tx/0x4f0bac6a4d255954950e7fe1ada45b4a836475d6c06824472b95d03997e1a96d
- Send Funds on the 3 chains [Fuji, Mumbai & Sepolia][Sepolia as destination chain]
  - Fuji
    - [Source Tx]: https://testnet.snowtrace.io/tx/0x0cdd7b249460741f35a43cfd9d777af785999bddf8b3633ef997e42a566284ad
    - CCIP Tx to Mumbai: https://ccip.chain.link/msg/0xca2d5000dc8d696e0e4b638e0b2327d94f65c17454a758a9af092e7d7827c8ca
    - CCIP Tx to Sepolia: https://ccip.chain.link/msg/0x287cb2d04160c3b7b8d086a2731f6a53deb4b37f01cd81d6d3fc013f9a76117d
  - Mumbai[Funds Receive Tx]: https://mumbai.polygonscan.com/tx/0x8b8edec428646a910ff9338d85042351b9df443f729128335618a971c3375156
  - Sepolia [Funds Receive Tx]: https://sepolia.etherscan.io/tx/0xfff7ecf5de8b742c84ec0f02f3cf0e13483b889798f93f30730f6a7e4f5c4a97
  - Sepolia [Funds send to Receiver Tx]: https://sepolia.etherscan.io/tx/0xfff7ecf5de8b742c84ec0f02f3cf0e13483b889798f93f30730f6a7e4f5c4a97


forge verify-contract 0x74dc19725cC7E6d81f762adD93bA7f508eAaB454 src/TreasuryCrossChain.sol:TreasuryCrossChain --verifier-url 'https://api.routescan.io/v2/network/testnet/evm/43113/etherscan' --etherscan-api-key "K5G7FZP97VZW2VNQ7WUT7HQZ4PTJ9GKBCG" --num-of-optimizations 200 --constructor-args $(cast abi-encode "constructor(address _router, address _treasury, address _utils, address _linkToken)"  0xF694E193200268f9a4868e4Aa017A0118C9a8177 0x35343628C66991404ecE443083b90B0d1CDDe4Fa 0x55104Ed9ab9f3b58dB55D60429091cA203302FaF 0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846 )

forge verify-contract \
    --chain-id 80001 \
    --etherscan-api-key 298NB8HCTYIPCJP3DTFR2ZY6UM3YT4FE8H \
    0x55104Ed9ab9f3b58dB55D60429091cA203302FaF \
    src/BasicUSDC.sol:BasicUSDC  \
    --compiler-version 0.8.20


// [200000000000000000000, 300000000000000000000, 600000000000000000000]
// [43113, 80001, 11155111]