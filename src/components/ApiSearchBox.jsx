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
    legend: false, // Hide legend
  },
  scales: {
    y: {
      ticks: {
        stepSize: 1,
        // maxTicksLimit: 6
        // autoSkip: false
      },
    },
    x: {
      ticks: {
        maxTicksLimit: 8,
      },
    },
  },
};
function ApiSearchBox({ setEnable, setQuery }) {
  const [location, setLocation] = useState("");
  const [showReport, setShowReport] = useState(false);

  const [long, setLong] = useState("");
  const [lat, setLat] = useState("");
  const [wData, setwData] = useState({}); // General Weather Data
  const [dData, setdData] = useState([]); // Daily Data
  const [cData, setcData] = useState({
    // empty for chart, so it doesnt get mad
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
      console.log("location selected");

      handleSubmit();
    }
  }, [long, lat]);

  useEffect(() => {
    // Weather Data updates
    if (!$.isEmptyObject(wData)) {
      // Determining proper SVG
      let mySVG = weatherCheck(wData.id, wData.dt, true, wData.zoneShift);

      $("#dashboard").css("display", "grid");
      $("#default").css("display", "none"); // hide default
      $("#App #dashboard #today #main img").prop("src", mySVG); // change src to returned svg

      // format wData hourly for chart
      // Labels
      // - contains the next 24 hours from og dt
      // - hours from each dt of e in wData.hourly
      // - should just be 3pm, 4pm, 5pm, 6pm etc
      let times = [];
      wData.hourly.map((e, i) => {
        times[i] = getTime(e.dt);
      });

      // Data
      // - temp for each e in wData.hourly
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
      // console.log(wData)
    }
  }, [wData]);

  const onPlaceSelect = (value) => {
    // console.log(value);
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
        // console.log("wData", wData);
      })
      .catch((err) => {
        // console.error("Call Failed", err);
      });
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

  /*  getDay
      params
        {dt}: unix time thingy
      returns
        {day}: day of the week
  */
  const getDay = (dt) => {
    let time = dt * 1000,
      date = new Date(time);

    return weekdays.slice(date.getDay(), date.getDay() + 1); // returns day of the week corresponding to dt
  };

  /*  isDay
      params
        {dt}: unix time thingy
      returns
        {bool}: day = true, night = false
  */
  const isDay = (dt) => {
    let time = dt * 1000,
      date = new Date(time); // getting date object

    if (date.getHours() >= 7 && date.getHours() <= 19) {
      // if between 7am and 7pm
      return true; // true == day
    }
    return false; // false == night
  };

  /*  weatherCheck(number)
      param 
        {daily}: weather code
        {dt}: unix time code thingy, passses onto isDay
        {ts}: 'time sensitive' to determine if I need day/night icons as opposed to default (day)
      returns  
        {svg}: icons.xxxxx
      
      determines svg to return based on inputted number
  */
  const weatherCheck = (daily, dt, ts) => {
    // use regex to determine what number daily starts with
    if (/^2/.test(daily.toString())) {
      // Thunderstorms
      return daily === 201
        ? icons.rainThunderstorm
        : icons.thunderstormsDefault;
    } else if (/^3/.test(daily.toString())) {
      // Drizzle
      return icons.drizzle;
    } else if (/^5/.test(daily.toString())) {
      // Rain
      return daily === 502 ? icons.heavyRain : icons.rainDefault;
    } else if (/^6/.test(daily.toString())) {
      // Snow
      return icons.snowDefault;
    } else if (/^7/.test(daily.toString())) {
      // Fog
      if (ts) return isDay(dt) ? icons.fogDay : icons.fogNight;
      return icons.fogDay;
      // return ts == true ? isDay(dt) ? icons.clearDay : icons.clearNight : icons.clearDay;
    } else if (/^8/.test(daily.toString())) {
      // Clear & Cloudy
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
      // if (daily === 800){                         // Clear
      //   if(ts == true)return isDay(dt) ? icons.clearDay : icons.clearNight;
      //   return icons.clearDay;
      // } else if (daily === 804){                         // Cloudy
      //   return icons.cloudyDefault
      // }else{
      //   if(ts == true)return isDay(dt) ? icons.cloudyDay : icons.cloudyNight;
      //   return icons.cloudyDay;
      // }
    }
  };
  return (
    // <div id="api" className="text-center flex flex-col h-screen">
    //   <header id="search-bar" className="flex items-center justify-center">
    //     <div className="geocoder-container w-1/2">
    //       <GeoapifyContext id="input-container" apiKey={autocompleteKey}>
    //         <GeoapifyGeocoderAutocomplete
    //           placeholder="Enter address here"
    //           // type={type}
    //           // lang={language}
    //           // position={position}
    //           // countryCodes={countryCodes}
    //           // limit={limit}
    //           // value={displayValue}
    //           placeSelect={onPlaceSelect}
    //           // suggestionsChange={onSuggectionChange}
    //         />
    //       </GeoapifyContext>
    //       <BsSearch size={25} className="" />
    //     </div>
    //   </header>
    //   {showReport && (
    //     <div id="dashboard" className="container mx-auto">
    //       <div
    //         id="today"
    //         className="main grid grid-cols-2 grid-rows-2 w-full border border-gray-300 rounded-md"
    //       >
    //         <div id="main" className="flex justify-center items-center">
    //           <img src="..." alt="" className="w-1/2" />
    //           <h1 id="temp" className="flex items-center text-5xl">
    //             {wData.temp}
    //             <span className="degree">&#8451;</span>
    //           </h1>
    //         </div>
    //         <div id="details" className="flex flex-col justify-center">
    //           <h1 id="desc" className="font-bold">
    //             {wData.main}
    //           </h1>
    //           <h2 id="location">{location}</h2>
    //         </div>
    //         <div id="stats" className="grid grid-cols-2 grid-rows-2 w-full">
    //           <h3 id="feelsLike" className="col-span-2 font-semibold text-2xl">
    //             Feels like {wData.feelsLike}
    //           </h3>
    //           <h3 id="asOf" className="col-span-2">
    //             As of {getTime(wData.dt)}
    //           </h3>
    //           <div id="etc" className="grid grid-cols-2 grid-rows-2 w-full">
    //             <div
    //               id="uvi"
    //               className="etc flex items-center"
    //               title="Cloud Coverage"
    //             >
    //               <img src={icons.clouds} alt="..." />
    //               <p>{wData.clouds} %</p>
    //             </div>
    //             <div
    //               id="hum"
    //               className="etc flex items-center"
    //               title="Humidity"
    //             >
    //               <img src={icons.humidity} alt="..." />
    //               <p>{wData.humidity} %</p>
    //             </div>
    //             <div
    //               id="sunr"
    //               className="etc flex items-center"
    //               title="Sunrise"
    //             >
    //               <img src={icons.sunrise} alt="..." />
    //               <p>{getTime(wData.sunrise)}</p>
    //             </div>
    //             <div id="suns" className="etc flex items-center" title="Sunset">
    //               <img src={icons.sunset} alt="..." />
    //               <p>{getTime(wData.sunset)}</p>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //       <div id="hourly" className="border border-gray-300 rounded-md w-full">
    //         <Line id="chart" data={cData} options={chartSettings} />
    //       </div>
    //       <div id="weekly" className="w-full">
    //         <h2 className="text-xl">8-Day Forecast</h2>
    //         <div id="card-container" className="flex flex-col">
    //           {dData.map((e, i) => (
    //             <div
    //               className="dayCard flex justify-between items-center border-b border-gray-300"
    //               key={i}
    //             >
    //               <p id="day" className="font-bold">
    //                 {i == 0 ? "Today" : getDay(e.dt)}
    //               </p>
    //               <img src={weatherCheck(e.weather[0].id, e.dt, false)} />
    //               <p id="temp" className="font-semibold">
    //                 L: {Math.round(e.temp.min)}&nbsp;H: {Math.round(e.temp.max)}
    //               </p>
    //             </div>
    //           ))}
    //         </div>
    //       </div>
    //     </div>
    //   )}
    // </div>
    <div id="App">
      <header id="search-bar">
        <GeoapifyContext id="input-container" apiKey={autocompleteKey}>
          <GeoapifyGeocoderAutocomplete
            placeholder="Enter address here"
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
