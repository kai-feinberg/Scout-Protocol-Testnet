// import { ethers } from "hardhat";

const main = async () =>  {
  const [deployer] = await ethers.getSigners();
  // console.log("Deploying contracts with the account:" , deployer.address);
  // console.log("account balance ", (await deployer.getBalance).toString());
  try{
  const Transactions = await ethers.getContractFactory("Transactions");
  const transactions = await Transactions.deploy();

  await transactions.deployed();

  console.log("transactions deployed to:", transactions.address);
  } catch(error){
    console.log(error);
  }
}

const runMain = async () =>{
  try{
    await main();
    process.exit(0);
  } catch (error){
    console.error(error);
    process.exit(1);
  }
}

runMain();

//transactions deployed to: 0xE4a35455F6e7a61F8e934f7D967999Da5b586120

//goerli: transactions deployed to: 0xf2Fd99774778E5F7101db509a0fb97a77a01F8ae