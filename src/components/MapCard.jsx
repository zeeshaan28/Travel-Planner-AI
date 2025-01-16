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
import { X, Circle, ArrowLeft } from 'react-feather';
import Div100vh from 'react-div-100vh';

export default function (props) {
  const { location, onClose } = props

  const [map, setMap] = useState(null)

  const mapRef = useRef(null)


  useEffect(() => {
    if (mapRef.current !== null) {
      const _map = new google.maps.Map(mapRef.current, {
        mapId: "69756bebb3f7f821",
        center: location,
        zoom: 16,
      });

      const latLng = new google.maps.LatLng(location.lat, location.lng)
      const marker = new google.maps.Marker({
        position: latLng
      });
      marker.setMap(_map);

      setMap(_map)
    }
  }, [])



  return (
    <Div100vh style={{ position: 'absolute', top: 0, left: 0, width: "100%", overflow: "hidden", zIndex: "2000" }}>
      <div className="w-full h-full">
        <div className="flex flex-col h-full w-full justify-between"
        style={{
          top: 0,
          left: 0,
          zIndex: 1000,
        }}>

          <div className="flex flex-row justify-between items-center content-center"
          style={{ position: "absolute", top: "50px", left: "0px",  margin: "20px", zIndex: 1000, color: "white" }}>

            <button
              className="p-3 rounded-full bg-black bg-opacity-40"
              onClick={() => { onClose && onClose() }}
            >
              <X className="text-white" />
            </button>
          </div>

          <div className="w-full h-full absolute">
            <div className="w-full h-full" ref={mapRef} id="map"></div>
          </div>
        </div>
      </div>
    </Div100vh>
  )
}
