import React, { useState, useEffect } from 'react';
import './App.css';

async function getWeatherData(apiKey, city) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
  const weather = await response.json();
  return weather;
}

function App() {
  const [data, setData] = useState('');
  const [record, setRecord] = useState([]);
  const [weather, setWeather] = useState(null);

  const handleChange = (e) => {
    setData(e.target.value);
  };

  const handleAdd = async () => {
    const apiKey = 'a7839922f30eb2efbd8fe97616b27253';
    const city = data;

    try {
      const weatherData = await getWeatherData(apiKey, city);
      const iconCode = weatherData.weather[0].icon;
const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;

      setWeather(weatherData);

      const updatedRecord = [...record, { city: data, temperature: weatherData.main.temp,icon:iconUrl }];
      setRecord(updatedRecord);
      setData('');

    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleDel = (index) => {
    const updatedRecord = [...record];
    updatedRecord.splice(index, 1);
    setRecord(updatedRecord);
  };

  return (
    <>
      <h1>App Component</h1>
      <p>
        Enter city{' '}
        <input type="text" name="roll" value={data} onChange={handleChange} />
      </p>

      <input type="button" value="add" onClick={handleAdd} />
      <hr />
      {record.map((row, i) => (
        <div key={i} className="box">
          <h3>{row.city}</h3>
          <p>Temperature: {row.temperature}°C</p>
          <p><img src={row.icon} alt="Weather Icon" /></p>
          <input type="button" value="X" onClick={() => handleDel(i)} />
        </div>
      ))}
    </>
  );
}

export default App;
