"use client"

import { TokenBalances } from "@/app/api/types";
import { CHAIN_ID } from "@/app/txn_builder/types";
import { parseUnits } from "@ethersproject/units";
import { BigNumber, ethers } from "ethers";
import { createContext, useContext, useEffect, useState } from "react";


type State = {
    deductions: any[];
    recipient: string;
    amount: number;
    network: string;
    setRecipient: React.Dispatch<React.SetStateAction<string>>;
    setAmount: React.Dispatch<React.SetStateAction<number>>;
    setNetwork: React.Dispatch<React.SetStateAction<string>>;
    calculateDeductions: (userFunds: TokenBalances[], totalAmount: number) => Promise<void>;
    deductionChainId: any[];
    deductionAmount: any[];
    destinationChainId: number;
};


const appContext = createContext<State>({
    deductions: [],
    recipient: '',
    amount: 0,
    network: '',
    setRecipient: () => { },
    setAmount: () => { },
    setNetwork: () => { },
    calculateDeductions: async (userFunds: TokenBalances[], totalAmount: number) => { },
    deductionAmount: [],
    deductionChainId: [],
    destinationChainId: 0
});


const useAppContext = () => {
    const context = useContext(appContext);

    if (!context) {
        throw new Error(
            "useAppContext should be used within a AppContext Provider"
        );
    }

    return context;
};

const AppContextProvider = ({ children }) => {
    const [deductions, setDeductions] = useState([])
    const [deductionChainId, setDeductionChainId] = useState([])
    const [deductionAmount, setDeductionAmount] = useState([])
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState<number>(0);
    const [network, setNetwork] = useState('');
    const [destinationChainId, setDestinationChainId] = useState(0);

    enum CHAIN_DEDUCTION {
        avalanche = 0.5,
        polygon = 0.25,
        ethereum = 0.25,
    }

    const calculateDeductions = async (userFunds: TokenBalances[], totalAmount: number) => {
        try {
            const chainIds: BigNumber[] = [];
            const amounts: BigNumber[] = [];
            // let remainingAmount = totalAmount;

            // const chainsWithAmount: string[] = [];
            // const chainsWithoutAmount: string[] = [];

            // userFunds.forEach(funds => {
            //     if (funds.amount > 0) {
            //         chainsWithAmount.push(funds.chain);
            //     } else {
            //         chainsWithoutAmount.push(funds.chain);
            //     }
            // });

            const res = await Promise.all(
                userFunds.map(funds => {
                    const deduction = CHAIN_DEDUCTION[funds.chain] || 0; // Get deduction for the chain, or default to 0 if not found
                    console.log("FUNDS:", funds, totalAmount * deduction)
                    if (funds.amount >= totalAmount * deduction) {
                        chainIds.push(ethers.BigNumber.from(CHAIN_ID[funds.chain]));
                        const deductedAmount = totalAmount * deduction;
                        amounts.push(parseUnits(deductedAmount.toString(), "ether"));
                        return {
                            chain: funds.chain,
                            amount: deductedAmount,
                        }
                        // remainingAmount -= deductedAmount.toNumber();
                    }
                    // else {
                    //     amounts.push(ethers.BigNumber.from(funds.amount));
                    //     remainingAmount -= funds.amount;
                    //     chainsWithoutAmount.push(funds.chain)
                    // }
                })
            );

            // If there's still remaining amount, distribute it among chains without any amount
            // if (remainingAmount > 0 && chainsWithoutAmount.length > 0) {
            //     const equalAmount = ethers.BigNumber.from(remainingAmount).div(chainsWithoutAmount.length);
            //     chainsWithoutAmount.forEach(chain => {
            //         const index = userFunds.findIndex(funds => funds.chain === chain);
            //         amounts[index] = amounts[index].add(equalAmount);
            //     });
            // }
            console.log("deduction=========", res, amounts, chainIds)
            setDeductions(res);
            setDeductionAmount(amounts)
            setDeductionChainId(chainIds)
        } catch (error) {
            console.error(error)
            throw "Decimal value not allowed"
        }
    };

    useEffect(() => {
        setDestinationChainId(CHAIN_ID[network])
    }, [network])
    const state = {
        deductions,
        calculateDeductions,
        recipient,
        amount,
        network,
        setRecipient,
        setAmount,
        setNetwork,
        deductionAmount,
        deductionChainId,
        destinationChainId
    };
    return (
        <appContext.Provider value={state}>
            {children}
        </appContext.Provider>
    );
};

export { AppContextProvider, useAppContext }