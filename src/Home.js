import React from "react";
import axios from "axios";
import { useState } from "react";

function Home() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.weatherapi.com/v1/current.json?key=103f0fde0e554cbb9bc181443230702&q=${location}&aqi=no
  `;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };
  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          placeholder="Enter Location"
          onKeyDown={searchLocation}
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            {data.name != undefined && (
              <p>
                {data.name}, {data.sys ? data.sys.country : null}
              </p>
            )}
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>

          <div className="date">
            {data.location ? <p>{data.location.localtime} </p> : null}
          </div>

          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name != undefined && (
          <div className="bottom">
            {/* <div className="sunrise">
              <p className="bold">{sunrise}</p>
              <p>Sunrise</p>
            </div>
            <div className="sunset">
              <p className="bold">{sunset}</p>
              <p>Sunset</p>
            </div> */}
            <div className="pressure">
              {data.main ? (
                <p className="bold">{data.main.pressure} hPa</p>
              ) : null}
              <p>Humidity</p>
            </div>
          </div>
        )}
        {data.name != undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()}°C</p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? (
                <p className="bold">{data.wind.speed.toFixed()} MPH</p>
              ) : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
