import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import HeaderAdmin from "./AdminHeader";
import AdminPage from "./AdminPage";
import axios from "axios";
import { Link } from "react-router-dom";


export default function AllUserPage(){
    const [user,setUser] = useState([]);
    
    useEffect(() => {
        axios.get('/user').then(response => {
          setUser(response.data);
        });
    }, []);
      
    const deleteUser = (id) => {
        axios.delete(`http://localhost:4000/delete/${id}`)
          .then(response => {
            console.log(response.data);
            alert('Delete User Successful');
            window.location.reload();
          })
          .catch(error => {
            console.log(error);
          });
      }
    return(
    <div>
            <AdminPage />
        <Link to={'/adminPage/alluser/newuser'} className="ml-20 mt-4 bg-gray-500 text-white -mx-8 px-8 py-4 rounded-full">
        NEW USER
        </Link>
        <div className="text-center bg-" style={{ fontSize: "30px" }}> <p><b>ALL USER</b></p></div>   
           {user.length > 0 && user.map(user =>(
            <div className="ml-20 mr-20 mt-4 bg-gray-100 -mx-8 px-8 py-4 rounded-full">
            <div className="grid gap-2 grid-cols-[3fr_1fr]"> 
            {user.name !== 'ADMIN' &&
            <div className="w-100">
              <h2>Name: {user.name}</h2>
              <h2>EMail: {user.email}</h2>
            </div>
            }
            <div className="gap-3 mr-20 grid-rows-[1fr_1fr_1fr]">
            {user.name !== 'ADMIN' &&
            <div key={user._id}>
                <button className="mt-5 bg-primary px-8 rounded-full" onClick={() => deleteUser(user._id)}>Delete</button>
            </div>
            }
        </div>
            </div>
            </div>  
           ))}     
    </div>
    );
}