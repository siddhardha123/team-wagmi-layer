import { useState, useEffect } from "react";
import { ethers } from 'ethers';
import type { NextPage } from "next";
import { ConnectKitButton } from "connectkit";
import createRoom from "./api/fetchRoom";
import Flow from "@/components/Flow";
import contractConfig from "../contractConfig.json";
import Landing from "@/components/Landing";
import Footer from "@/components/Footer";
import Features from "@/components/Features";
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
  // const { data: readData } = useContractRead({
  //   address: "0xc194EA4D952dA2B32256558affef763c553b49CF",
  //   abi: contractConfig.abi,
  //   functionName: "getNumber",
  // });

  // const { config } = usePrepareContractWrite({
  //   address: "0xc194EA4D952dA2B32256558affef763c553b49CF",
  //   abi: contractConfig.abi,
  //   functionName: "changeNumber",
  //   args: [number],
  // });

  // const { data: writeData, write } = useContractWrite(config);

  // const { data: waitForTransactionData ,isSuccess} = useWaitForTransaction({
  //   hash: writeData?.hash,
  // });

  useEffect(() => {
    // createRoom("0x89BA961732394F806E8fb2bBf138A6ECF057B2d9").then((data)=>{
    //    console.log(data)
    // })
    // console.log("-----------------------");
    // console.log("useRead:", readData);
    // console.log("useWrite:", writeData);
    // console.log("wait for transaction:", waitForTransactionData);
    // console.log("-----------------------");
    // if(readData){
    //   let num = ethers.BigNumber.from(readData.toString()).toNumber()
    //   setOnChainNumber(num) 
    //   console.log("onChainNumber:", onChainNumber);  
    // }

  }, []);

  return (
    <>
        <Landing/>
        <br/>
      <h3 className="text-center text-gray-800 text-3xl font-semibold sm:text-4xl">
                        How it works
                    </h3>
                    <br/>
        <Flow/>
        <Features/>
        <Footer/>
    </>
  );
};

export default Home;
