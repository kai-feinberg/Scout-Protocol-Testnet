import React from "react";
import { BsShieldFillCheck } from "react-icons/bs";
import { BsPersonPlus } from "react-icons/bs";
import { BsCheck2Circle } from "react-icons/bs";

//dynamic definition of card
const ServiceCard = ({ color, title, icon, subtitle }) => (
  <div className="flex flex-row justify-start items-center white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl">
    <div className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}>
      {icon}
    </div>
    <div className="ml-5 flex flex-col flex-1">
      <h3 className="mt-2 text-white text-lg">{title}</h3>
      <p className="mt-1 text-white text-sm md:w-9/12">
        {subtitle}
      </p>
    </div>
  </div>
);

const Services = () => (
  <div className="flex w-full justify-center items-center gradient-bg-services">
    <br></br>
    <br></br>
    <br></br>
    <div className="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4">
      <div className="flex-1 flex flex-col justify-start items-start">
        <h1 className="text-white text-3xl sm:text-5xl py-2 text-gradient ">
          Services that we
          <br />
          continue to improve
        </h1>
        <p className="text-left my-2 text-white font-light md:w-9/12 w-11/12 text-base">
          The safe way to send your crypto! Free yourself from cumbersome interfaces with SCOUT
        </p>
      </div>

      <div className="flex-1 flex flex-col justify-start items-center">
        <ServiceCard
          color="bg-[#2952E3]" //background color for icon
          title="Decentralized"
          icon={<BsShieldFillCheck fontSize={21} className="text-white" />}
          subtitle="You have full control of your fund at all times. Peer-to-Peer transactions only"
        />
        <ServiceCard
          color="bg-[#8945F8]"
          title="Contact System"
          icon={<BsPersonPlus fontSize={21} className="text-white" />}
          subtitle="A contact and whitelisting system allows easy transfers to your favorite people"
        />
        <ServiceCard
          color="bg-[#5CB529]"
          title="Pin confirmation"
          icon={<BsCheck2Circle fontSize={21} className="text-white" />}
          subtitle="PIN confirmation ensures your funds always arrive at their intended destination"
        />
      </div>
    </div>
  </div>
);

export default Services;
