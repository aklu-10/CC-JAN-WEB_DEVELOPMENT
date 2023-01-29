import { useState } from "react";
import { useEffect } from "react";
import { ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Forecast from "./Components/Forecast";
import SearchInput from "./Components/SearchInput";
import CurrentWeather from "./Components/CurrentWeather";
import getWeatherData from "./Services/weatherService";
import GitHubIcon from '@mui/icons-material/GitHub';

function App() {

    let [data,setData]=useState("");

    // Request for current weather
    async function fetchWeather(city)
    {
        let url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a50125806c9c55f6a7582def6ba201a8&units=metric`;
        data=await getWeatherData(city,url);
        setData(data);
    }
    
    useEffect(()=>
    {
        // default city is london
        fetchWeather("london");
    },[])
    
    return (
        
        <> 

            {/* github link*/}
            <a href="https://github.com/aklu-10/CodeClause_weather_app_using_api" className="fixed top-4 right-4"><GitHubIcon/></a>

            {
                
                // if data exist
                (data && data.error!==true &&  
                <img className="bg" src={`weatherPic/${data.temp>28?"warm-min.jpg":"cold-min.png"}`} alt="weather_icon" /> ) 
                ||
                // if data not exist
                (
                <img className="bg" src="weatherPic/warm-min.jpg" alt="weather_icon" />
                )
            }

            {
                // if data exist
               ( data && data.error!==true &&
                 
                    <>
                        
                    <div className="container flex flex-col justify-center items-center mx-auto min-h-[400px] h-[70vh]">
                        <SearchInput fetchWeather={fetchWeather} />
                        <CurrentWeather weatherData={data}/>
                    </div>
                    
                    <Forecast dailyForecast={data.dailyForecast} timezone={data.timezone}/>

                    </>
                
               ) 

               ||

                // if data not exist
                (
                    data && 
                    <div className="container flex flex-col justify-center items-center mx-auto h-[70vh]">
                        <SearchInput fetchWeather={fetchWeather} />
                        <h1 className="text-2xl my-5 text-white">Search Again</h1>
                    </div>
                )
            }
            
            {/* react-toastify */}
            <ToastContainer position="bottom-right" autoClose={2000} theme="colored"/>
        </>
        );
}
 
export default App;

