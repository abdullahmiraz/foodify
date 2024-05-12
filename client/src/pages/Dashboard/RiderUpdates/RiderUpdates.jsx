import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useRider from "../../../hooks/useRider";
import useAuth from "../../../hooks/useAuth";

const RiderUpdates = () => {
  const { user, loading } = useAuth();

  const [userLocations, setUserLocations] = useState([]);
  const [axiosSecure] = useAxiosSecure();
  const [isRider] = useRider();
  const [acceptButtonDisabled, setAcceptButtonDisabled] = useState(false);

  useEffect(() => {
    const fetchUserLocations = async () => {
      try {
        const response = await axiosSecure.get("/userlocations");
        setUserLocations(response.data);
      } catch (error) {
        console.error("Error fetching user locations:", error);
      }
    };

    fetchUserLocations();
  }, [axiosSecure]);

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const requestBody = { status: newStatus };

      if (newStatus === "accepted") {
        requestBody.assignedto = user.email;
      }

      const response = await axiosSecure.put(
        `/userlocations/${orderId}`,
        requestBody
      );

      setUserLocations((prevLocations) =>
        prevLocations.map((location) =>
          location._id === orderId
            ? { ...location, status: newStatus, assignedto: user.email }
            : location
        )
      );
      console.log("Order status updated:", response.data);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const handleAccept = async (orderId) => {
    try {
      // Fetch the current user's email (assuming you have access to it)

      const response = await axiosSecure.put(`/userlocations/${orderId}`, {
        status: "accepted",
        assignedto: user.email,
      });

      // Update the UI with the new order status and assignedto
      setUserLocations((prevLocations) =>
        prevLocations.map((location) =>
          location._id === orderId
            ? { ...location, status: "accepted", assignedto: user.email }
            : location
        )
      );
      console.log("Order status updated:", response.data);
      // Disable the accept button after clicking
      setAcceptButtonDisabled(true);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const handleDelete = async (orderId) => {
    try {
      const response = await axiosSecure.delete(`/userlocations/${orderId}`);
      setUserLocations((prevLocations) =>
        prevLocations.filter((location) => location._id !== orderId)
      );
      console.log("User location deleted:", response.data);
    } catch (error) {
      console.error("Error deleting user location:", error);
    }
  };

  return (
    <div className="flex flex-col items-center s">
      <h2 className="font-bold text-3xl text-center">User Locations</h2>
      <div className="overflow-x-auto border">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Email</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Date</th>
              <th>Status</th>
              <th>Update Status</th> {/* New column for the update button */}
              <th>Accept</th> {/* New column for the accept button */}
              <th>Delete</th> {/* New column for the accept button */}
            </tr>
          </thead>
          <tbody>
            {userLocations.map((location) => (
              <tr key={location._id}>
                <td>{location.email}</td>
                <td>{location.address?.latitude}</td>
                <td>{location.address?.longitude}</td>
                <td>{new Date(location.date)?.toLocaleString()}</td>
                <td>{location.status}</td>

                <td>
                  <select
                    disabled={!isRider || location.status === "accepted"}
                    value={location.status}
                    onChange={(e) => {
                      console.log("Dropdown value changed:", e.target.value);
                      handleStatusUpdate(location._id, e.target.value);
                    }}
                  >
                    <option value="pending">Pending</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </td>
                <td>
                  <button
                    className="btn bg-blue-400"
                    disabled={
                      !isRider ||
                      acceptButtonDisabled ||
                      location.status === "accepted"
                    }
                    onClick={() => handleAccept(location._id)}
                  >
                    Accept
                  </button>
                </td>
                <td>
                  <button
                    className="btn bg-red-500"
                    onClick={() => handleDelete(location._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RiderUpdates;
