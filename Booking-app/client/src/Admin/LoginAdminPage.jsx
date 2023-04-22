import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import LoginNav from "../LoginNav";


export default function LoginAdminPage () {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [Aredirect, setARedirect] = useState(false);
    const [redirect,setRedirect] = useState(false);
    const {setUser} = useContext (UserContext);
    async function handleLoginSubmit(ev) {
        ev.preventDefault();
        try{
        const {data}  = await axios.post('/login', {email,password});
            if((data.email === 'admin@gmail.com')){
              alert('ADMIN:Login successful');
              setARedirect(true);
            }else{
              alert('Login Failed');
            }
        }catch(e){
            alert('login Failed');
        }
    }

    if(Aredirect) {    
            return <Navigate to={'/adminPage'} />
         }

    return(
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
            <h1 className="text-4xl text-center mb-4">Login</h1>
            <LoginNav />
            <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit} >                                                                              
                <input type="email" placeholder="Your@email.com" required
                value={email}
                onChange={ev => setEmail(ev.target.value)} />
                <input type="password" placeholder="password"  required
                value={password}
                onChange={ev => setPassword(ev.target.value)} />
                <button className="primary">Login</button>
            </form>
            </div>            
        </div>
    )
}