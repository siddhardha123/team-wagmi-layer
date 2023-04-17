
import React from "react";
import { useAccount } from "wagmi";

// Make sure that this component is wrapped with ConnectKitProvider
const MyComponent = () => {

  // contract address 0x51818E979636Eb6882E7F4686DECbA2907F06a68
  const { address,isConnected } = useAccount();
   const [add,setAdd] = React.useState("")
   const [isC,setIsC] = React.useState(false)

   React.useEffect(() => {
    if(address){
        setAdd(address)
    }
    if(isConnected){
       setIsC(true)
    }else{
       setIsC(false)
    }
  });
   
//   if (isConnecting) return <div>Connecting...</div>;
//   if (isDisconnected) return <div>Disconnected</div>;
  return (
     <>
      
        welcome to the home page 
     </>
  
  );
};


export default MyComponent;