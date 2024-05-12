import React, { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import Gps from "../TrackFood/Gps";
import TrackFood from "../TrackFood/TrackFood";

const UserHome = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  console.log(user.hasOwnProperty("uid"));

  return (
    <div className="space-y-4">
      <h2 className="text-3xl">
        <span>Hi, welcome: </span>
        {user?.displayName ? user?.displayName : "Back "}
      </h2>

      <div>
        <TrackFood />
      </div>
    </div>
  );
};

export default UserHome;
