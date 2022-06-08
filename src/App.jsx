import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import sun from "/src/assets/img/sun.png"
import clouds from "/src/assets/img/clouds.png"

function App() {
  const [obj, setObj] = useState()

  let lon, lat

  const getLatLon = () => {

    const succes = pos => {
      lon = pos.coords.longitude
      lat = pos.coords.latitude
      setObj({lat, lon})
    }

    navigator.geolocation.getCurrentPosition(succes)
  }
  
  const apiKey = 'd09f3490b20b989fab930bf1628b86e0'

  let [temp, setTemp] = useState(0)
  let [city, setCity] = useState('')
  let [country, setCountry] = useState('')
  let [condition, setCondition] = useState('')
  let [conditionImage, setImage] = useState('')

  useEffect(() => {
    if (obj != undefined){
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${obj?.lat}&lon=${obj?.lon}&appid=${apiKey}`

      axios.get(apiUrl)
        .then(res => {
          setTemp(temp = res.data.main.temp)
          setCity(city = res.data.name)
          setCountry(country = res.data.sys.country)
          setCondition(condition = res.data.weather[0].description)
          console.log(condition)
          if(condition.endsWith('clouds')){
            setImage(conditionImage = clouds)
          } else{
            setImage(conditionImage = sun)
          }
        })
        
    }  
  }, [obj])
  

  return (
    <div className="App">
        <div className="container">
          <h3 className="appName">Wheater App</h3>
          <h1 className="temp">{Math.round(temp-273.1)}°C</h1>
      
          <div className="city">
            <h1 className="city-name">{city}, {country}</h1>
          </div>

          <div className="weather">
            <img
              src={conditionImage}
              className='wheater-icon'
              alt=""
              width='50'
              height='50'
            />

            <span className="weather-condition">{condition}</span>
          </div>
          <div className="get-location">
            <button onClick={getLatLon}>Get Location</button>
          </div>
        </div> 
    </div>
  )
}

export default App
