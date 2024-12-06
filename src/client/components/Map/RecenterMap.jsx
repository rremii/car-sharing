import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";

import "./Map.css";
import { useEffect, useRef, useState } from "react";

export const RecenterMap = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng]);
  }, [lat, lng]);
  return null;
};
