import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function LoginNav() {

    const {pathname} = useLocation();
    let subpage = pathname.split('/')?.[2];
    if(subpage === undefined) {
        subpage = '/';
    }
    function linkClasses (type=null) {
        let classes = 'inline-flex gap-1 py-2 px-6 rounded-full'
        if(type === subpage ) {
            classes += ' bg-primary text-white ';
        }else {
            classes += ' bg-gray-300';
        }
        return classes;
    }
         
    return(
        <nav className="w-full flex justify-center mt-8 gap-2 mb-8">
                <Link id="user" className={linkClasses('login')}
                 to={'/loginChoice/login'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
                  User
                </Link>
                <Link id="admin" className={linkClasses('admin')}            
                to={'/loginChoice/admin'}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                </svg>
                    Admin
                </Link>                
            </nav>
    );

}
