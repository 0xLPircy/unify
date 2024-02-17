enum Network {
    FUJI = 'avalanche-testnet',
    MUMBAI = 'matic-mumbai',
    SEPOLIA = 'eth-sepolia',
}

export type TokenBalances = {
    fuji: number,
    mumbai: number,
    sepolia: number,
}

export { Network };
