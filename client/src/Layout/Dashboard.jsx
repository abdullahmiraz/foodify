import {
  FaAd,
  FaBook,
  FaCalendar,
  FaCashRegister,
  FaDollarSign,
  FaEnvelope,
  FaHome,
  FaList,
  FaSearch,
  FaShoppingCart,
  FaUsers,
  FaUtensils,
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";
import { Helmet } from "react-helmet-async";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
localStorage.setItem("access-token", "JFSOIJSOIdfuy9823r2jhfEJUFisndfuisdfjsk");
const Dashboard = () => {
  const { user } = useContext(AuthContext);
  // console.log(user.email);
  const regex = /rider@.*\.com$/;

  const isRider = regex.test(user.email);
  // console.log(isRider);

  const [cart] = useCart();

  // TODO: get isAdmin value from the database
  const [isAdmin] = useAdmin();

  return (
    <div className="flex">
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      {/* dashboard side bar */}
      <div className="w-64 min-h-screen text-[darkblue] bg-orange-400">
        <ul className="menu p-4">
          {isAdmin ? (
            <>
              <li>
                <NavLink to="/dashboard/adminHome">
                  <FaHome></FaHome>
                  Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addItems">
                  <FaUtensils></FaUtensils>
                  Add Items
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageItems">
                  <FaList></FaList>
                  Manage Items
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/bookings">
                  <FaBook></FaBook>
                  Manage Bookings
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/users">
                  <FaUsers></FaUsers>
                  All Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/payment">
                  <FaCashRegister></FaCashRegister>
                  Payment System
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/paymentHistory">
                  <FaDollarSign></FaDollarSign>
                  Payment History
                </NavLink>
              </li>
            </>
          ) : isRider ? (
            <div className="flex flex-col gap-3">
              <li>
                <NavLink to="/dashboard/riderHome">
                  <FaHome></FaHome>
                  Rider Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/riderUpdates">
                  <FaHome></FaHome>
                  Rider Updates
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/tracker">
                  <FaList></FaList>
                  Track Your Food
                </NavLink>
              </li>
            </div>
          ) : (
            <>
              <li>
                <NavLink to="/dashboard/userHome">
                  <FaHome></FaHome>
                  User Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/history">
                  <FaCalendar></FaCalendar>
                  History
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/cart">
                  <FaShoppingCart></FaShoppingCart>
                  My Cart ({cart.length})
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/userBookTable">
                  <FaShoppingCart></FaShoppingCart>
                  Book a Table
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/userBooking">
                  <FaShoppingCart></FaShoppingCart>
                  My Booking
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/review">
                  <FaAd></FaAd>
                  Add a Review
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/paymentHistory">
                  <FaList></FaList>
                  Real Payment History
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/tracker">
                  <FaList></FaList>
                  Track Your Food
                </NavLink>
              </li> 
            </>
          )}
          {/* shared nav links */}
          <div className="divider "></div>
          <li>
            <NavLink to="/">
              <FaHome></FaHome>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/order/salad">
              <FaSearch></FaSearch>
              Menu
            </NavLink>
          </li>
          <li>
            <NavLink to="/order/contact">
              <FaEnvelope></FaEnvelope>
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
      {/* dashboard content */}
      <div className="flex-1 p-8">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
