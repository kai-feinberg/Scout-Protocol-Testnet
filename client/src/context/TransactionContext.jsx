/*context implements our logic across the entire react app*/
//use props to pass variables back and forth between files
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import Notiflix from 'notiflix';


import { contractABI, contractAddress } from "../utils/constants";


export const TransactionContext = React.createContext();
const { ethereum } = window;

// destructures ethereum object from metamask
const createEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  
  //creates contract object in JSX
  const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);

  return transactionsContract;
};


//used to transfer data from blockchain to the main react app
//object is accessible to entirety of our application
export const TransactionProvider = ({ children }) => {
  //data passed up from welcome to context file through children
  const [formData, setformData] = useState({ addressTo: "", recipientPin: "", amount: "", keyword: "", message: "" });
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));
  const [transactions, setTransactions] = useState([]);
  const [contacts, setContacts] = useState([]);
  
  //dynamically updates state of form
  const handleChange = (e, htmlname) => {
    setformData((prevState) => ({ ...prevState, [htmlname]: e.target.value }));
  };

  const getAllTransactions = async () => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();

        const availableTransactions = await transactionsContract.getAllTransactions();
        //console.log(availableTransactions);

        //immediately returns an object for each element in mapping
        const structuredTransactions = availableTransactions.map((transaction) => ({
          addressTo: transaction.reciever,
          addressFrom: transaction.sender,
          timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
          message: transaction.message,
          keyword: transaction.keyword,
          amount: parseInt(transaction.amount._hex) / (10 ** 18),
          token: transaction.token,

          //need to insert token
        }));

        //console.log(structuredTransactions);

        setTransactions(structuredTransactions);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllContacts = async () =>{
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();

        const availableContacts = await transactionsContract.getAllContacts();

        //immediately returns an object for each element in mapping
        const structuredContacts = availableContacts.map((contact) => ({
          name: contact.name,
          address: contact.contactAddress,
        }));

        //console.log(structuredContacts);

        setContacts(structuredContacts);
        // console.log(contacts);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  }


  const checkIfWalletIsConnect = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_accounts" });
      const chainId = await ethereum.request({method: 'eth_chainId'});

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        if (chainId !== '0x4'){
          Notiflix.Report.warning("Wrong Network!", "Please switch to the rinkeby testnet", "Done");
          switchNetwork();
        }
        getAllTransactions();
        getAllContacts();

      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const switchNetwork = async () => {
	if (window.ethereum) {
		try {

			await window.ethereum.request({
				method: 'wallet_switchEthereumChain',
				params: [{ chainId: '0x4' }], // Check networks.js for hexadecimal network ids
			});
      window.location.reload();
		} catch (error) {
			// This error code means that the chain we want has not been added to MetaMask
			// In this case we ask the user to add it to their MetaMask
			if (error.code === 4902) {
				try {
					await window.ethereum.request({
						method: 'wallet_addEthereumChain',
						params: [
							{	
								chainId: '0x4',
								chainName: 'Rinkeby Testnet',
								rpcUrls: ['https://rinkeby.infura.io/v3/'],
								nativeCurrency: {
										name: "Ethereum",
										symbol: "ETH",
										decimals: 18
								},
								blockExplorerUrls: ["https://rinkey.etherscan.io"]
							},
						],
					});
				} catch (error) {
					console.log(error);
				}
			}
			console.log(error);
		}
	} else {
		// If window.ethereum is not found then MetaMask is not installed
		alert('MetaMask is not installed. Please install it to use this app: https://metamask.io/download.html');
	} 
}

  const checkIfTransactionsExists = async () => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();
        const currentTransactionCount = await transactionsContract.getTransactionCount();

        window.localStorage.setItem("transactionCount", currentTransactionCount);
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_requestAccounts", });

      setCurrentAccount(accounts[0]);
      window.location.reload();
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const disconnectWallet = async () => {
    await window.ethereum.request({
      method: "wallet_requestPermissions",
      params: [
        {
          eth_accounts: {}
        }
      ]
    });
    window.location.reload();
  };

  const sendTransaction = async () => {
    try {
      if (ethereum) {
        const { addressTo, amount, keyword, message } = formData;
        const transactionsContract = createEthereumContract();
        const parsedAmount = ethers.utils.parseEther(amount);
        
        //requests a p-2-p txn to be signed from metamask
        await ethereum.request({
          method: "eth_sendTransaction",
          params: [{
            from: currentAccount, //state variable
            to: addressTo, //passed through form
            gas: "0x5208",
            value: parsedAmount._hex,
          }],
        });

        const transactionHash = await transactionsContract.addToBlockchain(addressTo, parsedAmount, message, keyword);

        setIsLoading(true);
        console.log(`Loading - ${transactionHash.hash}`);
        await transactionHash.wait();
        console.log(`Success - ${transactionHash.hash}`);
        setIsLoading(false);

        const transactionsCount = await transactionsContract.getTransactionCount();

        setTransactionCount(transactionsCount.toNumber());
       
        Notiflix.Notify.success('Transaction '+ JSON.stringify(transactionHash.hash) +' completed successfully', {pauseOnHover: true});
        window.location.reload();
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnect();
    checkIfTransactionsExists();
  }, [transactionCount]);
  

  return (
    <TransactionContext.Provider
      value={{
        transactionCount,
        connectWallet,
        disconnectWallet,
        transactions,
        currentAccount,
        setIsLoading,
        isLoading,
        sendTransaction,
        handleChange,
        formData,
        contacts,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
