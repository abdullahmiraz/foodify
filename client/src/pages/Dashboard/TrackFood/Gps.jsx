import { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { useAppContext } from "../../../providers/AppContextProvider";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Gps = () => {
  const { user } = useAuth();

  const [axiosSecure] = useAxiosSecure();
  const { location, setLocation, setGeo, localLocation, setLocalLocation } =
    useAppContext();
  const [locationInput, setLocationInput] = useState("Mirpur 10"); // State to hold input location
  console.log(locationInput);

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
  console.log(localLocation);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const myLocationSearch = await fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${locationInput}&apiKey=00dc7b385a9948d4b74ab1262d21c2bc`
      );
      const apiLocation = myLocationSearch?.url;
      console.log(apiLocation);
      await fetch(apiLocation)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          // Set the localLocation here
          setLocalLocation({
            latitude: data?.features[0]?.geometry?.coordinates[1],
            longitude: data?.features[0]?.geometry?.coordinates[0],
          });

          // Create the locationDetails object and send the request here
          const locationDetails = {
            email: user.email,
            address: {
              latitude: data?.features[0]?.geometry?.coordinates[1],
              longitude: data?.features[0]?.geometry?.coordinates[0],
            },
            date: new Date(),
            status: "pending",
          };

          axiosSecure
            .post("/userlocation", locationDetails)
            .then((res) => {
              console.log("location saved", res.data);
              if (res.data) {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Your Address is saved",
                  showConfirmButton: false,
                  timer: 1000,
                });
              }
            })
            .catch((error) => {
              console.error("Error saving location:", error);
            });
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col border p-4 rounded-md bg-slate-300">
      <button
        className="btn  flex   items-center text-lg font-bold text-blue-700"
        onClick={getLocation}
      >
        <FaLocationDot /> Share Live Location
      </button>

      {location && (
        <div className="mt-4">
          <span className="font-bold">Latitude: </span>
          {localLocation.latitude ||
            "Share Live location to get current Lattitude"}
          <br />
          <span className="font-bold"> Longitude: </span>
          {localLocation.longitude ||
            "Share Live location to get current Longitude"}
        </div>
      )}
      <br />
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2 ">
        <label htmlFor="road">Road No</label>
        <input type="text" name="road" className="p-1 mr-2" />

        <label htmlFor="city">Enter Your City</label>
        <input
          className="p-1 mr-2"
          type="text"
          name="city"
          placeholder="location"
          value={locationInput}
          onChange={(e) => setLocationInput(e.target.value)}
        />
        <button
          type="submit"
          className="btn border-0 btn-primary bg-orange-600 text-white   p-1 rounded"
        >
          Submit
        </button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Gps;
