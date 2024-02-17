# Steps to test the contracts
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
   3.  Send Funds on 3 Chains [AVAX -> AVAX & AVAX -> Mumbai & AVAX -> Sepolia]

# USDC
0x55104Ed9ab9f3b58dB55D60429091cA203302FaF

# Treasury 
- Mumbai: [0x9E3B1911B82660873E499dE432A1dcA9e7fACC6f](https://mumbai.polygonscan.com/address/0x9e3b1911b82660873e499de432a1dca9e7facc6f)
- Sepolia: [0x24920786E8ACa61e83A5C6Ab29e3931B9D1878e0](https://sepolia.etherscan.io/address/0x67fa0e46ca78549c0ef176ad658bd64d9619be20)
- Fuji: [0x35343628C66991404ecE443083b90B0d1CDDe4Fa](https://testnet.snowtrace.io/address/0x35343628c66991404ece443083b90b0d1cdde4fa)

# Utils
0x0f5698ED0aE0B8Fb87FF235bD1849cfA9175D642

# TreasuryCrossChain
- Mumbai: [0x26358ec9B336404563e8484350eD9652266a7351](https://mumbai.polygonscan.com/address/0x26358ec9B336404563e8484350eD9652266a7351)
- Sepola: [0x1836b2c90e8b192a2be131D06056ec1d26a06172](https://sepolia.etherscan.io/address/0x1836b2c90e8b192a2be131D06056ec1d26a06172)
- Fuji: [0xf7722f996bf4513BEAA82A0c8f54c8dB9e371eD7](https://testnet.snowtrace.io/address/0xf7722f996bf4513BEAA82A0c8f54c8dB9e371eD7)

# MainContract
- Mumbai: [0xCf739250eF9801FA932653E8cb0a80dbEc9f38f2](https://mumbai.polygonscan.com/address/0xCf739250eF9801FA932653E8cb0a80dbEc9f38f2)
- Sepola: [0x509383E32c6462611DD34E25Ef529af956459fe1](https://sepolia.etherscan.io/address/0x509383E32c6462611DD34E25Ef529af956459fe1)
- Fuji: [0xE9846b764dB5b901c571772715C2c28940f41a7d](https://testnet.snowtrace.io/address/0xE9846b764dB5b901c571772715C2c28940f41a7d)

## Main Contract Interactions
- Send Funds on the same Chain
  - https://testnet.snowtrace.io/tx/0x368c666785ab194e763455492415f05d739d4ec57049331f62fc14271b8c1a95?chainId=43113
- Send Funds on the 2 chains [Fuji & Mumbai]
  - Fuji[Source Tx]: https://testnet.snowtrace.io/tx/0x32e58991f88b7f42597c57c2331783d3f96b70698735b6df6dceb35a5dffddc6
  - Mumbai[Funds Receive Tx]: https://mumbai.polygonscan.com/tx/0x4f0bac6a4d255954950e7fe1ada45b4a836475d6c06824472b95d03997e1a96d
- Send Funds on the 3 chains [Fuji, Mumbai & Sepolia]
  - Fuji
    - [Source Tx]: https://testnet.snowtrace.io/tx/0x0e3996a247be4e454531ce9a85784b9552b4da479aef65d2884e934c27cd9515?chainId=43113
    - CCIP Tx to Mumbai: https://ccip.chain.link/msg/0x38a98913c803c6a216a4124f0486a0e027a2aa34d9289d344e2a1f488b284267
    - CCIP Tx to Sepolia: https://ccip.chain.link/msg/0x1e58d19af86a64658f662cb9b3fc9b26fa33ef6b0fbda8ef77581e03bf6961da
  - Mumbai[Funds Receive Tx]: https://mumbai.polygonscan.com/tx/0x49c1bae2cbbc79be093495f27e3820de420bb957a1038f9b708896e29a6b1205
  - Sepolia [Funds Receive Tx]: https://sepolia.etherscan.io/tx/0x087511a278f86f4d3b081365e9e800df0042ad69fbae99398248b8a3eb56c036


forge verify-contract 0x02599DBCF4B18F4aDb9f9491B16d039FeEe518f9 src/TreasuryCrossChain.sol:TreasuryCrossChain --verifier-url 'https://api.routescan.io/v2/network/testnet/evm/43113/etherscan' --etherscan-api-key "K5G7FZP97VZW2VNQ7WUT7HQZ4PTJ9GKBCG" --num-of-optimizations 200 --constructor-args $(cast abi-encode "constructor(address _router, address _treasury, address _utils, address _linkToken)" 0xF694E193200268f9a4868e4Aa017A0118C9a8177 0x35343628C66991404ecE443083b90B0d1CDDe4Fa 0x0f5698ED0aE0B8Fb87FF235bD1849cfA9175D642 0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846)