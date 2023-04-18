import React from "react";

const SessionCard = ({id,date,time,onClick}) => {

    const handleClick = () =>{
        onClick(id)
        console.log(id.toNumber())
    }
  return (
    <div className="bg-white drop-shadow-2xl rounded-lg overflow-hidden w-96 flex justify-between ml-10 ">
      <div className="px-4 py-2 text-black">
        <h1 className=" font-bold">{date.slice(0,10)}</h1>
        <p className="text-gray-400">{time}</p>
        
      </div>
      <div className="px-4 py-2">
      <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleClick}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default SessionCard;
