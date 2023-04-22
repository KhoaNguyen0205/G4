import { useEffect, useState } from "react";
import AdminPage from "./AdminPage";
import axios from "axios";


export default function AllBookingPage() {
    const [bookings, setBookings] = useState([]);
    const [places, setPlaces] = useState([]);
    const [counts, setCounts] = useState(Array(12).fill(0));
    const [countsByQuater, setCountsByQuater] = useState(Array(4).fill(0));
   

    useEffect(() => {
      axios.get('/bookings1').then(response => {
        setBookings(response.data);
        // Tính toán giá trị mới cho mảng counts
        const newCounts = response.data.reduce((acc, booking) => {
          const checkInDate = new Date(booking.checkIn);
          const checkInMonth = checkInDate.getMonth();
          acc[checkInMonth]++;
          return acc;
        }, new Array(12).fill(0));
        // Cập nhật state cho mảng counts
        setCounts(newCounts);
      });
    }, []);

    useEffect(() => {
      axios.get('/bookings1').then(response => {
        setBookings(response.data);
        // Tính toán giá trị mới cho mảng counts
        const newCounts = response.data.reduce((acc, booking) => {
          const checkInDate = new Date(booking.checkIn);
          const checkInQuarter = Math.floor(checkInDate.getMonth() / 3); // tính toán quý
          acc[checkInQuarter]++;
          return acc;
        }, new Array(4).fill(0));
        // Cập nhật state cho mảng counts
        setCountsByQuater(newCounts);
      });
    }, []);

      useEffect(() => {
        axios.get('/places').then(response => {
          setPlaces(response.data);
        });
      }, []);


      const findPlaceName = (bookingPlaceId) => {
        const place = places.find(place => place._id === bookingPlaceId);
        return place ? place.title : 'Unknown place';
      };

      const findPlacePhotos = (bookingPlaceId) => {
        const place = places.find(place => place._id === bookingPlaceId);
        return place ? place.photos[0] : 'Unknown place';
      };

    return(
    <div>
            <AdminPage />
            <div className="mt-8 ml-20 mr-20 grid gap-x-6 gap-y-8 ">
            <div className="text-center bg-" style={{ fontSize: "30px" }}> <p><b>Order Statistics</b></p></div>
            <div className="bg-orange-200 -mx-8 px-8 py-4 rounded-2xl">
              <h2 className="text-center" style={{fontSize : "25px"}}>By Month</h2>
                <div className="grid gap-2 grid-cols-12">
                  {counts.map((count, index) => (
                    <div key={index}>
                      Month<div className="text-sm font-medium text-gray-900"><b>{index + 1}</b></div>  
                      Quantity<div className="text-lg font-bold text-gray-900">{count }</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-orange-200 -mx-8 px-8 py-4 rounded-2xl">
              <h2 className="text-center" style={{fontSize : "25px"}}>By Quater</h2>
                <div className="grid gap-2 grid-cols-4">
                  {countsByQuater.map((countsByQuater, index) => (
                    <div key={index}>
                      Quater<div className="text-sm font-medium text-gray-900"><b>{index + 1}</b></div>
                      Quantity<div className="text-lg font-bold text-gray-900">{countsByQuater }</div>
                    </div>
                  ))}
                </div>
              </div>

            {bookings.length > 0 && bookings.map(booking => (
            <div className="ml-20 mr-20 mt-4 mb-10 bg-gray-100 -mx-8 px-8 py-4 rounded-2xl">
            <div className="grid gap-2 grid-cols-[3fr_1fr]"> 
               <div className="w-90 grid grid-gap-2 ">
                    <h2 style={{ fontSize: "20px" }}><b>Place: {findPlaceName(booking.place)}</b></h2>  
                    <h2>Name: {booking.name}</h2>
                    <h2>Phone: {booking.phone}</h2>
                    <h2>CheckIn: {booking.checkIn}</h2>
                    <h2>CheckOut: {booking.checkOut}</h2>
                    <h2>Price:{booking.price}</h2>
                </div>
                <div>
                    <img className="rounded-2xl" src={'http://localhost:4000/'+findPlacePhotos(booking.place)} alt="" />
                </div>
            </div>
            </div>
            ))}

           </div>
    </div>
    );
}