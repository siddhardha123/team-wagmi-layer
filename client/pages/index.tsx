import { useState, useEffect } from "react";
import { ethers } from 'ethers';
import type { NextPage } from "next";
import { ConnectKitButton } from "connectkit";
// import Navbar from "@/components/Navbar";
// import MyComponent from "./address";
import contractConfig from "../contractConfig.json";
import {
  UseContractConfig,
  useContractRead,
  usePrepareContractWrite,
  useWaitForTransaction,
  useContractWrite,
} from "wagmi";

const Home: NextPage = () => {

  // const convertToNumber = (temp : any) => {
  //   let num = ethers.BigNumber.from(temp.toString()).toNumber()
  //   return num;
  // }
  const [number, setNumber] = useState(0);
  // const [onChainNumber,setOnChainNumber] = useState(0);
  const { data: readData } = useContractRead({
    address: "0xc194EA4D952dA2B32256558affef763c553b49CF",
    abi: contractConfig.abi,
    functionName: "getNumber",
  });

  const { config } = usePrepareContractWrite({
    address: "0xc194EA4D952dA2B32256558affef763c553b49CF",
    abi: contractConfig.abi,
    functionName: "changeNumber",
    args: [number],
  });

  const { data: writeData, write } = useContractWrite(config);

  const { data: waitForTransactionData ,isSuccess} = useWaitForTransaction({
    hash: writeData?.hash,
  });

  useEffect(() => {
    console.log("-----------------------");
    console.log("useRead:", readData);
    console.log("useWrite:", writeData);
    console.log("wait for transaction:", waitForTransactionData);
    console.log("-----------------------");
    // if(readData){
    //   let num = ethers.BigNumber.from(readData.toString()).toNumber()
    //   setOnChainNumber(num) 
    //   console.log("onChainNumber:", onChainNumber);  
    // }

  }, [readData,writeData,waitForTransactionData]);

  return (
    <div className=" mx-[30%] my-48 bg-gray-50">
      <div className="">
        <ConnectKitButton />
      </div>
      <div>
        <p>enter a number to change:- </p>
        <input
          onChange={(e) => setNumber(parseInt(e.target.value))}
          type="number"
        />
        <button
          disabled={!write}
          onClick={() => write?.()}
          className="px-3 py-1 bg-blue-200"
        >
          change number
        </button>
       
      </div>
    </div>
  );
};

export default Home;
