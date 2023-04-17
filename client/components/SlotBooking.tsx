import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const availableSlots = {
  "2023-04-15": ["10:00 AM", "11:00 AM", "2:00 PM"],
  "2023-04-16": ["1:00 PM", "3:00 PM"],
  "2023-04-17": ["9:00 AM", "10:00 AM", "11:00 AM"],
};

const AppointmentScheduler = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [slots, setSlots] = useState([]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSlots(availableSlots[date.toISOString().substr(0, 10)] || []);
  };

  const isSpecialDate = (date) => {
    const specialDate = new Date("2023-04-16"); // Set the date you want to style
    return date.toDateString() === specialDate.toDateString();
  };

  const specialDateClassName = (date) => {
    if (isSpecialDate(date)) {
      return "special-date";
    }
    return null;
  };

  return (
    <div className="flex ml-28 ">
   
    <div className="mt-5">
    {/* <h2 className="text-3xl font-bold mb-4">Pick your slot:</h2> */}
      <DatePicker
        className="px-4 py-2 rounded-md shadow-md text-gray-800 font-medium mb-8"
        selected={selectedDate}
        onChange={handleDateChange}
        inline
        dayClassName={specialDateClassName} // apply custom class to special date
      />
    </div>
      
      {slots.length > 0 && (
        <div className=" p-4 rounded-md ml-10 ">
          <h2 className="text-xl font-bold mb-2 ">Available Slots:</h2>
          <ul className="flex space-x-4">
            {slots.map((slot) => (
              <li className="text-gray-800 font-medium rounded-lg bg-blue-100 p-2" key={slot}>
                {slot}
              </li>
            ))}
          </ul>
        </div>
      )}

      <style>
        {`.special-date {
          background-color: #FFB6C1; // set the background color for the special date
        }`}
      </style>
    </div>
  );
};

export default AppointmentScheduler;
