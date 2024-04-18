import React, { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import "../style/ApiSearchBox.css";
import $ from "jquery";
import * as icons from "./icons/icons.js";
import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext,
} from "@geoapify/react-geocoder-autocomplete";
import "@geoapify/geocoder-autocomplete/styles/minimal.css";
import { Line, CategoryScale } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import Services from "../services/Services";
const autocompleteKey = "6b7cf71cbd454f528f37b9cafd120de7";
const openWeatherKey = "ad46bca0cb15937504da590a8559bbae";

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const chartSettings = {
  plugins: {
    legend: false,
  },
  scales: {
    y: {
      ticks: {
        stepSize: 1,
      },
    },
    x: {
      ticks: {
        maxTicksLimit: 8,
      },
    },
  },
};
function ApiSearchBox({ setEnable, query, setQuery }) {
  const [location, setLocation] = useState("");
  const [showReport, setShowReport] = useState(false);

  const [long, setLong] = useState("");
  const [lat, setLat] = useState("");
  const [wData, setwData] = useState({});
  const [dData, setdData] = useState([]);
  const [cData, setcData] = useState({
    labels: ["empty"],
    datasets: [
      {
        label: "temp",
        data: [0],
      },
    ],
  });

  useEffect(() => {}, []);

  useEffect(() => {
    if (lat && long) {
      handleSubmit();
    }
  }, [long, lat]);

  useEffect(() => {
    if (!$.isEmptyObject(wData)) {
      let mySVG = weatherCheck(wData.id, wData.dt, true, wData.zoneShift);

      $("#dashboard").css("display", "grid");
      $("#default").css("display", "none");
      $("#App #dashboard #today #main img").prop("src", mySVG);

      let times = [];
      wData.hourly.map((e, i) => {
        times[i] = getTime(e.dt);
      });

      let temps = [];
      wData.hourly.map((e, i) => {
        temps[i] = Math.round(e.temp);
      });

      setcData({
        labels: [...times],
        datasets: [
          {
            label: "temp",
            data: [...temps],
          },
        ],
      });

      setdData([...wData.daily]);
    }
  }, [wData]);

  const onPlaceSelect = (value) => {
    if (value) {
      setLong(value.properties.lon);
      setLat(value.properties.lat);
      setLocation(value.properties.formatted);
      setQuery(value.properties.address_line1);
      setEnable(true);
    } else {
      setEnable(false);
    }
  };

  const handleSubmit = () => {
    Services.getWeatherinfo(lat, long, location)
      .then((data) => {
        setwData({
          main: data.current.weather[0].main,
          desc: data.current.weather[0].description,
          id: data.current.weather[0].id,
          dt: data.current.dt,
          clouds: data.current.clouds,
          feelsLike: Math.round(data.current.feels_like),
          humidity: data.current.humidity,
          pressure: data.current.pressure,
          sunrise: data.current.sunrise,
          sunset: data.current.sunset,
          temp: Math.round(data.current.temp),
          uvi: data.current.uvi,
          windspeed: data.current.wind_speed,
          zoneShift: data.timezone_offset,
          daily: data.daily,
          hourly: data.hourly.slice(0, 24),
        });
        setShowReport(true);
      })
      .catch((err) => {});
  };

  const getTime = (dt) => {
    let time = dt * 1000,
      date = new Date(time);

    if (date.getHours() > 12) {
      return date.getMinutes() < 10
        ? `${date.getHours() - 12}:0${date.getMinutes()} pm`
        : `${date.getHours() - 12}:${date.getMinutes()} pm`;
    } else {
      return date.getMinutes() < 10
        ? `${date.getHours()}:0${date.getMinutes()} am`
        : `${date.getHours()}:${date.getMinutes()} am`;
    }
  };

  const getDay = (dt) => {
    let time = dt * 1000,
      date = new Date(time);

    return weekdays.slice(date.getDay(), date.getDay() + 1);
  };

  const isDay = (dt) => {
    let time = dt * 1000,
      date = new Date(time);

    if (date.getHours() >= 7 && date.getHours() <= 19) {
      return true;
    }
    return false;
  };

  const weatherCheck = (daily, dt, ts) => {
    if (/^2/.test(daily.toString())) {
      return daily === 201
        ? icons.rainThunderstorm
        : icons.thunderstormsDefault;
    } else if (/^3/.test(daily.toString())) {
      return icons.drizzle;
    } else if (/^5/.test(daily.toString())) {
      return daily === 502 ? icons.heavyRain : icons.rainDefault;
    } else if (/^6/.test(daily.toString())) {
      return icons.snowDefault;
    } else if (/^7/.test(daily.toString())) {
      if (ts) return isDay(dt) ? icons.fogDay : icons.fogNight;
      return icons.fogDay;
    } else if (/^8/.test(daily.toString())) {
      switch (daily) {
        case 800:
          if (ts) return isDay(dt) ? icons.clearDay : icons.clearNight;
          return icons.clearDay;
        case 801:
        case 802:
          if (ts) return isDay(dt) ? icons.cloudyDay : icons.cloudyNight;
          return icons.cloudyDay;
        case 803:
          if (ts) return isDay(dt) ? icons.overcastDay : icons.overcastNight;
          return icons.overcastDay;
        case 804:
          return icons.cloudyDefault;
      }
    }
  };
  return (
    <div id="App">
      <header id="search-bar">
        <GeoapifyContext id="input-container" apiKey={autocompleteKey}>
          <GeoapifyGeocoderAutocomplete
            placeholder="Enter address here"
            value={query}
            placeSelect={onPlaceSelect}
          />
        </GeoapifyContext>
      </header>
      <div id="dashboard">
        <div id="today" class="main">
          <div id="main">
            <img src="..." alt="" />
            <h1 id="temp">
              {wData.temp}
              <p class="degree">&#8451;</p>
            </h1>
          </div>
          <div id="details">
            <h1 id="desc">{wData.main}</h1>
            <h2 id="location">{location}</h2>
          </div>
          <div id="stats">
            <h3 id="feelsLike">Feels like {wData.feelsLike}</h3>
            <h3 id="asOf">As of {getTime(wData.dt)}</h3>
            <div id="etc">
              <div id="uvi" className="etc" title="Cloud Coverage">
                {" "}
                {/* should eventually convert css to reflect actual value*/}
                <img src={icons.clouds} alt="..." />
                <p>{wData.clouds} %</p>
              </div>
              <div id="hum" className="etc" title="Humidity">
                <img src={icons.humidity} alt="..." />
                <p>{wData.humidity} %</p>
              </div>
              <div id="sunr" className="etc" title="Sunrise">
                <img src={icons.sunrise} alt="..." />
                <p>{getTime(wData.sunrise)}</p>
              </div>
              <div id="suns" className="etc" title="Sunset">
                <img src={icons.sunset} alt="..." />
                <p>{getTime(wData.sunset)}</p>
              </div>
            </div>
          </div>
        </div>
        <div id="hourly">
          <Line id="chart" data={cData} options={chartSettings} />
        </div>
        <div id="weekly">
          <h2>8-Day Forecast</h2>
          <div id="card-container">
            {dData.map((e, i) => {
              return (
                <div class="dayCard">
                  <p id="day">{i == 0 ? "Today" : getDay(e.dt)}</p>
                  <img src={weatherCheck(e.weather[0].id, e.dt, false)} />
                  {/* Will implement getIcon or whatever its called soon */}
                  <p id="temp">
                    L: {Math.round(e.temp.min)}&nbsp;H: {Math.round(e.temp.max)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApiSearchBox;
