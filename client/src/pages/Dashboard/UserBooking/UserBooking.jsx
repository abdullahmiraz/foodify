import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import userBooking from "../../../hooks/useBooking";

const UserBooking = () => {
  const { bookings } = userBooking();

  console.log(bookings);

  return <div>user booking</div>;
};

export default UserBooking;
