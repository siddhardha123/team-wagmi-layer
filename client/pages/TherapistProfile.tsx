import {useEffect,useState} from 'react'
import contractConfig from "../contractConfig.json";
import {
    useContractRead,
  } from "wagmi";
import { useRouter } from 'next/router';
import SlotBooking from '../components/SlotBooking'

const  TherapistProfile = () => {
  const router = useRouter();
  const [profile,setProfile] = useState([]);
  const { id } = router.query;
  const { data: readData } = useContractRead({
    address: "0xD0E89B010067ad237A57299ea344BF9d70aC4dc9",
    abi: contractConfig.abi,
    functionName: "getAllTherapists",
  });

  useEffect(() => {
    console.log("-----------------------");
    console.log("useWrite:", readData);
    console.log("-----------------------");
    const matchingProfiles = readData.filter(data => data.name === id);
    setProfile(matchingProfiles)

  }, [readData]);
  return (
        
       <>
            <div className='px-10 my-auto'>{profile.map((item,idx)=>(
                  <div key={idx} className="p-5 bg-gray-200 rounded-md shadow-sm mt-5">
                  <a href={item.name}>
                    <div className="flex ">
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
                            <p className="text-gray-500 mt-5 pr-2">
                              Specialization: <br />
                              {item.achievements}
                            </p>
                            <p className="text-gray-500 mt-2 pr-2">
                              About: <br />
                              {item.description}
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
                              {/* {ethers.utils.formatEther(item.payPerSlot.toString())} */}
                              per slot
                            </span>
                          </div>
                        </div>
                        <div className="mt-4 items-center space-y-4 text-sm sm:flex sm:space-x-4 sm:space-y-0">
                          
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
            ))}</div>
            
            <div>
              <SlotBooking/>
            </div>
            
       </>
  );
}

export default TherapistProfile;
