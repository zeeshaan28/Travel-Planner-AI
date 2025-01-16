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

import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import Div100vh from 'react-div-100vh';
import { Circle, X, Navigation } from 'react-feather';
import MapCard from './MapCard';


function PlaceCard(props) {
  const { name, geometry, photos, description, onClose } = props;

  const [currentIndex, setCurrentIndex] = useState(0);

  const [openMapCard, setOpenMapCard] = useState(false);

  const containerRef = useRef(null);

  const handleOnSlideChange = (e) => {
    setCurrentIndex(e.activeIndex);
  };

  const handleOpenMapView = (e) => {
    setOpenMapCard(true);
  };

  const handleOnCloseMapView = (e) => {
    setOpenMapCard(false);
  };

  return (
    <Div100vh
    ref={containerRef}
    style={{ position: 'absolute', top: 0, left: 0, width: "100%", height: '100%', overflowY: "hidden", background: "black" }}>
      <div className="w-full h-full flex bg-black">
        <div className="w-full h-full relative flex flex-col justify-between"
        style={{
          top: 0,
          left: 0,
          zIndex: 1000,
        }}>
          <div className='flex flex-row justify-between items-baseline '
          style={{ margin: "40px", zIndex: 1000, color: "white" }}>

          <button
            className="bg-black bg-opacity-40
           hover:bg-slate-700 text-white p-4 rounded-full "
            onClick={() => {
              onClose && onClose();
            }}
          >
            <X style={{color: "#FFFFFF" }}/>
          </button>

          <div className='flex flex-col justify-center items-center '>

          <button
            className="bg-black bg-opacity-40
            hover:bg-slate-700 text-white p-4 rounded-full"
            onClick={handleOpenMapView}
          >
            <Navigation/>
            </button>
            <h1 className=' font-sans text-lg'>
              Map View
            </h1>

            </div>
          
        </div>

          <Swiper
            style={{ position: "absolute", width: "100%", height: "100%", backgroundColor: "black" }}
            slidesPerView={1}
            modules={[Pagination]}
            onSlideChange={(e) => { handleOnSlideChange(e) }}
          >
            {photos && photos.length !== 0 ? 
              photos.map((photo, index) => {
                return (
                <SwiperSlide key={index}>
                  <div className="w-full h-full">
                    <div className="w-full h-full absolute">

                    <img
                      className="w-full h-full"
                      src={photo}
                      style={{
                        objectFit: "cover",
                        objectPosition: "center center",
                      }}
                    />
                    <div
                          style={{
                            position: 'absolute',
                            width: '100%',
                            height: '30%',
                            background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.2) 31.73%, rgba(255, 255, 255, 0) 68.15%)',
                            top: 0,
                            left: 0,
                          }}
                        >
                          </div>
                          <div
                          style={{
                            position: 'absolute',
                            background: 'linear-gradient(183.73deg, #000000 -21.07%, rgba(0, 0, 0, 0) 94.07%)',
                            mixBlendMode: 'multiply',
                            transform: 'rotate(-180deg)',
                            width: '100%',
                            height: '100%',
                            top: 0,
                            left: 0
                          }}
                        >

                        </div>
                  </div>
                
                  <div className="w-full h-full"
                  style={{ position: 'absolute', marginTop: `calc(${window.innerHeight}px * 0.479)`, zIndex: 100 }}>
                    <div className="flex flex-col text-white space-y-6 p-6">
                      <h4 className='font-sans text-2xl font-light' >
                        {name && name}
                      </h4>
                      <h4 className='font-sans text-lg'>
                        {description && description}
                      </h4>
                    </div>
                  </div>
                  </div>
                </SwiperSlide>
                )
              }) : 
              <SwiperSlide>
                <div className="w-full h-full">
              
                <div className="w-full h-full absolute"></div>
                <div className="w-full h-full"
                style={{ position: 'absolute', marginTop: `calc(${window.innerHeight}px * 0.4)`, zIndex: 100 }}>
                  <div className="flex flex-col text-white space-y-6 p-6">
                    <h4 className='font-sans text-2xl'>
                      {name && name}
                    </h4>
                    <h4 className='font-sans text-lg'>
                      {description && description}
                    </h4>
                  </div>
                </div>
                </div>
              </SwiperSlide>
          }
          </Swiper>
        </div>
      </div>
      <div className="w-full text-white flex flex-col absolute"
      style={{bottom: 5, zIndex: 1000 }}>
        <div className="flex flex-row items-center justify-center space-x-1">
        {
          photos &&
            photos.length > 1 &&
            photos.map((_, index) => {
              return (
                <Circle key={index} style={{ width: "10px", height: "10px", fill: index === currentIndex ? "white" : "rgba(255, 255, 255, 0.5)", color: index === currentIndex ? "white" : "rgba(255, 255, 255, 0)", marginRight: "5px", marginBottom: "20px"}} />
              )
              })
            }
              
            </div>
            </div>

      {openMapCard && (
        <div ref={containerRef} className="w-full h-full">
          <MapCard {...geometry} onClose={handleOnCloseMapView} />
        </div>
      )}
    </Div100vh>
  );
}

export { PlaceCard };
