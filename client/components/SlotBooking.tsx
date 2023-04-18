import React,{useEffect,useState} from "react";
import SessionCard from "./SessionCard";
import { useRouter } from 'next/router';
import {BigNumber} from 'ethers'
import contractConfig from "../contractConfig.json";
import {ethers} from 'ethers'
import createRoom from "@/pages/api/fetchRoom";
import {
    useContractRead,
    usePrepareContractWrite,
    useContractWrite,
    useWaitForTransaction,
    useAccount,

  } from "wagmi";  
const sessions = [
  { date: "Monday, April 24", time: "10:00 AM - 11:00 AM" },
  { date: "Tuesday, April 25", time: "1:00 PM - 2:00 PM" },
  { date: "Wednesday, April 26", time: "3:00 PM - 4:00 PM" },
];


const Sessions = () => {
    const {address}  = useAccount()
   const router = useRouter()
   const { id,add } = router.query;

   const [avSlots,setAvSlots] = useState()
   const [idx,setIdx] = useState(BigNumber.from(0));
   const [roomId,setRoomId] = useState('');
  const handleCardClick = (val) => {
     setIdx(val)
     createRoom(address).then((data)=>{
      console.log(data.data.roomId)
      setRoomId(data.data.roomId)
     })
     console.log(idx)
     write?.()
  };
  const { data: readData } = useContractRead({
    address: `${contractConfig.address}`,
    abi: contractConfig.abi,
    functionName: "getAllSlotsByCreatedBy",
    args: [add],
  });

//   const { config } = usePrepareContractWrite({
//     address: "0x5518B60cE7b3eB589bF10CA2e7D4c1cF2845e1fd",
//     abi: contractConfig.abi,
//     functionName: "bookSlot",
//     args: [idx],
//   });
  const { data: writeData, write } = useContractWrite({
    mode: 'recklesslyUnprepared',
    address: "0x543D7F40B60631bC01Ec2d3b4EdF7A51eb422b0d",
    abi: contractConfig.abi,
    functionName: "bookSlot",
    args: [idx,roomId],
    overrides: {
        from: address,
        value: ethers.utils.parseEther('0.0'),
      }
      
      });
  const { data: waitForTransactionData ,isSuccess} = useWaitForTransaction({
  hash: writeData?.hash,
});

  useEffect(() => {
    console.log("-----------------------");
    console.log("useRead:", readData);
    console.log("useWrite:", writeData);
    console.log("-----------------------");
    // setProfile(matchingProfiles)
    
    const AvailableSlots = readData.filter(data => data.isAvailable === true);
    setAvSlots(AvailableSlots)

  }, [readData,waitForTransactionData,writeData]);


  return (
    <div className="space-y-2 mt-5">
        
      {avSlots && avSlots.map((data,idx) => (
        <SessionCard
          key={idx}
          id={data.index}
          date={data.date}
          time={data.slotTime}
          onClick={handleCardClick}
        />
      ))}
    </div>
  );
};

export default Sessions;
