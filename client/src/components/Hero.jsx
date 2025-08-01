import React from 'react'
import {assets} from '../assets/assets'
import {AppContext} from '../context/AppContext'

const Hero = () => {

  const {setSearchFilter, setIsSearched} = React.useContext(AppContext);

  const titleRef = React.useRef(null);
  const locationRef = React.useRef(null);

  const onSearch = () => {
    setSearchFilter({
      title: titleRef.current.value,
      location: locationRef.current.value,
    });
    setIsSearched(true);
  }

  return (
    <div className='container 2xl:px-20 mx-auto my-10'>
      <div className='bg-gradient-to-r from-purple-800 to-purple-950 text-white py-16 text-center mx-2 rounded-xl'>
        <h2 className='text-2xl md:text-3xl lg:text-4xl font-medium mb-4'>Over 10,000+ jobs to apply</h2>
        <p className='mb-4 max-w-xl mx-auto text-sm font-light px-5'>Your Next Big Career Move Starts Right Here - Explore the Vast Opportunities Awaiting You! Take the First Step Torward Your Future</p>
        <div className='flex items-center justify-between bg-white rounded text-gray-600 max-w-xl pl-4 mx-4 sm:mx-auto'>
          <div className='flex items-center gap-2'>
            <img className='h-4 sm:h-5' src={assets.search_icon} alt="SearchIcon" />
            <input type="text"
            placeholder='Search for jobs, skills...'
            className='max-sm:text-xs p-2 rounded outline-none w-full'
            ref={titleRef}
            />
          </div>
          <div className='flex items-center gap-2'>
            <img className='h-4 sm:h-5' src={assets.location_icon} alt="LocationIcon" />
            <input type="text"
            placeholder='Location'
            ref={locationRef}
            className='max-sm:text-xs p-2 rounded outline-none w-full' />
          </div>
          <button onClick={onSearch} className='bg-blue-600 text-white px-6 sm:px-9 py-2 rounded m-1'>Search</button>
        </div>
      </div>
      <div className='border border-gray-300 shadow-md mx-2 mt-5 p-6 rounded-md flex'>
        <div className='flex justify-center gap-10 lg:gap-16 flex-wrap'>
          <p className='font-medium'>Trusted by</p>
          <img className='h-6' src={assets.microsoft_logo} alt="microsoft_logo" />
          <img className='h-6' src={assets.walmart_logo} alt="walmart_logo" />
          <img className='h-6' src={assets.accenture_logo} alt="accenture_logo" />
          <img className='h-6' src={assets.samsung_logo} alt="samsung_logo" />
          <img className='h-6' src={assets.amazon_logo} alt="amazon_logo" />
          <img className='h-6' src={assets.adobe_logo} alt="adobe_logo" />
        </div>
      </div>
    </div>
  )
}

export default Hero
