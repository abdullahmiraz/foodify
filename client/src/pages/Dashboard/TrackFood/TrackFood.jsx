import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useRef } from "react";
import {
  Circle,
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
} from "react-leaflet";
import { useAppContext } from "../../../providers/AppContextProvider";
import Gps from "./Gps";

const iconDesign = {
  iconUrl: "https://cdn-icons-png.flaticon.com/512/149/149060.png",
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -25],
};
const iconDesign2 = {
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -25],
};

const TrackFood = () => {
  const { location, setLocation, setGeo, localLocation, setLocalLocation } =
    useAppContext();
  const mapRef = useRef(null);

  let destinationLocation1 = {
    // permanent
    latitude: 23.8883,
    longitude: 90.3907,
  };

  const destinationLocation2 = {
    latitude: localLocation.latitude || 23.8883,
    longitude: localLocation.longitude || 90.3907,
  };

  // Function to calculate the distance between two coordinates using Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180); // Convert degrees to radians
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
  };

  // Calculate the distance between the two destinations
  const distance = calculateDistance(
    destinationLocation1.latitude,
    destinationLocation2.longitude,
    destinationLocation2.latitude,
    destinationLocation2.longitude
  );

  // Convert distance to time (1 km = 1 minute)
  const timeInMinutes = Math.ceil(distance);

  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current.leafletElement;
      const router = L.Routing.control({
        waypoints: [
          L.latLng(
            destinationLocation1.latitude,
            destinationLocation1.longitude
          ),
          L.latLng(
            destinationLocation2.latitude,
            destinationLocation2.longitude
          ),
        ],
        routeWhileDragging: true,
        lineOptions: {
          styles: [{ color: "blue", opacity: 0.7, weight: 5 }],
        },
      }).addTo(map);
    }
  }, []);

  // Path coordinates for the straight line
  const lineCoordinates = [
    [destinationLocation1.latitude, destinationLocation1.longitude],
    [destinationLocation2.latitude, destinationLocation2.longitude],
  ];

  return (
    <div>
      <Gps />
      <br />
      <br />
      <div className="work-section-top">
        <p className="primary-subheading">Track Food Nearby</p>
      </div>
      <center>
        <br />
        <MapContainer
          center={[
            (destinationLocation1.latitude + destinationLocation2.latitude) / 2,
            (destinationLocation1.longitude + destinationLocation2.longitude) /
              2,
          ]}
          zoom={10}
          style={{ height: "400px", width: "80%" }}
          ref={mapRef}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* Render the Polyline for the straight line */}
          <Polyline positions={lineCoordinates} color="green" />

          {/* Render the Marker for destinationLocation1 */}
          <Marker
            position={[
              destinationLocation1.latitude,
              destinationLocation1.longitude,
            ]}
            icon={L.icon(iconDesign)}
          >
            <Popup>Destination 1</Popup>
          </Marker>

          {/* Render the Marker for destinationLocation2 */}
          <Marker
            position={[
              destinationLocation2.latitude,
              destinationLocation2.longitude,
            ]}
            icon={L.icon(iconDesign2)}
          >
            <Popup>Destination 2</Popup>
          </Marker>
          <Circle
            center={[
              destinationLocation2.latitude,
              destinationLocation2.longitude,
            ]}
            radius={500} // Set radius in meters
            pathOptions={{ color: "blue" }}
          />
        </MapContainer>
      </center>
      <div>
        <p>Distance between destinations: {distance} km</p>
        <p>Time to travel between destinations: {timeInMinutes} minutes</p>
      </div>
    </div>
  );
};

export default TrackFood;
