import React, { useEffect } from "react";
import contractConfig from "../contractConfig.json";
import dynamic from "next/dynamic";
import { ethers } from "ethers";
import Link from "next/link";
import {
  UseContractConfig,
  useContractRead,
  usePrepareContractWrite,
  useWaitForTransaction,
  useContractWrite,
} from "wagmi";
const Ourcounsellors = () => {
  // const therapists = [
  //    {
  //        name : "zayn malick",
  //        image : "https://i.pinimg.com/736x/c6/c1/64/c6c164e07772ff2a09866989ac06eedd.jpg",
  //        qualification : "MA in Clinical Psychology",
  //        achievements : "Anxiety, Stress, Depression, Relationship Issues, Sleep Issues, Self Confidence, Anger, Mood Disorder",
  //        description : "Kriti is a compassionate and skilled therapist, who specializes in helping individuals overcome life's challenges and achieve personal growth. She has a patient and tolerant approach to working with clients in distress, which makes them feel seen, heard, and understood.With many years of experience in psychotherapy, Kriti is committed to promoting mental health and facilitating self-awareness and interpersonal functioning.",
  //        payPerSlot : "0.001",

  //    },
  //    {
  //     name : "zayn malick",
  //     image : "https://i.pinimg.com/736x/c6/c1/64/c6c164e07772ff2a09866989ac06eedd.jpg",
  //     qualification : "MA in Clinical Psychology",
  //     achievements : "Anxiety, Stress, Depression, Relationship Issues, Sleep Issues, Self Confidence, Anger, Mood Disorder",
  //     description : "Kriti is a compassionate and skilled therapist, who specializes in helping individuals overcome life's challenges and achieve personal growth. She has a patient and tolerant approach to working with clients in distress, which makes them feel seen, heard, and understood.With many years of experience in psychotherapy, Kriti is committed to promoting mental health and facilitating self-awareness and interpersonal functioning.",
  //     payPerSlot : "0.001",

  // },
  // {
  //     name : "zayn malick",
  //     image : "https://i.pinimg.com/236x/31/5b/83/315b83b63690a086cdc14c6e7ea27af5.jpg",
  //     qualification : "MA in Clinical Psychology",
  //     achievements : "Anxiety, Stress, Depression, Relationship Issues, Sleep Issues, Self Confidence, Anger, Mood Disorder",
  //     description : "Kriti is a compassionate and skilled therapist, who specializes in helping individuals overcome life's challenges and achieve personal growth. She has a patient and tolerant approach to working with clients in distress, which makes them feel seen, heard, and understood.With many years of experience in psychotherapy, Kriti is committed to promoting mental health and facilitating self-awareness and interpersonal functioning.",
  //     payPerSlot : "0.001",

  // },

  // ]

  const { data: readData } = useContractRead({
    address: `${contractConfig.address}`,
    abi: contractConfig.abi,
    functionName: "getAllTherapists",
  });

  useEffect(() => {
    console.log("-----------------------");
    console.log("useWrite:", readData);
    console.log("-----------------------");
  }, [readData]);

  return (
    <div className="mt-12 max-w-screen-lg mx-auto px-4 md:px-8">
      <div>
        <h1 className="text-gray-800 text-3xl font-semibold">
          We have the best professionals!
          <br /> Licensed and verified, who can help you heal :)
        </h1>
      </div>

      <ul className="mt-12 space-y-6">
        {readData &&
          readData.map((item, idx) => (
            <div key={idx} className="p-5 bg-gray-200 rounded-md shadow-sm">
              <a href={item.name}>
                <div className="flex">
                  <div className="px-10">
                    <img src={item.image} className="rounded-md  " />
                  </div>
                  <div className="ml-12">
                    <div className="justify-between sm:flex">
                      <div className="flex-1">
                        <h3 className="text-xl font-medium text-cyan-600">
                          {item.name}
                        </h3>
                        <p className="text-gray-500 mt-2 pr-2">
                          {item.qualification}
                        </p>
                        <p className="text-gray-500 mt-2 pr-2">
                          Specialization: <br />
                          {item.specialization}
                        </p>
                      </div>
                      <div className="mt-5 space-y-4 text-sm sm:mt-0 sm:space-y-2">
                        <span className="flex items-center text-gray-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {ethers.utils.formatEther(item.payPerSlot.toString())}
                            per slot
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 items-center space-y-4 text-sm sm:flex sm:space-x-4 sm:space-y-0">
                      <button className="px-4 py-2 text-white bg-indigo-600 rounded-lg duration-150 hover:bg-indigo-700 active:shadow-lg">
                        View profile
                      </button>
                      <Link
                        href={{
                          pathname: "/TherapistProfile",
                          query: { id: `${item.name}`,add : `${item.walletAddress}` },
                        }}
                      >
                        <button className="mx-2 px-4 py-2 text-white bg-indigo-600 rounded-lg duration-150 hover:bg-indigo-700 active:shadow-lg">
                          Book a slot
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))}
      </ul>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Ourcounsellors), { ssr: false });
