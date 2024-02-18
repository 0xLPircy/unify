enum Network {
    avalanche = 'avalanche-testnet',
    polygon = 'matic-mumbai',
    ethereum = 'eth-sepolia',
}

export type TokenBalances = {
    chain: string,
    amount: number
}

export { Network };
