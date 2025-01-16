import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logo } from '../assets';
import Header from './Header';

const Demo = () => {

const [isLoading, setIsLoading] = useState(false);
const navigate = useNavigate();

const handleClick = () => {
    setIsLoading(true);
    // Simulate loading animation for 2 seconds (you can adjust the duration as needed)
    setTimeout(() => {
      setIsLoading(false);
      navigate('/destination');
    }, 2000);
  };

  return (
    <>
    <Header />

    <div className="w-full flex
        justify-between items-center
        flex-col mt-20">
    <h1 className="head_text py-4">
    "Discover Your Perfect Journey" <br
    className= "max-md:hidden" />
    <span>Your Personalized Itinerary Awaits!</span>
    </h1>  

    <h2 className ='desc mb-8' >
        Leverage the power of Gen AI which transforms travel planning
            into an unforgettable adventure. 
            Say goodbye to generic itineraries and cookie-cutter trips, 
            and embrace a truly tailored experience like never before. 
            Let our advanced AI technology craft a unique journey just for you, 
            curated to match your interests, preferences, and aspirations.    
        </h2>


            <button className={`rounded-lg border-black w-24 h-10 bg-purple-900 px-2 py-2 text-sm text-white transition-all hover:bg-slate-800 hover:text-white ${isLoading ? 'spinning' : ''}`}
                type ='button'
                onClick={handleClick}
                disabled={isLoading}
                >
            {isLoading ? null : 'Start'}

            </button>
        
        </div>
        </>
            )
    }

export default Demo