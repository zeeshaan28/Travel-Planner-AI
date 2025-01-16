/**
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Circle, ArrowLeft } from 'react-feather';

import { Pagination } from "swiper/modules";
import Div100vh from "react-div-100vh";


export default React.forwardRef((props, ref) => {
  const placeViewDescriptionRef = useRef(null);

  const [registeredEvent, setRegisteredEvent] = useState(false)

  const { day_number, places, placeIds, formattedActivities, onClose } = props;

  const [currentIndex, setCurrentIndex] = useState(0)

  const handleOnSlideChange = (e) => {
    setCurrentIndex(e.activeIndex)
  }

  useEffect(() => {
    if (typeof (placeIds) === 'undefined') return;

    if (placeIds.length > 0 && !registeredEvent) {
      const placeViewDescriptionElement = placeViewDescriptionRef.current;
      const placeElementList = placeViewDescriptionElement.getElementsByTagName("b");
      for (let i = 0; i < placeElementList.length; i++) {
        try {
          placeElementList[i].addEventListener('click', (e) => {
            props.onClickPlace && props.onClickPlace(placeElementList[i].innerHTML, places[i])
          })
        } catch (e) {
          // console.error(e);
        }
      }
    }
    setRegisteredEvent(true)
  });

  return (
    <Div100vh ref={ref} style={{ position: 'absolute', top: 0, left: 0, width: "100%", zIndex: 200, overflowY: "hidden", background: "#FCF6F2" }}>
      {/* Photo Gallery */}
      <div className='flex flex-col'>
      <div className=" flex relative w-full" style={{ height: `calc(0.6 * ${window.innerHeight}px)` }}>
        <div className="flex flex-col justify-between absolute w-full h-full"
        style={{
          top: 0,
          left: 0,
          zIndex: 1000,
        }}>
          
      
          <div
          style={{zIndex:1000, margin:'20px'}}>
            <button className= "text-white bg-black bg-opacity-40 hover:bg-slate-700 py-3 px-4 rounded-full shadow-lg" 
            onClick={() => { onClose && onClose() }}>
              <ArrowLeft />
            </button>
          </div>

          <Swiper
            style={{ position: "absolute", width: "100%", height: "100%" }}
            slidesPerView={1}
            modules={[Pagination]}
            onSlideChange={(e) => { handleOnSlideChange(e) }}
          >
            {places && places.map((placeData, index) => {
              const photos = typeof (placeData.photos) !== "undefined" ? placeData.photos : [];

              return (
                <SwiperSlide key={index}>
                  <div className="w-full h-full">
                    {!photos && photos.length === 0 ?
                      <div
                        className="bg-white flex w-full h-full"
                      />
                      :
                      <img
                        style={{ objectFit: "cover", objectPosition: "center center" }}
                        className="w-full h-full"
                        src={photos[0]} alt=""
                      />
                    }
                    <div
                      style={{
                        position: 'absolute',
                        background: 'linear-gradient(183.73deg, #000000 -21.07%, rgba(0, 0, 0, 0) 94.07%)',
                        mixBlendMode: 'multiply',
                        opacity: '0.4',
                        width: '100%',
                        height: '100%',
                        transform: 'rotate(-180deg)',
                        top: 0,
                        left: 0
                      }}
                    >
                  </div>
                  </div>
                </SwiperSlide>
              )
            })}
          </Swiper>

          <div className=" flex flex-col text-white m-4"
          style={{zIndex:1000}}>
            <div className="flex flex-row items-center p-2 space-x-1">
              <p className="font-sans text-lg">🏖️  Day {day_number} </p>
              <p className=" font-sans">
                   📍 {places[currentIndex].country}
                </p>
                </div>
          
              <div className="flex flex-row pl-2">
              <div style={{width:"80%"}}>
                <h5 className='font-sans font-medium text-lg'>
                  {places[currentIndex].name}
                  </h5>
                  </div>

                <div className='flex flex-row items-end justify-end w-1/5 -mb-2'>
                
                {places.length > 1 &&
                  places.map((_, index) => {

                    return (
                      <Circle key={index} style={{ width: "10px", height: "10px", fill: index === currentIndex ? "white" : "rgba(255, 255, 255, 0.5)", color: index === currentIndex ? "white" : "rgba(255, 255, 255, 0)", marginRight: "5px"}} />
                    )
                    
                  })
                }
                    
            
              </div>
            </div>
            </div>
            </div>
            
      </div>

    
      <div className="p-4">
        <div className=" font-sans text-sm text-gray-700"
        style={{ fontFamily: "Google Sans", fontSize: "14px", color: "#614646" }}
        ref={placeViewDescriptionRef} 
        >
          <ul className="pl-3 text-lg">
          {
          formattedActivities &&
          formattedActivities.map((activity, i) => <li key={i} dangerouslySetInnerHTML={{ __html: activity }}></li>)
          }   
          </ul>
        </div>
      </div>
    </div>
    </Div100vh>
  )
})
