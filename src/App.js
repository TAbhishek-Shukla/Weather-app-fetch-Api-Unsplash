import React, { useState, useEffect } from "react";
import "./App.css";
function App() {
  const [weather, setWeather] = useState({});
  const [locations, setLocations] = useState("delhi");
  const [photos, setPhotos] = useState([]);
 
  
  useEffect(() => {
    ifClicked();
  }, []);

  function ifClicked() {
    fetch( `https://api.openweathermap.org/data/2.5/weather?q=${locations}&appid=${process.env.REACT_APP_WAPI}`)
      .then((res) => {
        if (res.ok) {
          
          return res.json();
        } else {
          if (res.status === 404) {
            return alert("Oops, there seems to be an error!(wrong location)");
          }
          console.log(` hell abhshek
          ${process.env.Wapi}`);
          alert("Oops, there seems to be an error!");
          throw new Error("You have an error");
        }
      })
      .then((data) => {
        const newdata=data.main.temp;
        setWeather(newdata);
        console.log(`data part : ${weather}`);
      })
      .catch((error) => console.log(error));
      fetch(
        `https://api.unsplash.com/search/photos?query=${locations}&client_id=${process.env.REACT_APP_UNAPI}`
      )
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error("You made a mistake");
          }
        })
        .then((data) => {
          console.log(data);
          setPhotos(data?.results[0]?.urls?.raw);
        })
        .catch((error) => console.log(error));
    }
    return (
      <div className="app">
        <div className="wrapper">
          <div className="search">
            <input
              type="text"
              value={locations}
              onChange={(e) => setLocations(e.target.value)}
              placeholder="Enter the city..."
              className="location_input"
            />
          <button className="location_searcher"   onClick={ifClicked}>
              Search 
            </button>
          </div>
          <div className="app__data">
            <p className="temp" >Temp: {((weather)-273.15).toFixed(2)}<sup> o</sup>C</p>
          </div>
          <img className="app__image" src={photos} alt="sorry!" />
        </div>
        </div>
     
    );
  }

  export default App