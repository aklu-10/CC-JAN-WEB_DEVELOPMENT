import React from 'react'
import { UilSearch } from '@iconscout/react-unicons'
import { useState } from 'react';

function SearchInput({fetchWeather}) {

  let [city,setCity]=useState("");

  function formSubmitted(e)
  {
    e.preventDefault();
    
    if(city)
    {
      fetchWeather(city);
      setCity("");    
    }

  }

  return (

    <>
      <form className="flex justify-center w-[100%]" onSubmit={formSubmitted}>
      
        <input type="text" placeholder='Search for city ...' className='capitalize font-medium text-md text-white focus:outline-none bg-transparent px-2 py-1 w-[70%] md:w-80 border  placeholder:text-white placeholder:font-light placeholder:text-sm shadow-inner' value={city} onChange={(e)=>setCity(e.target.value)} autoComplete='no'/>

        <button type='submit'>
          <UilSearch className="border border-white h-[100%] cursor-pointer hover:bg-white hover:text-black text-white w-14 px-4 text "/>
        </button>
        
      </form>
    </>

  )
}

export default SearchInput
