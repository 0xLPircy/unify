
// an array of objects that represent the chainid and amount of token balance
export type Sorted_Array = { chainIds: number[], amounts: number[] };

enum CHAIN_ID {
    FUJI = 43113,
    MUMBAI = 80001,
    SEPOLIA = 11155111
}

export { CHAIN_ID };