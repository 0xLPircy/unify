1. Deploy USDC
2. Deploy Treasury
3. Mint USDC to Treasury
4. Mint USDC to **UserA** 
5. Approve USDC to Treasury by **UserA**
6. Deploy Utils
7. Setup Utils
8. Deploy TreasuryCrossChain
9. Set TreasuryCrossChainAddress in Utils
10. Deploy MainContract
    - If required, you can set TreasuryCrossChainAddress separately.
11. Interact With MainContract
   1.  Send Funds [AVAX -> AVAX]
   2.  Send Funds On 2 Chains [AVAX -> AVAX & AVAX -> Mumbai]

# USDC
0x55104Ed9ab9f3b58dB55D60429091cA203302FaF

# Treasury 
- Mumbai: [0x9E3B1911B82660873E499dE432A1dcA9e7fACC6f](https://mumbai.polygonscan.com/address/0x9e3b1911b82660873e499de432a1dca9e7facc6f)
- Sepolia: [0x24920786E8ACa61e83A5C6Ab29e3931B9D1878e0](https://sepolia.etherscan.io/address/0x67fa0e46ca78549c0ef176ad658bd64d9619be20)
- Fuji: [0x35343628C66991404ecE443083b90B0d1CDDe4Fa](https://testnet.snowtrace.io/address/0x35343628c66991404ece443083b90b0d1cdde4fa)

# Utils
0x0f5698ED0aE0B8Fb87FF235bD1849cfA9175D642

# TreasuryCrossChain
- Mumbai: [0xcdc9Dad4639371a84b75fd6f7190BcbF7e6B5950](https://mumbai.polygonscan.com/address/0xcdc9Dad4639371a84b75fd6f7190BcbF7e6B5950)
- Sepola: [0xa7fb64620779c7117D341FEb1F6b4cd1A9502e67](https://sepolia.etherscan.io/address/0xa7fb64620779c7117D341FEb1F6b4cd1A9502e67)
- Fuji: [0x2594eCb1576D9013192F530A2FD32A638260A32E](https://testnet.snowtrace.io/address/0x2594eCb1576D9013192F530A2FD32A638260A32E)

# MainContract
- Mumbai: [0xB8aEa11C5649F4a20916b2fEE9c441BF9785C1e4](https://mumbai.polygonscan.com/address/0xB8aEa11C5649F4a20916b2fEE9c441BF9785C1e4)
- Sepola: [0xDf29490411dFC675Ce443a460A6B295F3eF90B99](https://sepolia.etherscan.io/address/0xDf29490411dFC675Ce443a460A6B295F3eF90B99)
- Fuji: [0x7BD5D510e2De44B66343C7C3ea8F5F4a9E834EbC](https://testnet.snowtrace.io/address/0x7BD5D510e2De44B66343C7C3ea8F5F4a9E834EbC)

## Main Contract Interactions
- Send Funds on the same Chain
  - https://testnet.snowtrace.io/tx/0x368c666785ab194e763455492415f05d739d4ec57049331f62fc14271b8c1a95?chainId=43113
- Send Funds on 2 chains [Fuji & Mumbai]
  - Fuji[Source Tx]: https://testnet.snowtrace.io/tx/0x32e58991f88b7f42597c57c2331783d3f96b70698735b6df6dceb35a5dffddc6
  - Mumbai[Receive Tx]: https://mumbai.polygonscan.com/tx/0x4f0bac6a4d255954950e7fe1ada45b4a836475d6c06824472b95d03997e1a96d