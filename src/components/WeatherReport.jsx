import axios from "axios";
import React, { useEffect, useState } from "react";
import { RiMoonClearFill } from "react-icons/ri";
import { IoIosCloudyNight } from "react-icons/io";
import { BsFillCloudsFill } from "react-icons/bs";
import { RiSnowyLine, RiRainyLine, RiFoggyFill } from "react-icons/ri";

const WeatherReport = (props) => {
  const query = props.inComingQuery;
  const [weatherData, setWeatherData] = useState([]);

  const getWeatherData = async (query) => {
    query &&
      axios
        .get("/api/weather?city=" + query)
        .then((response) => {
          console.log(response, "response");
          setWeatherData(response.data);
        })
        .catch((error) => {
          console.log("error", error);
        });
  };

  const weatherImageSelector = (description) => {
    switch (description) {
      case "açık":
        return <RiMoonClearFill className="ml-2 mt-1" size={24} />;
      case "az bulutlu":
      case "parçalı az bulutlu":
      case "parçalı bulutlu":
        return <IoIosCloudyNight className="ml-2 mt-1" size={30} />;
      //kalan hava durumları için de kodlarını yazmaya devam et
      case "kapalı":
        return <BsFillCloudsFill className="ml-2 mt-1" size={24} />;
      case "hafif kar yağışlı":
        return <RiSnowyLine className="ml-2 mt-1" size={30} />;
      case "hafif yağmur":
        return <RiRainyLine className="ml-2 mt-1" size={30} />;
      case "sisli":
        return <RiFoggyFill className="ml-2 mt-1" size={30} />;
    }
  };

  useEffect(() => {
    getWeatherData(query);
  }, [query]);

  const weatherArray = Object.values(weatherData);

  return (
    <div className="flex items-center justify-center w-100 ">
      {query && (
        <div className="text-center text-gray-800">
          <div className="text-3xl font-semibold">
            {weatherArray[0]}, {weatherArray[3]}
          </div>
          <div className="flex flex-row items-center justify-center text-3xl mt-3">
            {Math.round(weatherArray[1])}°C{" "}
            {weatherImageSelector(weatherArray[2])}
          </div>
          <div className="text-2xl font-semibold mt-3">
            Rüzgar: {weatherArray[4]}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherReport;
