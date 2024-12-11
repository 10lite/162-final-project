'use client';

import React, { useMemo } from 'react';
import { GoogleMap, TrafficLayer } from '@react-google-maps/api';
import { useJsApiLoader, Libraries } from '@react-google-maps/api';
import { ReactNode } from 'react';

// Define the libraries to load with the Google Maps API
const libraries: Libraries = ['places', 'drawing', 'geometry'];

// Define a MapProvider component to load Google Maps script
export function MapProvider({ children }: { children: ReactNode }) {
  // Load the Google Maps API asynchronously with the specified libraries
  const { isLoaded: scriptLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries,
  });

  // Handle loading and error states
  if (loadError) return <p>Encountered an error while loading Google Maps</p>;
  if (!scriptLoaded) return <p>Map script is loading...</p>;

  // Return the children once the script is loaded
  return <>{children}</>;
}

const containerStyle = {
  width: '100%',
  height: '500px',
};

const center = {
  lat: 7.0736, // Latitude of Davao City
  lng: 125.6110, // Longitude of Davao City
};

const TrafficMap = () => {
  return (
    <MapProvider>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13} // Adjust zoom level to fit Davao City
        onLoad={() => console.log('Map Loaded')}
      >
        <TrafficLayer />
      </GoogleMap>
    </MapProvider>
  );
};

export default TrafficMap;
