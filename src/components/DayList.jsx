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

import React, { useEffect, useState } from "react";

export default function (props) {
  const [registeredEvent, setRegisteredEvent] = useState(false)
  const { day_number, trip_message, places = [], activities, formattedActivities, placeIds, onClick, onClickPlace } = props;

  const photos = places && places.length > 0 ? places[0].photos : []

  useEffect(() => {
    if (typeof (placeIds) === 'undefined') return;

    if (placeIds.length > 0 && !registeredEvent) {
      for (let i = 0; i < placeIds.length; i++) {
        try {
          const placeSelection = document.getElementById(placeIds[i])
          placeSelection.addEventListener('click', (e) => {
            onClickPlace && onClickPlace(placeSelection.innerHTML, places[i])
          })
        } catch (error) {
          // console.error(error)
        }

      }
    }
    setRegisteredEvent(true)
  });

  return (
    <div className="flex flex-row space-x-2 pb-4">
  <div
    className="relative cursor-pointer mt-1"
    onClick={onClick}
  >
    {
      photos ? (
        photos.length === 0 ? (
          <div className="bg-gray-900 rounded-lg shadow-sm filter drop-shadow-md w-28 h-28"></div>
        ) : (
          <img
            src={photos[0]}
            alt=""
            className="w-28 h-28 rounded-lg object-cover object-center filter drop-shadow-md"
            onClick={() => {
              //window.open(map_url, '_blank');
            }}
          />
        )
      ) : (
        <div className="bg-gray-900 rounded-lg shadow-sm filter drop-shadow-md w-28 h-28"></div>
      )
    }

    <div
      className="absolute top-0 left-0 p-1 bg-opacity-70 bg-white rounded-9px ml-7 mt-4"
    >
      <h2 className="font-sans text-xs font-medium text-black">
        🏖️ Day {day_number && day_number}
      </h2>
    </div>
  </div>

  <div className="w-2/3">
    <span className="text-gray-700 text-base">
      {!formattedActivities ? (
        <div className="bg-gray-900 rounded-lg shadow-sm filter drop-shadow-md w-28 h-28"></div>
      ) : (
        <ul
                style={{
                  overflowY: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 5,
                  WebkitBoxOrient: "vertical",
                  paddingLeft: '18px',
                  marginTop: '2px',
                  marginBottom: '2px'

                }}
          >
          {formattedActivities &&
            formattedActivities.map((activity, i) =>
            
            <li key={i} dangerouslySetInnerHTML={{ __html: activity }}></li>)
          }
      
        </ul>
      )}

      <div
        className="overflow-hidden text-base line-clamp-5"
        dangerouslySetInnerHTML={{ __html: trip_message }}
      ></div>
    </span>
  </div>
</div>

  )
}
