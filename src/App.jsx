import { useEffect } from "react";
import { useState } from "react";
import "./App.css";
import image from './assets/image.png'

const App = () => {
  const [time, setTime] = useState([]);
  const [date, setDate] = useState("2024-08-11");
  const [city, setCity] = useState("Colombo");
  const [country, setCountry] = useState("SriLanka");

  const HandleTime = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    fetch(
      `https://api.aladhan.com/v1/timingsByCity/${date}?city=${city}&country=${country}&method=8`
    )
      .then((response) => response.json())
      .then((data) => setTime(data.data.timings))
      .catch((err) => console.log(err));
  }, [time]);

  return (
    <div>
      
      <h1><img src={image} alt="" /> Prayer Time App</h1>
      <form onSubmit={HandleTime}>
        <input
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
          }}
          type="text"
          className="city"
          placeholder="Enter the city"
        />
        <input
          value={country}
          onChange={(e) => {
            setCountry(e.target.value);
          }}
          type="text"
          className="country"
          placeholder="Enter the country"
        />
        <input
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
          }}
          type="date"
          className="date"
        />
      </form>

      <div className="time-lists">
        {Object.keys(time).map((item, index) => {
          return (
            <li key={index}>
              <p className="time">
                <span>{item}</span>
                <b>{time[item]}</b>
              </p>
              <hr />
            </li>
          );
        })}
      </div>
    </div>
  );
};

export default App;
