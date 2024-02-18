import { CovalentClient } from "@covalenthq/client-sdk";
import { Network, TokenBalances } from "./types";
import { getBalance } from "./utils";

const client = new CovalentClient("YOUR_API_KEY");

const getTokenBalances = async (walletAddress: string): Promise<TokenBalances> => {
    const fuji_resp = await client.BalanceService.getTokenBalancesForWalletAddress(Network.FUJI, walletAddress);
    // filter the response to get the token balance of USDC
    const fuji_usdc_balance: number = getBalance(fuji_resp);

    const mumbai_resp = await client.BalanceService.getTokenBalancesForWalletAddress(Network.MUMBAI, walletAddress);
    // filter the response to get the token balance of USDC
    const mumbai_usdc_balance: number = getBalance(mumbai_resp);

    const sepolia_resp = await client.BalanceService.getTokenBalancesForWalletAddress(Network.SEPOLIA, walletAddress);
    // filter the response to get the token balance of USDC
    const sepolia_usdc_balance: number = getBalance(sepolia_resp);

    const balances: TokenBalances = {
        fuji: fuji_usdc_balance,
        mumbai: mumbai_usdc_balance,
        sepolia: sepolia_usdc_balance
    }

    console.log("Balances: ", balances);
    return balances;
}

export { getTokenBalances };
