import { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { useAppContext } from "../../../providers/AppContextProvider";
import axios from "axios";

const Gps = () => {
  const { location, setLocation, setGeo, localLocation, setLocalLocation } =
    useAppContext();
  const [locationInput, setLocationInput] = useState("Mirpur 10"); // State to hold input location
  const [error, setError] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocalLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setGeo({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    getLocation;
  }, [localLocation]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const myLocationSearch = await fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${locationInput}&apiKey=00dc7b385a9948d4b74ab1262d21c2bc`
      );
      const apiLocation = myLocationSearch?.url;
      // setLocalLocation({
      //   latitude: response?.features?.geometry?.coordinates[1],
      //   longitude: response?.features?.geometry?.coordinates[0],
      // });

      console.log(apiLocation);
      const mynewLocation = await fetch(apiLocation)
      console.log(mynewLocation);
      

      // Push the location input to another component using React Router
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="flex flex-col">
      <button
        className="flex justify-center items-center text-lg font-bold text-blue-700"
        onClick={getLocation}
      >
        <FaLocationDot /> Get Location
      </button>
      {location && (
        <div>
          Latitude: {localLocation.latitude}
          <br />
          Longitude: {localLocation.longitude}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input
          className="p-1 mr-2"
          type="text"
          placeholder="location"
          value={locationInput}
          onChange={(e) => setLocationInput(e.target.value)}
        />
        <button type="submit" className="border p-1 rounded">
          Submit
        </button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Gps;
