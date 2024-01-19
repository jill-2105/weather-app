import './App.css';
import { useEffect,useState } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';

function App() {

  const [icon,setIcon] = useState('-')
  const [temp,setTemp] = useState('-')
  const [description,setDescription] = useState('-')
  const [city,setCity] = useState('Anand')
  const [country,setCountry] = useState('-')
  const [wind,setWind] = useState('-')
  const [humidity,setHumidity] = useState('-')

  const fetchdata = async ()=> {
    const options = {
      method: 'GET',
      url: `https://open-weather13.p.rapidapi.com/city/${city}`,
      headers: {
        'X-RapidAPI-Key': '0068e12041msh4e361c22992e418p122618jsn990fd2e78347',
        'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com'
      }
    };
    
    try {
      const response = await axios.request(options);
      console.log(response.data);

      setIcon(response.data.weather[0].icon);
      setTemp(response.data.main.temp);
      setDescription(response.data.weather[0].description);
      setCity(response.data.name);
      setCountry(response.data.sys.country);
      setWind(response.data.wind.speed);
      setHumidity(response.data.main.humidity);

    } 
    catch (error) {
      console.error(error);
    }
  }
  
  useEffect(()=>{
    fetchdata()}
  ,[] )

  return (
    <>
    <div className="container">
      <Card>
      <div className="input">

        <div className="searchbox">
          <input type="text" className='field p-2' placeholder='Enter City Name' onChange={(e) => setCity(e.target.value)} />
          <button className='p-2' onClick={()=>fetchdata()}>GO</button>
        </div>

      </div>

      <div className="output w-100">

        <div className="icon w-100 d-flex justify-content-center">
           <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} />
        </div>

        <div className="temp  w-100 d-flex justify-content-center">
          {temp } °F
        </div>

        <div className="desc  w-100 d-flex justify-content-center">
          {description}
        </div>

        <div className="city  w-100 d-flex justify-content-center">
          {city}, {country}
        </div>

        <div className="extra w-100 d-flex justify-content-between">
          <div className="wind">
            Wind :{wind}
          </div>
          <div className="humid">
            Humidity :{humidity}
          </div>
        </div>

      </div>
      
      </Card>
    </div>
    </>
  );
}

export default App;
