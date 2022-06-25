
const main = async () =>  {



  const Transactions = await hre.ethers.getContractFactory("Transactions");
  const transactions = await Transactions.deploy();

  await transactions.deployed();

  console.log("transactions deployed to:", transactions.address);
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