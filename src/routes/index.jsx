import React from 'react'
import { useRoutes } from 'react-router-dom';
import { Home, Itinerary } from "../pages";

export default function Router() {
    return useRoutes([
        {
          path: 'destination',
          element: (
              <Itinerary/>
          ),
        },
        {
          path: '/',
          element: (
              <Home/>
    
          )
        }
      ]);
    }

