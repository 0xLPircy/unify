import { CovalentClient } from "@covalenthq/client-sdk";
import { Network, TokenBalances } from "./types";
import { getBalance } from "./utils";
import { CHAINS } from "../_lib/constants";

const client = new CovalentClient("cqt_rQHDQTCDH4XvmFpbvjjxwY8FR9rW");

const getTokenBalances = async (walletAddress: string): Promise<TokenBalances[]> => {
    const balances: TokenBalances[] = await Promise.all(
        CHAINS.map(async chain => {
            const res = await client.BalanceService.getTokenBalancesForWalletAddress(Network[chain], walletAddress);
            // filter the response to get the token balance of USDC
            const bal: number = getBalance(res);
            return {
                chain,
                amount: bal
            }
        })
    )

    console.log("Balances: ", balances);
    return balances;
}

export { getTokenBalances };
