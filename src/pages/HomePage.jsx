import { useState, useEffect } from "react";
import SearchBox from "../components/SearchBox";
import WeatherSidePanelPage from "./WeatherSidePanelPage";
import Services from "../services/Services";

function HomePage({ isLogin }) {
  const [query, setQuery] = useState(null);
  const [cities, setCities] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      if (isLogin) {
        let logInId = localStorage.getItem("userId");
        try {
          const location = await Services.getLocation(logInId);
          const uniqueCities = location.data.reduce((acc, loc) => {
            if (!acc.find((city) => city.locationId === loc.locationId)) {
              acc.push({
                locationId: loc.locationId,
                locationName: loc.locationName,
              });
            }
            return acc;
          }, []);
          setCities(uniqueCities);
        } catch (error) {
          console.error("Error fetching location:", error);
        }
      }
    };

    fetchData();
  }, [isLogin]);

  return (
    <div>
      <div className="grid grid-cols-6 gap-4">
        {isLogin && (
          <div className="col-start-1 col-span-2 ml-10 mt-10 ">
            {cities.length > 0 && (
              <WeatherSidePanelPage cities={cities} setQuery={setQuery} />
            )}
          </div>
        )}

        {isLogin && (
          <div className="col-start-4 col-end-6 mt-10 ">
            <SearchBox
              isLogin={isLogin}
              cities={cities}
              setCities={setCities}
              query={query}
              setQuery={setQuery}
            />
          </div>
        )}
      </div>
      {!isLogin && (
        <div className="flex items-start justify-center pt-20">
          <SearchBox query={query} setQuery={setQuery} />
        </div>
      )}
    </div>
  );
}

export default HomePage;
