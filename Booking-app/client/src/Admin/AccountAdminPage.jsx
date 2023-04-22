import axios from "axios";
import { useContext, useState } from "react"
import { Link, Navigate, useParams } from "react-router-dom"
import { UserContext } from "../UserContext"
import AdminFooter from "./AdminFooter";
import HeaderAdmin from "./AdminHeader";


export default function AccountAdminPage(){
    const[redirect, setRedirect] = useState(null);
    const {ready,user,setUser} = useContext(UserContext)
    let {subpage} = useParams();
    if (subpage === undefined) {
        subpage = 'profile' ;
    }

    async function logout() {
        await axios.post('logout');
        setRedirect('/loginChoice')
        setUser(null);
       
    }

    if(redirect) {
        return <Navigate to={redirect} />
    }
   return(
    <div>
        <HeaderAdmin />
        {subpage === 'profile' && (
                <div className="mt-5 text-center max-w-lg mx-auto">
                    Logged in as ADMIN <br />
                    <button onClick={logout} className="mt-5 primary max-w-sm mt-2">Logout</button>
                </div>  
        )}
        <div className="mt-20 ml-20">
        <AdminFooter />
        </div>
    </div>
   );    
}