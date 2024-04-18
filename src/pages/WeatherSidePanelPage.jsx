import { useState } from "react";
import WeatherSidePanel from "../components/WeatherSidePanel";

function WeatherSidePanelPage({ cities, setQuery }) {
  const handleClick = (locationName) => {
    setQuery(locationName);
  };
  const renderCities = cities.map((city) => {
    return (
      <div
        key={city.locationId}
        onClick={() => handleClick(city.locationName)}
        className="flex-shrink-0"
      >
        <WeatherSidePanel name={city.locationName} />
      </div>
    );
  });

  return (
    <div className="mb-10 overflow-x-auto flex whitespace-nowrap w-4/6 border-2 border-lime-500">
      {renderCities}
    </div>
  );
}

export default WeatherSidePanelPage;
