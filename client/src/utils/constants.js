import abi from "./Transactions.json";
import goerliabi from "./goerliTransactions.json";
import GOERLI_USDC_ABI from "./contractABIs.json";
import exp from "constants";

//export const contractAddress = "0xE4a35455F6e7a61F8e934f7D967999Da5b586120";
export const contractAddress = "0x589859241a30fac8e5C2Ea73C8706052b20660D2";
export const contractABI = abi.abi;

export const goerliContractAddress= "0xf2Fd99774778E5F7101db509a0fb97a77a01F8ae";
export const goerliContractABI = goerliabi.abi;

export const goerliusdcAddress = "0xD87Ba7A50B2E7E660f678A895E4B72E7CB4CCd9C";
export const goerliusdcABI = GOERLI_USDC_ABI.GOERLI_USDC_ABI;


//for live ethereum network
