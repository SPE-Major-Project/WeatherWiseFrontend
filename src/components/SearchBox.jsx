import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import WeatherReport from "./WeatherReport";

const SearchBox = () => {
  const [query, setQuery] = useState(null);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setQuery(event.target.value);
      event.target.value = "";
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
    </div>
  );
};

export default SearchBox;
