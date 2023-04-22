import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BookingWidget from "../BookingWidget";
import PlaceGallery from "../PlaceGallery";
import AddressLink from "../AddressLink";
import CommentForm from "./CommentPage";

export default function PlacePage() {
    const {id} = useParams();
    const [place,setPlace] = useState('');
 
    useEffect(() => {
        if(!id) {
            return;
        }
        axios.get(`/places/${id}`).then(response => {
            setPlace(response.data);
        })
    }, [id]);

    if(!place) return '';

    
    return( 
        <div className="ml-20 mr-20 mt-4 bg-gray-100 -mx-8 px-8 py-8 rounded-2xl">
            <h1 className="text-3xl" >{place.title}</h1>
            <AddressLink>{place.address}</AddressLink>
            <PlaceGallery  place={place}/> 
           <div className="mt-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
                <div>
                   <div className="my-4">
                     <h2 className="font-semibold text-2xl">Description</h2>
                     {place.description}
                   </div>
                    Check-In: {place.checkIn} <br/>
                    Check-Out: {place.checkOut} <br/>
                    Max number of guest: {place.maxGuests} <br />
                    </div>
                <div>
                  <BookingWidget place={place} />
                </div>
            </div>
            <div className="bg-white -mx-8 px-8 py-8">
            <div>
                <h2 className="font-semibold text-2xl">ExtraInfo</h2>  
              </div>           
            <div className="mb-4 mt-1 text-sm text-gray-700 leading-4" >{place.extraInfo}</div>
            </div>

          <CommentForm />
           
           
        </div>
    );
}