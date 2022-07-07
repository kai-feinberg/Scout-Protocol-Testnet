
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";

import logo from "../../images/scoutLogo.png";

const NavBarItem = ({ title, classprops }) => (
  <li className={`mx-4 cursor-pointer ${classprops}`}>{title}</li>
);


const txnScroll = () =>{
  console.log("txn");
}

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = React.useState(false);

  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <img src={logo} alt="logo" className="w-32 cursor-pointer" />
      </div>

      {/*Maps over an array of items*/}
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {/* {["Transactions", "Contacts", "Tutorials", "Wallets"].map((item, index) => (
          <NavBarItem key={item + index} title={item} />
        ))} */}
        {/* <NavBarItem id={"Transactions1"} title={"Transactions"}/> */}
        <button type="button" className="mx-4 cursor-pointer" onClick={console.log('txn clicked')}> Transactions</button>
        <button
            type="button"
            onClick={txnScroll}
            className="mx-4 cursor-pointer"
          >
            Add Contact
          </button>
        <NavBarItem key={"Contacts2"} title={"Contacts"}/>
        <NavBarItem key={"Tutorials3"} title={"Tutorials"}/>

        <NavBarItem key={"Wallets"} title={"Wallets"}/>

        <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
          Login
        </li>
      </ul>

      {/*creates a mobile view */}
      <div className="flex relative">
        {!toggleMenu && (
          <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)} />
        )}
        {toggleMenu && (
          <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)} />
        )}
        {toggleMenu && (
          <ul
            className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
          >
            <li className="text-xl w-full my-2"><AiOutlineClose onClick={() => setToggleMenu(false)} /></li>
            {["Contacts", "Transactions", "Tutorials", "Wallets"].map(
              (item, index) => <NavBarItem key={item + index} title={item} classprops="my-2 text-lg" />,
            )}
          </ul>
        )}
      </div>
    </nav>
  );

};

export default Navbar;
