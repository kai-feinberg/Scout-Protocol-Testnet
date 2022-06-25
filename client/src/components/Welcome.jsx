import React, { useContext, useState} from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";


import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress"; 
import { Loader } from ".";
import { useEffect } from "react";

const companyCommonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
  />
);

const Welcome = () => {
  //destructures all data generated from our context file
  const {currentAccount, connectWallet, handleChange, sendTransaction, formData, isLoading} = useContext(TransactionContext);
  const [currentPin, setCurrentPin] = useState("");
  const [pinData, setPinData] = useState("");
  const { ethereum } = window;

  const handlePin = (e, htmlname) => {
    setPinData((prevState) => ({ ...prevState, [htmlname]: e.target.value }));
    console.log(pinData);
  };

  const handleSubmit = (e) => {
    const { addressTo, amount, keyword, message } = formData;

    //prevents reload
    e.preventDefault();

    if (!addressTo || !amount || !keyword || !message) return;

    sendTransaction();
  };

  const createEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    
    //creates contract object in JSX
    const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);
  
    return transactionsContract;
  };
  
  //pin data is an object with a pin data property for some reason
  const changePin = async () => {
    const transactionsContract = createEthereumContract();
    await transactionsContract.setPin(parseInt(pinData.pinData));
    setCurrentPin(pinData);
    console.log(currentPin);
  }

  
  useEffect(() => {
    // declare the async data fetching function
    const setInitialPin = async () => {
      const transactionsContract = createEthereumContract();
      const p = await transactionsContract.getPin(currentAccount);
      
      // set state with the result
      setCurrentPin(p);
    }
  
    // call the function
    setInitialPin()
      // make sure to catch any error
      .catch(console.error);

    console.log("initial pin", currentPin);
  }, [])


  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start flex-col mf:mr-10">
          <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
            Send Crypto <br /> without the stress
          </h1>
          <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
            Explore the crypto world. Buy and sell cryptocurrencies easily on Krypto.
          </p>
          {!currentAccount && (
            <button
              type="button"
              onClick={connectWallet}
              className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
            >
              <AiFillPlayCircle className="text-white mr-2" />
              <p className="text-white text-base font-semibold">
                Connect Wallet
              </p>
            </button>
          )}

          <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
            <div className={`rounded-tl-2xl ${companyCommonStyles}`}>
              Reliability
            </div>
            <div className={companyCommonStyles}>Security</div>
            <div className={`sm:rounded-tr-2xl ${companyCommonStyles}`}>
              Ethereum
            </div>
            <div className={`sm:rounded-bl-2xl ${companyCommonStyles}`}>
              Web 3.0
            </div>
            <div className={companyCommonStyles}>Low Fees</div>
            <div className={`rounded-br-2xl ${companyCommonStyles}`}>
              Blockchain
            </div>
          </div>
        </div>

      
        <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
        <button
              type="button"
              onClick= {changePin}
              className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
            >
              <p className="text-white text-base font-semibold">
                Set Pin  {console.log(currentPin)}
              </p>
          </button>
          <div className="p-5 sm:w-96 w-half flex flex-col justify-start items-center blue-glassmorphism">
                <Input placeholder="New pin" name="pinData" type="text" handleChange={handlePin} />
          </div>
     
          <div className="p-3 justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card .white-glassmorphism ">
            <div className="flex justify-between flex-col w-full h-full">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                  <SiEthereum fontSize={21} color="#fff" />
                </div>
                <BsInfoCircle fontSize={17} color="#fff" />
              </div>
              <div>
                <p className="text-white font-light text-sm">
                  {shortenAddress(currentAccount)}
                </p>
                <p className="text-white font-semibold text-lg mt-1">
                  Ethereum 
                </p>
                <div>{currentPin.currentPin}</div>
               
              </div>
            </div>
          </div>
          <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
            <Input placeholder="Address To" name="addressTo" type="text" handleChange={handleChange} />
            <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange} />
            <Input placeholder="Keyword (Gif)" name="keyword" type="text" handleChange={handleChange} />
            <Input placeholder="Enter Message" name="message" type="text" handleChange={handleChange} />

            <div className="h-[1px] w-full bg-gray-400 my-2" />

            {isLoading
              ? <Loader />
              : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                >
                  Send now
                </button>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
