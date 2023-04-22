
import { useState } from "react";

export default function PlaceGallery({place}){
    const [showAllPhotos, setShowAllPhotos] = useState(false); 
    if(showAllPhotos){
        return(
            <div className="absolute inset-0 bg-white min-h-screen">
                <div className="p-8 grid gap-4">
                    <div>
                        <h2 className="text-3xl mb-5">Photos of {place.title}</h2>
                    <button onClick={() => setShowAllPhotos(false)}  className="flex gap-1 py-2 px-8 rounded-2xl shadow shadow-black" >Close</button>
                    </div>
                {place.photos?.length > 0 && place.photos.map(photo => (
                    <div>
                        <img className="rounded-2xl object-cover ml-20" src={"http://localhost:4000/"+photo} />
                    </div>
                ))}
                </div>
            </div> 
        )
    }

    return(
        <div className="relative">
            <div className="grid gap-2 grid-cols-[3fr_1fr]"> 
           <div className="w-100">
                {place.photos?.[0] &&(
                    <div className="ml-20">
                        <img className="aspect-square rounded-2xl" src={"http://localhost:4000/"+place.photos[0]} />
                    </div>
                    )}
            </div>
            <div className="gap-3 mr-20 grid-rows-[1fr_1fr_1fr]">
                {place.photos?.[1] && (
                 <img className="mb-3 rounded-2xl" src={"http://localhost:4000/"+place.photos[1]} />
                  )}
                     {place.photos?.[2] && (
                        <img className="mb-3 rounded-2xl" src={"http://localhost:4000/"+place.photos[2]} />
                    )}
                      {place.photos?.[3] && (
                        <img className="mb-3 mt-6 rounded-2xl"  src={"http://localhost:4000/"+place.photos[3]} />
                    )}
                </div>
           </div>
           <button onClick={() => setShowAllPhotos(true)} className="flex gap-1 bottom-0 ml-20 py-2 px-8 rounded-2xl">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                 <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
              </svg>
              <p><b>More photo</b></p>
             </button>
        </div>
    );
}