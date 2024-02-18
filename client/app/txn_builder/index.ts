import { Sorted_Array, CHAIN_ID } from './types';
import { getTokenBalances } from '../api';
import { TokenBalances } from '../api/types';

// const arraySorting = async (walletAddress: string, totalAmount: number): Promise<Sorted_Array> => {
//     const balances: TokenBalances = await getTokenBalances(walletAddress);

//     let fuji_amount: number = totalAmount * 0.5;
//     if (fuji_amount > balances.fuji) {
//         fuji_amount = balances.fuji;
//     }

//     let mumbai_amount: number = totalAmount * 0.3;
//     if (mumbai_amount > balances.mumbai) {
//         mumbai_amount = balances.mumbai;
//     }

//     let sepolia_amount: number = totalAmount * 0.2;
//     if (sepolia_amount > balances.sepolia) {
//         sepolia_amount = balances.sepolia;
//     }

//     const sortedArray: Sorted_Array =
//     {
//         chainIds: [CHAIN_ID.FUJI, CHAIN_ID.MUMBAI, CHAIN_ID.SEPOLIA],
//         amounts: [fuji_amount, mumbai_amount, sepolia_amount]
//     }

//     return sortedArray;
// }