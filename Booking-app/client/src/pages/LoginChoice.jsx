import LoginNav from "../LoginNav";

export default function LoginChoice() {
    return(
    <div className="mt-4 grow flex items-center justify-around">
             <div className="mb-64">
             <h1 className="text-4xl text-center mb-4">Login</h1>
             <div className=" text-center bg-gray-500 text-white gap-1 px-6 rounded-full">Want to login as?</div>
             <LoginNav />
             
             </div>  
                     
    </div>
);
}