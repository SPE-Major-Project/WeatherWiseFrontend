import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import WeatherReport from "./WeatherReport";
import Services from "../services/Services";

const SearchBox = ({ isLogin, cities, setCities }) => {
  const [query, setQuery] = useState(null);
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
  console.log("inputquery", query);

  return (
    <div className="flex flex-col max-w-sm min-w-fit mt-20">
      <div className="flex items-center gap-5 bg-white rounded-lg h-12 w-80">
        <BsSearch size={20} className="ml-2" />
        <input
          className="h-full w-60 text-lg outline-none "
          type="text"
          name="query"
          id="query"
          placeholder="Weather in your city?"
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="flex flex-col">
        <div className="mt-10">{<WeatherReport inComingQuery={query} />}</div>
        <br />
      </div>
      {enable && (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
          onClick={handleClick}
        >
          save
        </button>
      )}
      {!enable && (
        <button
          className="bg-blue-300 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded mr-4"
          disabled
          onClick={handleClick}
        >
          save
        </button>
      )}
    </div>
  );
};

export default SearchBox;
