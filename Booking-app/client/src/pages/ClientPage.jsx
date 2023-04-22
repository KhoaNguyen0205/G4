import { useEffect, useState } from "react";
import AccountNav from "../AccountNav";
import axios from "axios";


export default function ClientPage() {
  const [bookings, setBookings] = useState([]);
  const [places, setPlaces] = useState([]);
 

  
  useEffect(() => {
    axios.get('/bookings1').then(response => {
      setBookings(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get('/user-places').then(({data}) => {
      setPlaces(data);
    });
  }, []);


  const findPlaceName = (bookingPlaceId) => {
    const place = places.find(place => place._id === bookingPlaceId);
    if (!place) return ''; 
    return place.title;
  };
  
  const findPlacePhotos = (bookingPlaceId) => {
    const place = places.find(place => place._id === bookingPlaceId);
    if (!place) return ''; 
    return place.photos[0];
  };

  function printBookingsForPlaces(places, bookings) {
    const relevantBookings = bookings.filter(booking => places.some(place => place._id === booking.place));
  
    return relevantBookings.map((booking, index) => (
      <div key={index}>
        <h2><b>Name:</b> {booking.name}</h2>
        <h2><b>Phone:</b> {booking.phone}</h2>
        <h2><b>Check In:</b> {booking.checkIn}</h2>
        <h2><b>Check Out:</b> {booking.checkOut}</h2>
        <h2><b>Price:</b> {booking.price}</h2>
      </div>
    ));
  }

  
    return(
        <div>
        <AccountNav />
        <div className="mt-8 ml-20 mr-20 grid gap-x-6 gap-y-8 ">
        {bookings.length > 0 && bookings.map(booking => {
             const bookingInfos = printBookingsForPlaces(places, [booking]);
               if (bookingInfos.length > 0) {
              return (
                  <div className="ml-20 mr-20 mt-4 mb-10 bg-gray-100 -mx-8 px-8 py-4 rounded-2xl">
                     <div className="grid gap-2 grid-cols-[3fr_1fr]">
                          <div className="w-90 grid grid-gap-2 ">
                               {findPlaceName(booking.place) && (
                                 <h2 style={{ fontSize: "20px" }}><b>Place: {findPlaceName(booking.place)}</b></h2>
                               )}
                               {bookingInfos.map((bookingInfo, index) => (
                                 <div key={index}>
                                   {bookingInfo} 
                                 </div>
                               ))}   
                          </div>
                           <div>
                             {findPlacePhotos(booking.place) && (
                               <img className="rounded-2xl" src={'http://localhost:4000/'+findPlacePhotos(booking.place)} alt="" />
                             )}
                           </div>
                     </div>
                  </div>
               );
            }
        })}
      </div>
    </div>
    );
}