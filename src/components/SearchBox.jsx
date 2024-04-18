import React, { useEffect, useState } from "react";

import Services from "../services/Services";
import ApiSearchBox from "./ApiSearchBox";

const SearchBox = ({ isLogin, cities, setCities, query, setQuery }) => {
  const [enable, setEnable] = useState(false);
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setQuery(event.target.value);
      event.target.value = "";
      setEnable(true);
    }
  };

  const handleClick = () => {
    if (isLogin && query.trim().length > 0) {
      const isQueryExists = cities.some(
        (city) => city.locationName.toLowerCase() === query.trim().toLowerCase()
      );
      if (!isQueryExists) {
        setCities((prevCities) => [
          ...prevCities,
          { locationId: prevCities.length + 1, locationName: query.trim() },
        ]);
        Services.addNewLocation(localStorage.getItem("userId"), query);
      }
      setEnable(false);
      setQuery("");
    }
  };

  return (
    <div className="flex flex-col ">
      <div className="flex items-center gap-5 ">
          <ApiSearchBox setEnable={setEnable} setQuery={setQuery} />
          
      
      </div>

      {isLogin && enable && (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
          onClick={handleClick}
        >
          save
        </button>
      )}
      {/* {isLogin && !enable && (
        <button
          className="bg-blue-300 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded mr-4"
          disabled
          onClick={handleClick}
        >
          save
        </button>
      )} */}
    </div>
  );
};

export default SearchBox;
