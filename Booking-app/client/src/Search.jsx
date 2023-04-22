export default function SearchPage() {
    const [matchingPlaces, setMatchingPlaces] = useState([]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const inputTitle = document.getElementById('title').value;
        const matchingPlaces = places.filter(place => {
          const placeTitle = place.title.toLowerCase();
          const inputTitleLowerCase = inputTitle.toLowerCase();
          return placeTitle.includes(inputTitleLowerCase);
        });
        setMatchingPlaces(matchingPlaces);
      };
    return(
        {matchingPlaces.length > 0 && (
            <div className="mt-8 ml-20 mr-20 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3">
              {matchingPlaces.map(place => (
                <Link to={`/place/${place._id}`}>
                  <div className="w-70 h-30 bg-gray-500 rounded-2xl">
                    {place.photos?.[0] && (
                      <img className="rounded-2xl object-cover" src={`http://localhost:4000/${place.photos?.[0]}`} alt=""/>
                    )}
                  </div>
                  <h2 className="font-bold ">{place.title}</h2>
                  <h3 className="text-sm text-gray-500">{place.address}</h3>
                  <div className="mt-1">
                    <span className="font-bold">${place.price}</span> per night
                  </div>
                </Link>
              ))}
            </div>
    )})

}