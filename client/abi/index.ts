import { CONTRACT_DETAILS } from "./types";
import mainContractAbi from "./mainContract.json";
import ierc20Abi from "./IERC20.json";

const MainContract: CONTRACT_DETAILS = {
    contractName: "MainContract",
    contractAddress: "0x75e45dB056dc5844BcDa23e468ab3493A427e932",
    chainId: 43113,
    abi: mainContractAbi.abi,
};

const IERC20: CONTRACT_DETAILS = {
    contractName: "IERC20",
    contractAddress: "0x55104Ed9ab9f3b58dB55D60429091cA203302FaF",
    chainId: 43113,
    abi: ierc20Abi.abi,
};

exports = {
    MainContract,
    IERC20,
};