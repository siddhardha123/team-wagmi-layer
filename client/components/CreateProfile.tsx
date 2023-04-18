import React from 'react'
import { useState,useEffect } from 'react';
import contractConfig from "../contractConfig.json";
import { ethers,BigNumber } from 'ethers';
import {
    UseContractConfig,
    useContractRead,
    usePrepareContractWrite,
    useWaitForTransaction,
    useContractWrite,
  } from "wagmi";
const CreateProfile = () => {
    const [name, setName] = useState('');
    const [image,setImage] = useState('');
    const [walletAddress, setWalletAddress] = useState('');
    const [qualification, setQualification] = useState('');
    const [about, setAbout] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [payPerSlot, setPayPerSlot] = useState('');
    const [loading, setLoading] = useState(false)
    const [wei,setWei] = useState(BigNumber.from(0))
    
    const { config } = usePrepareContractWrite({
        address: `${contractConfig.address}`,
        abi: contractConfig.abi,
        functionName: "addTherapist",
        args: [name,image,walletAddress,qualification,about,specialization,wei],
      });

    const { data: readData } = useContractRead({
    address: `${contractConfig.address}`,
    abi: contractConfig.abi,
    functionName: "getAllTherapists",
  });
    const { data: writeData, write } = useContractWrite(config);
    const { data: waitForTransactionData ,isSuccess} = useWaitForTransaction({
    hash: writeData?.hash,
  });
    const handleSubmit = async (e:any) => {
        e.preventDefault();
        if(name && image && walletAddress && qualification && about && specialization && payPerSlot){
             setWei(ethers.utils.parseEther(payPerSlot.toString()))
             console.log(BigNumber.from(wei).toNumber())
             setLoading(true)
             console.log(write)
             write?.()
             console.log("heyy")
             setLoading(false);
             console.log(writeData)
        }else{
            console.log("error")
        }
       
       
       
  
    };
    useEffect(() => {
        console.log("-----------------------");
        console.log("useRead:", readData);
        console.log("useWrite:", writeData);
        console.log("wait for transaction:", waitForTransactionData);
        console.log("-----------------------");
        
    
      }, [waitForTransactionData,readData]);
    


    return (
        <main className="py-14">
            <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
                <div className="max-w-lg mx-auto space-y-3 sm:text-center">
                    <p className="text-gray-800 text-3xl font-semibold sm:text-4xl">Add Therapist</p>
                </div>
                <div className="mt-12 max-w-lg mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="flex flex-col items-center gap-y-5 gap-x-6 [&>*]:w-full sm:flex-row">
                            <div>
                                <label className="font-medium">Name</label>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                />
                            </div>
                            
                            <div>
                                <label className="font-medium">Wallet Address</label>
                                <input
                                    type="text"
                                    required
                                    value={walletAddress}
                                    onChange={(e) => setWalletAddress(e.target.value)}
                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                />
                            </div>
                        </div>
                        <div>
                                <label className="font-medium">Image</label>
                                <input
                                    type="text"
                                    required
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                />
                            </div>
                        <div>
                            <label className="font-medium">Qualification</label>
                            <input
                                type="text"
                                required
                                value={qualification}
                                onChange={(e) => setQualification(e.target.value)}
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            />
                        </div>

                        <div>
                            <label className="font-medium">Description</label>
                            <textarea
                                required
                                value={about}
                                onChange={(e) => setAbout(e.target.value)}
                                className="w-full mt-2 h-36 px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            ></textarea>
                        </div>
                        <div>
                            <label className="font-medium">Achievements</label>
                            <textarea
                                required
                                value={specialization}
                                onChange={(e) => setSpecialization(e.target.value)}
                                className="w-full mt-2 h-36 px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            ></textarea>
                        </div>
                        <div>
                            <label className="font-medium">PayPer Slot</label>
                            <input
                                type="number"
                                required
                                value={payPerSlot}
                                onChange={(e) => setPayPerSlot(e.target.value)}
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            />
                        </div>
                        <div className="text-center">
                            <button
                            
                                type="submit"
                                className="inline-flex items-center px-6 py-3 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                disabled={!write}
                            >
                                
                             {loading ? "loading" : "submit"}
                            </button>

                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}

export default CreateProfile
