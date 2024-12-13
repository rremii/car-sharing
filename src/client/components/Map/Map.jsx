import { MapContainer, TileLayer, Marker } from "react-leaflet";

import "./Map.css";
import { useEffect, useState } from "react";
import { RecenterMap } from "../../../shared/ui/RecenterMap";
import { useNavigate } from "react-router-dom";

import { useGetAllCarsQuery } from "../../api/carApi";

export const Map = () => {
  const navigate = useNavigate();

  const { data: cars } = useGetAllCarsQuery(undefined, {
    refetchOnFocus: true,
  });

  const [location, setLocation] = useState({
    lat: 0,
    lng: 0,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (location) {
      setLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    });
  }, []);

  const goToRent = (carId) => {
    navigate("/client/car/" + carId + "/rent");
  };

  console.log(location);
  return (
    <div className="map">
      <MapContainer zoomControl={false} center={location} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cars?.map(({ id, lat, lng }) => {
          return (
            <Marker
              eventHandlers={{
                click: () => goToRent(id),
              }}
              key={id}
              position={[lat, lng]}
            ></Marker>
          );
        })}

        <RecenterMap {...location} />
      </MapContainer>
    </div>
  );
};
