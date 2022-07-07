import React, { useContext, } from "react";

import { TransactionContext } from "../context/TransactionContext";
import dummyContacts from "../utils/dummyContacts";
import ContactButton from "./ContactButton";
import { shortenAddress } from "../utils/shortenAddress";



//destructure values from transaction object
const ContactCard = ({ name, address }) => {

    // const name = contact[name];
    // const address = contact[address];

    return (
        <tr>
            <td>{name}</td>
            <td>{address}</td>
        </tr>
    );
};

const Contacts = () => {
    const { contacts, currentAccount } = useContext(TransactionContext);
    return (
        <div className="gradient-bg-contacts">
            <div className="flex flex-col md:p-12 py-12 px-4 ">
                {currentAccount ? (
                    <div>
                        <h3 className="text-white text-3xl text-center my-2">
                            Saved Contacts
                        </h3>
                        
                        <div className="flex flex-wrap justify-center items-center mt-10">
                            <table class="purpleHorizon">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>
                                            Address 
                                            {ContactButton()}
                                            
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {[...contacts].map((contact, i) => (<ContactCard key={i} {...contact} />))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div>
                        <h3 className="text-white text-3xl text-center my-2">
                            Connect to see your saved contacts
                        </h3>

                        <div className="flex flex-wrap justify-center items-center mt-10">
                            <table class="purpleHorizon">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Address {ContactButton()}</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {[...dummyContacts].map((contact, i) => (<ContactCard key={i} {...contact} />))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

            </div>



        </div>
    );
};

export default Contacts;
