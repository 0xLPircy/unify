import { BigNumber } from "ethers";
import { Response, BalancesResponse } from "@covalenthq/client-sdk";
import { USDC_ADDRESS } from "./constant";

const converToNumber = (value: bigint) => {
    const bigNumber = BigNumber.from(value);
    const divisor = BigNumber.from(10).pow(18);
    const result = bigNumber.div(divisor);

    return result.toNumber();
}

const getBalance = (response: Response<BalancesResponse>): number => {
    let usdc_balance: number = 0;
    response.data.items.filter((item) => {
        if (item.contract_address === USDC_ADDRESS.toLocaleLowerCase()) {
            usdc_balance = converToNumber(item.balance);
        }
    });
    return usdc_balance;
}

export { converToNumber, getBalance };
