import WeatherSidePanel from "../components/WeatherSidePanel";

function WeatherSidePanelPage({ cities }) {
  const renderCities = cities.map((city) => {
    return <WeatherSidePanel key={city.id} name={city.name} />;
  });

  return <div className="">{renderCities}</div>;
}

export default WeatherSidePanelPage;
