import React, { useEffect, useState } from 'react';
import Weathercard from './weathercard';
import "./style.css";

 const Temp = () => {
     const[searchValue, setSearchValue] = useState("New Delhi");
     const[tempInfo, setTempInfo] = useState({});

     const getWeatherInfo = async () => {
      try{
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}
        &units=metric&appid=2c08c7265ced97ac616925c6a19a4b00`;

         const res = await fetch(url);
         const data = await res.json();

         const{ temp, humidity, pressure } = data.main;
         const { main: weathermood } = data.weather[0];
         const{ name } = data;
         const{ speed } = data.wind;
         const{ country, sunset } = data.sys;

         const myNewWeatherInfo = {
          temp,
          humidity,
          pressure,
          weathermood,
          name,
          speed,
          country,
          sunset
         };

         setTempInfo(myNewWeatherInfo);
         
      } catch(error) {
        console.log(error);
      }
     };

     useEffect(() => {
         getWeatherInfo();
     }, []);

  return (
    <>
       <div className ='wrap'>
           <div className='search'>
               <input type='search' placeholder='search...' autoFocus id='search' className='searchTerm' 
                value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
               <button className='searchButton' type='button' onClick={getWeatherInfo}>search</button>
           </div>
       </div>
       
       {/* our temp card */}

       <Weathercard {...tempInfo} />
  
    </>
  )
}

export default Temp;