import { useState } from "react";
import WeatherSidePanel from "../components/WeatherSidePanel";

function WeatherSidePanelPage({ cities, setQuery }) {
  const handleClick = (locationName) => {
    setQuery(locationName);
  };
  const renderCities = cities.map((city) => {
    return (
      <div onClick={() => handleClick(city.locationName)}>
        <WeatherSidePanel key={city.locationId} name={city.locationName} />
      </div>
    );
  });

  return <div className="mb-10">{renderCities}</div>;
}

export default WeatherSidePanelPage;
