import WeatherSidePanel from "../components/WeatherSidePanel";

function WeatherSidePanelPage({ cities }) {
  const renderCities = cities.map((city) => {
    return <WeatherSidePanel key={city.locationId} name={city.locationName} />;
  });

  return <div className="mb-10">{renderCities}</div>;
}

export default WeatherSidePanelPage;
