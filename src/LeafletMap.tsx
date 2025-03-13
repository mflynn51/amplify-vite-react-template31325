import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface LeafletMapProps {
  center: [number, number];
  zoom: number;
  circleCenter?: [number, number]; // Optional circle center
  circleRadius?: number; // Optional circle radius
}

const LeafletMap: React.FC<LeafletMapProps> = ({ center, zoom, circleCenter, circleRadius }) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapRef.current = L.map(mapContainerRef.current).setView(center, zoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapRef.current);

    

    // Add circle if circleCenter and circleRadius are provided
    if (circleCenter && circleRadius) {
      L.circle(circleCenter, {
        radius: circleRadius,
        color: 'red',
      }).addTo(mapRef.current);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, [center, zoom, circleCenter, circleRadius]);

  useEffect(() => {
    if(mapRef.current){
      mapRef.current.setView(center, zoom);
    }
  },[center, zoom]);

  return <div ref={mapContainerRef} style={{ height: '500px', width: '100%' }} />;
};

export default LeafletMap;