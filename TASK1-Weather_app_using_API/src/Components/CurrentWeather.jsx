import React from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';

function Weather({weatherData}) {

  return (

    <>
        <div className="flex mt-10 text-gray-700 flex-col justify-around items-center">

            <div className="city flex items-center  ">
                <LocationOnIcon className="mr-1"/>
                <h1 className='text-2xl md:text-5xl my-2'>{weatherData.name}, {weatherData.country}</h1>
            </div>

            <p className='font-[300] text-sm md:text-xl text-center  '>{weatherData.date}</p>

            <h1 className='mt-4 mb-5 font-bold text-5xl' >{weatherData.temp.toFixed()}°c</h1>

            <p className='text-lg font-medium' >{weatherData.condition}</p>

        </div>
    </>

  )
}

export default Weather
