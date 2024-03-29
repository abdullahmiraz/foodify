import React, { useContext } from "react";
import { FaBars, FaCartPlus, FaShoppingCart } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useAdmin from "../../../hooks/useAdmin";
import useCart from "../../../hooks/useCart";
import { AuthContext } from "../../../providers/AuthProvider";
 

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const [cart] = useCart();

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  const navOptions = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/menu">Menu</NavLink>
      </li>
      <li>
        <NavLink to="/order/salad">Order</NavLink>
      </li>
      {user && isAdmin && (
        <li>
          <Link to="/dashboard/adminHome">Dashboard</Link>
        </li>
      )}
      {user && !isAdmin && (
        <li>
          <Link to="/dashboard/userHome">Dashboard</Link>
        </li>
      )}
      <li>
        <NavLink to="/dashboard/cart" className="bg-pink-100">
          Cart <FaCartPlus />({cart.length})
        </NavLink>
      </li>
      {user ? (
        <>
          {/* <span>{user?.displayName}</span> */}
          <button
            onClick={handleLogOut}
            className=" mx-2 px-2 rounded-md bg-gray-500 btn-ghost text-white"
          >
            LogOut
          </button>
        </>
      ) : (
        <>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="sticky top-0 z-50">
      <div className="navbar bg-base-100 shadow-md ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <FaBars />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navOptions}
            </ul>
          </div>
          <Link>
            <img className="w-[6rem] " src="/foodify.png" />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navOptions}</ul>
        </div>
        <div className="navbar-end">
          <Link to={"/order/salad"} className="btn  btn-outline">
            Order
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
