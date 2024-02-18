
// an array of objects that represent the chainid and amount of token balance
export type Sorted_Array = { chainIds: number[], amounts: number[] };

enum CHAIN_ID {
    avalanche = 43113,
    polygon = 80001,
    ethereum = 11155111
}

export { CHAIN_ID };