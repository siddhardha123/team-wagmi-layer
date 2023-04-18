import React from 'react';
import moment from 'moment';
import 'tailwindcss/tailwind.css';

const BookingList = ({ bookings } : any) => {

    const upcomingSessions = bookings.filter((booking : any) => !booking.isCompleted);
    const previousSessions = bookings.filter((booking : any) => booking.isCompleted);
 
  return (
    <div className="flex flex-col mx-64 justify-center">
      <h2 className="text-2xl font-bold mb-4">Upcoming Sessions</h2>
      { upcomingSessions.length === 0 ? (
        <p>No upcoming sessions.</p>
      ) : (
        <div className="border rounded-md  divide-gray-200 ">
          {upcomingSessions && upcomingSessions.map((booking: any,id : any) => (
            <div  className="flex justify-between ml-5" key={id}>

              <div>
              <p>{booking.date}</p>
              <p>{booking.slotTime}</p>
              </div>

              <div>
              
              <button
    className="px-6 py-2 mr-2 text-white bg-indigo-600 rounded-lg duration-150 hover:bg-indigo-700 active:shadow-lg"
    onClick={() => window.open(`https://app.huddle01.com/${booking.link}`, '_blank')}
>
    Join
</button>
              </div>
              
            </div>
          ))}
        </div>
      )}
      <h2 className="text-2xl font-bold mt-8 mb-4">Previous Sessions</h2>
      {previousSessions.length === 0 ? (
        <p>No previous sessions.</p>
      ) : (
        <ul className="border rounded-md divide-y divide-gray-200">
          {previousSessions && previousSessions.map((booking : any) => (
            <li key={booking.id} className="p-4 hover:bg-gray-50">
              <p className="font-bold">{booking.name}</p>
              <p>{booking.date}</p>
              <p>{booking.time}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookingList;
