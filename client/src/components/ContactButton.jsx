import React, { useState } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";

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

const ContactButton = () => {
    const { ethereum } = window;
    const [seen, setSeen] = useState(false);
    const [contactName, setContactName] = useState("");
    const [contactAdd, setContactAdd] = useState("");

    const changeSeen = () => {
        setSeen(!seen);
    };
    const handleName = (e, htmlname) => {
        setContactName((prevState) => ({ ...prevState, [htmlname]: e.target.value }));
    };
    const handleAdd = (e, htmlname) => {
        setContactAdd((prevState) => ({ ...prevState, [htmlname]: e.target.value }));
    };
   

    const addContact = async () => {
        if (!contactAdd || !contactName) return;
        const transactionsContract = createEthereumContract();
        console.log(contactAdd.address);
        console.log(contactName.name);
        const cnt = await transactionsContract.addContact(contactAdd.address, contactName.name);
        await cnt.wait();
        changeSeen();
        window.location.reload();
    }

    const createEthereumContract = () => {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        //creates contract object in JSX
        const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);

        return transactionsContract;
    };

    const PopUp = () => {
        return (
            <div className="modal">
                <div className="modal_content">
                    <span className="close" onClick={changeSeen}>
                        &times;
                    </span>

                    <h3 className="text-white text-base font-semibold"> Adding Contact </h3>

                    <p className="text-white text-base font-semibold col-25 "> Name: </p>
                    <div className="p-1 sm:w-40 w-quarter flex flex-col justify-start items-center blue-glassmorphism col-75">
                        <Input placeholder="ex Dave" name="name" type="text" handleChange={handleName} />
                    </div>

                    <br></br>
                    <br></br>
                    <br></br>

                    <p className="text-white text-base font-semibold col-25"> Address: </p>
                    <div className="p-1 sm:w-40 w-quarter flex flex-col justify-start items-center blue-glassmorphism col-75">
                        <Input placeholder="ex 0xfA7C630507A3626308467FAf8aeceb756c435559" name="address" type="text" handleChange={handleAdd} />
                    </div>


                    <br />
                    <button
                        type="button"
                        onClick={addContact}
                        className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                    >
                        Send now
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="align: right">
            <div>
                <button
                    type="button"
                    onClick={changeSeen}
                    className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
                >
                    +
                </button>
            </div>
            {seen ? PopUp() : null}
        </div>
    )
}

export default ContactButton;