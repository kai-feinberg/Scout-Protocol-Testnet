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
            <div class="modal">
                <div class="modal-content">
                    <span className="close" onClick={changeSeen}>
                        &times;
                    </span>

                    <h1 className="text-white text-4xl font-semibold"> Add Contact </h1>
                    <br />
                    <table>
                        <tr>
                            <td>                           
                            <p className="w-flex text-white text-base text-lgfont semibold name"> Name: </p>
                            </td>

                            <td>
                                <div className="p-1 sm:w-40 w-flex flex flex-col justify-start items-center blue-glassmorphism n-input">
                                    <Input placeholder="Name" name="name" type="text" handleChange={handleName} />
                                </div>
                            </td>

                        </tr>
                        <tr>
                            <td><p className="text-white text-base font-semibold address"> Address: </p></td>
                            <td>
                                <div className="p-1 sm:w-40 w-flex flex flex-col justify-start items-center blue-glassmorphism a-input">
                                    <Input placeholder="ex 0xfA7C630507A3626308467FAf8aeceb756c435559" name="address" type="text" handleChange={handleAdd} />
                                </div>
                            </td>
                        </tr>

                    </table>

                    <br />
                    
                    <button
                        type="button"
                        onClick={addContact}
                        className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                    >
                        Submit
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="inline-block">
            <div className="btn">
                <div>
                    <button
                        type="button"
                        onClick={changeSeen}
                        className="my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
                    >
                        +
                    </button>
                </div>
            
            </div>
            <div>{seen ? PopUp() : null}</div>
        </div>
    )
}

export default ContactButton;