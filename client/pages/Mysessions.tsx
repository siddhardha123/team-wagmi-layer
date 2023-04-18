import React,{useEffect} from 'react'
import dynamic from "next/dynamic";
import contractConfig from "../contractConfig.json";
import BookingList from '@/components/BookingList';
import {
    UseContractConfig,
    useContractRead,
    usePrepareContractWrite,
    useWaitForTransaction,
    useContractWrite,
    useAccount,
  } from "wagmi";

 
const Mysessions = () => {

    const { address } = useAccount()
    const { data: allSlots } = useContractRead({
        address: `${contractConfig.address}`,
        abi: contractConfig.abi,
        functionName: "getAllSlotsByBookedBy",
        overrides: { from: address },
      });

      const { data: therapistSlots } = useContractRead({
        address: `${contractConfig.address}`,
        abi: contractConfig.abi,
        functionName: "getAllSlotsByCreatedBy",
        args:[address]
      });
      
      useEffect(() => {
        console.log("-----------------------");
        console.log("user Slots:", allSlots);
        console.log("therapist slots",therapistSlots);
        console.log("-----------------------");
        // const matchingProfiles = readData.filter(data => data.name === id);
        // setProfile(matchingProfiles)
    
      }, [allSlots,therapistSlots]);
  return (
    <div>
    {
      address == "0x13E0308bda6E015F3e63E914c1A8b5432466B409" ? <BookingList bookings={therapistSlots}/> : <BookingList bookings={allSlots}/>
    }
    </div>
    
  )
}

export default dynamic(() => Promise.resolve(Mysessions), { ssr: false });