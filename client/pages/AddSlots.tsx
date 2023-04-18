import { useState,useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import contractConfig from "../contractConfig.json";
import {
    UseContractConfig,
    useContractRead,
    usePrepareContractWrite,
    useWaitForTransaction,
    useContractWrite,
  } from "wagmi";
const availableSlots = [
  '10:00 AM - 11:00 AM ',
  '1:00 PM - 2:00 PM',
  '4:00 PM - 5:00 PM',
  '7:00 PM - 8:00 PM',
];

const BookingForm = () => {
  const [formatDate,setFormatDate] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');

   
  const { config } = usePrepareContractWrite({
    address: `${contractConfig.address}`,
    abi: contractConfig.abi,
    functionName: "addSlot",
    args: [formatDate,selectedSlot],
  });
  const { data: writeData, write } = useContractWrite(config);
  const { data: waitForTransactionData ,isSuccess} = useWaitForTransaction({
    hash: writeData?.hash,
  });

  

  const handleDateChange = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    setFormatDate(`${day}-${month}-${year}`);
    setSelectedDate(date)
    setSelectedSlot(null);  
  };



  const handleSlotChange = (slot) => {
    setSelectedSlot(slot);
  };

  const handleAddSlot = () => {
    console.log(`Selected Date: ${formatDate}`);
    console.log(`Selected Slot: ${selectedSlot}`);
    write?.()
  };

  useEffect(() => {
    console.log("-----------------------");
    console.log("useWrite:", writeData);
    console.log("wait for transaction:", waitForTransactionData);
    console.log("-----------------------");
    

  }, [waitForTransactionData]);

  return (
    <div className="max-w-sm mx-auto">
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        inline
        className="block w-full text-lg px-4 py-2 mt-2 ml-12 rounded border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
      />

      <div className="grid grid-cols-2 gap-4 mt-4">
        {availableSlots.map((slot) => (
          <button
            key={slot}
            onClick={() => handleSlotChange(slot)}
            className={`text-lg px-4 py-2 rounded-lg border ${
              selectedSlot === slot
                ? 'border-blue-500 bg-blue-500 text-white'
                : 'border-gray-300 hover:border-blue-500'
            }`}
          >
            {slot}
          </button>
        ))}
      </div>

      <button
        onClick={handleAddSlot}
        disabled={!selectedDate || !selectedSlot}
        className="block w-full mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg disabled:bg-gray-400 disabled:pointer-events-none"
      >
        Add Slot
      </button>
    </div>
  );
};

export default BookingForm;
