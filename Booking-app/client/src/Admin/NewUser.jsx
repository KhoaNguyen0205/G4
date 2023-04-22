import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import AdminPage from "./AdminPage";


export default function NewUser() {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    async function registerUser(ev) {
        ev.preventDefault();
        try{
            await axios.post('/register', {
                name,
                email,
                password, 
            });
            alert('Add user successful.');
            window.location.reload();
        } catch (e) {
            alert('Add user failed. Please try again later');
        }
    }
    return(
        <div>
            <AdminPage />
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
            <div className="text-center bg-" style={{ fontSize: "30px" }}> <p><b>NEW USER</b></p></div> 
            <form className="max-w-md mx-auto" onSubmit={registerUser}>  
                <input type="text" placeholder="User name" required
                     value={name}
                     onChange={ev => setName(ev.target.value)} />                                                                            
                <input type="email" placeholder="user@email.com" required
                     value={email} 
                     onChange={ev => setEmail(ev.target.value)}/>
                <input type="password" placeholder="password" required
                     value={password}
                     onChange={ev => setPassword(ev.target.value)} />
                        <button className="primary">ADD</button>

            </form>
            </div>
        </div>
        </div>
    )
}