import { DateTime } from 'luxon';
import React from 'react'

function Forecast({dailyForecast,timezone})
{

    return (
            <div className="py-2 md:py-0 w-full flex flex-col md:flex-row justify-center items-center backdrop-sepia-5 bg-[rgba(0,0,0,.8)] min-h-[30vh] ">
            {
                dailyForecast.map(daily=>
                {
                    return <div key={daily.dt} className="flex flex-row md:flex-col items-center justify-around md:justify-center w-[100%] md:w-[14.25%] md:shadow-[-7px_5px_15px_2px_rgba(0,0,0,.8)] hover:shadow-[-7px_5px_15px_2px_rgba(0,0,0,.8)_inset] text-white md:h-[30vh]  ">

                        <p className='font-light md:text-2xl text-md w-[20%] md:w-[initial] '>{DateTime.fromSeconds(daily.dt).setZone(timezone).toFormat("ccc")}</p>

                        <img src={`http://openweathermap.org/img/wn/${daily.weather[0].icon}@2x.png`} alt="weather_icon" className='w-[15%] md:w-14' />

                        <h2 className='font-bold text-sm w-[20%] md:w-[initial] text-center' >{daily.temp.day.toFixed()}°c</h2>
                        
                    </div>
                })            
            }

            </div>

            )
}

export default Forecast