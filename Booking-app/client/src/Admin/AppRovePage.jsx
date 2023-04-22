import { useEffect, useState } from "react";
import AdminPage from "./AdminPage";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AppRovePage() {
  
    const [places, setPlaces] = useState([]);
    useEffect(() => {
        axios.get('/places').then(response => {
          setPlaces(response.data);
        });
      }, []);

      const [user,setUser] = useState([]);
    useEffect(() => {
        axios.get('/user').then(response => {
          setUser(response.data);
        });
    }, []); 

      

      const findPlaceOwner = (place, users) => {
        const user = users.find(user => user._id === place.owner);
        return user ? user.name : 'Unknown user';
      };
  
      const approvePlace = (id) => {
        axios.put(`/places/${id}`, { approval: true })
          .then(response => {
            console.log(response.data);
            alert('Approve Place SuccessFully');
            window.location.reload();
          })
          .catch(error => {
            console.error(error);
            alert('Something wrong on');
          });
      }
      

    return(
        <div>
            <AdminPage />
            <div className="mt-8 ml-20 mr-20 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 ">
              {places.filter(place => !place.approval).map(place =>(
                <div>  
                    <div className="w-70 h-30 bg-orange-100 rounded-2xl">
                      {place.photos?.[0] && (
                      <img className="rounded-2xl object-cover" src={'http://localhost:4000/'+place.photos?.[0]} alt=""/>
                        )}
                      <h2 className="font-bold ">{place.title}</h2>
                      <h2>  <b>Owner: {findPlaceOwner(place,user)}</b></h2>
                    </div>        
                    <div>
                      <Link to={'/details/'+place._id}>
                      <button className="ml-20 inline-flex gap-1 py-2 px-6 rounded-full" >
                        Details
                      </button>
                     </Link>
                 <button className="bg-green-300 ml-5 gap-1 py-2 px-5 rounded-full"
                         onClick={() => approvePlace(place._id)}>
                         Approve
                 </button>
                    </div> 
                </div>
               ))}
           </div>
        </div>
    );
}