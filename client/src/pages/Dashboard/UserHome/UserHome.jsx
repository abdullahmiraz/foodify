import React, { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";

const UserHome = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  console.log(user.hasOwnProperty("uid"));

  return (
    <div>
      <h2 className="text-3xl">
        <span>Hi, welcome: </span>
        {user?.displayName ? user?.displayName : "Back "}
      </h2>
    </div>
  );
};

export default UserHome;
