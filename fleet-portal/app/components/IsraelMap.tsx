"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Script from "next/script";

const mapCenter = { lat: 31.5, lng: 34.9 };

const cities = [
  { name: "חיפה", position: { lat: 32.794, lng: 34.989 } },
  { name: "תל אביב", position: { lat: 32.0853, lng: 34.7818 } },
  { name: "ירושלים", position: { lat: 31.7683, lng: 35.2137 } },
  { name: "באר שבע", position: { lat: 31.2518, lng: 34.7913 } },
  { name: "אילת", position: { lat: 29.5577, lng: 34.9519 } }
];

declare global {
  interface Window {
    initMap?: () => void;
    google?: {
      maps: {
        Map: new (el: HTMLElement, opts: Record<string, unknown>) => unknown;
        Marker: new (opts: Record<string, unknown>) => unknown;
      };
    };
  }
}

export default function IsraelMap() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [isReady, setIsReady] = useState(false);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const scriptSrc = useMemo(() => {
    if (!apiKey) {
      return null;
    }
    return `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
  }, [apiKey]);

  useEffect(() => {
    if (!mapRef.current || !window.google) {
      return;
    }

    const googleMaps = window.google;
    if (!googleMaps) {
      return;
    }

    const map = new googleMaps.maps.Map(mapRef.current, {
      center: mapCenter,
      zoom: 7,
      disableDefaultUI: false,
      mapTypeControl: false,
      streetViewControl: false
    });

    cities.forEach((city) => {
      new googleMaps.maps.Marker({
        position: city.position,
        map,
        title: city.name
      });
    });
  }, [isReady]);

  useEffect(() => {
    window.initMap = () => {
      setIsReady(true);
    };

    return () => {
      delete window.initMap;
    };
  }, []);

  if (!apiKey) {
    return (
      <div className="map-placeholder">
        הוסף מפתח API של Google Maps ב־`NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`.
      </div>
    );
  }

  return (
    <>
      {scriptSrc && (
        <Script src={scriptSrc} strategy="afterInteractive" />
      )}
      <div className="map-container" ref={mapRef} />
    </>
  );
}
