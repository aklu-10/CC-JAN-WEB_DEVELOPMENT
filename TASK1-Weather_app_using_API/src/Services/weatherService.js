import { DateTime } from "luxon"; // For formatting date and time
import { toast } from "react-toastify"; // Notifications

//Get Current Weather
async function getWeatherData(city,url)
{
    try
    {
        toast.info(`Fetching '${city.toUpperCase()}' weather`);
       
        // Get city weather
        let response=await fetch(url).then(res=>res.json());
        let {coord,dt,main:{temp},name,sys:{country},weather}=response;
        let condition=weather[0].main;

        // Get daily weather
        let {daily,timezone}=await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&exclude=hourly&appid=a50125806c9c55f6a7582def6ba201a8&units=metric`).then(res=>res.json());
        let dailyForecast=daily.slice(1,8);
        
        
        // Format date and time
        let format="ccc, dd LLL yyyy' | Local time : 'hh:mm a";
        let date=DateTime.fromSeconds(dt).setZone(timezone).toFormat(format);
        

        toast.success("Success");
        return {name,country,date,temp,condition,dailyForecast,timezone};
    }
    catch(err)
    {
        toast.error(`Cannot find '${city.toUpperCase()}' weather`);
        return {error:true};
    }
}


export default getWeatherData;

