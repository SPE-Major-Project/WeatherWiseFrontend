import SearchBox from "../components/SearchBox";
import WeatherSidePanelPage from "./WeatherSidePanelPage";
function HomePage({ isLogin }) {
  const cities = [
    { id: 1, name: "New York" },
    { id: 2, name: "Los Angeles" },
    { id: 3, name: "Chicago" },
    { id: 4, name: "Houston" },
    // Add more cities as needed
  ];
  return (
    <div>
      <div className="grid grid-cols-6 gap-4">
        {isLogin && (
          <div className="col-start-1 col-span-2 ml-10 mt-10 ">
            <WeatherSidePanelPage cities={cities} />
          </div>
        )}

        {isLogin && (
          <div className="col-start-4 col-end-6 mt-10 ">
            <SearchBox />
          </div>
        )}
      </div>
      {!isLogin && (
        <div className="flex items-start justify-center pt-20">
          <SearchBox />
        </div>
      )}
    </div>
  );
}

export default HomePage;
