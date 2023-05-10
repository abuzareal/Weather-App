import axios from "axios";
import { useState } from "react";
import { DateTime } from "luxon";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=146f21d5dd7e67d75fc1ffbbcbe370ba`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };

  let rise = data.sys ? data.sys.sunrise : null;
  let risedate = new Date(rise * 1000);
  let sunrise = `${risedate.getHours()}:${risedate.getMinutes()}`;

  let set = data.sys ? data.sys.sunset : null;
  let setdate = new Date(set * 1000);
  let sunset = `${setdate.getHours()}:${setdate.getMinutes()}`;

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

          {data.name != undefined && (
            <div className="date">
              {/* <p>
                {DateTime.fromSeconds(data.dt)
                  .setZone(data.timezone)
                  .toFormat("'Local time: 'hh:mm a")}
                {DateTime.fromSeconds(data.dt).toLocaleString(DateTime.DATETIME_FULL)}
              </p> */}
            </div>
          )}

          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name != undefined && (
          <div className="bottom">
            <div className="sunrise">
              <p className="bold">{sunrise}</p>
              <p>Sunrise</p>
            </div>
            <div className="sunset">
              <p className="bold">{sunset}</p>
              <p>Sunset</p>
            </div>
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

export default App;
