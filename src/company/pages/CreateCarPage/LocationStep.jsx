import styled from "styled-components";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { useEffect, useState } from "react";
import { RecenterMap } from "../../../shared/ui/RecenterMap";
import { useMapEvents } from "react-leaflet";

export const LocationStep = ({ onNextStep, onLocationChange }) => {
  const [currentLocation, setCurrentLocation] = useState({
    lat: 0,
    lng: 0,
  });

  useEffect(() => {
    onLocationChange(currentLocation);
  }, [currentLocation]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (location) {
      setCurrentLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    });
  }, []);

  return (
    <ContainerLayout>
      <h3>LocationStep</h3>
      <MapContainer
        className="map"
        zoomControl={false}
        center={currentLocation}
        zoom={13}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker
          onClick={setCurrentLocation}
          location={currentLocation}
        />
        <RecenterMap {...currentLocation} />
      </MapContainer>
      <button onClick={onNextStep}>Next</button>
    </ContainerLayout>
  );
};

function LocationMarker({ location, onClick }) {
  const map = useMapEvents({
    click(e) {
      onClick({
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      });
      map.locate();
    },
  });

  return location === null ? null : <Marker position={location}></Marker>;
}

const ContainerLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  .map {
    flex: 1 1 auto;
  }
`;
