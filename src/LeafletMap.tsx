import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet's CSS

interface LeafletMapProps {
  center: [number, number]; // Latitude and longitude
  zoom: number;
}

const LeafletMap: React.FC<LeafletMapProps> = ({ center, zoom }) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapRef.current = L.map(mapContainerRef.current).setView(center, zoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapRef.current);

    // Clean up the map instance when the component unmounts
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, [center, zoom]);

  useEffect(() => {
    if(mapRef.current){
      mapRef.current.setView(center, zoom);
    }
  },[center, zoom]);

  return <div ref={mapContainerRef} style={{ height: '500px', width: '100%' }} />;
};

export default LeafletMap;
