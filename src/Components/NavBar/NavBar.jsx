import React, { useContext } from "react";
import mainLogo from "../../assets/royal-logo.png";
import { Link, NavLink } from "react-router";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";

import { AuthContext } from "../../AuthProvider/AuthContext";
import { toast } from "react-toastify";

const NavBar = () => {

  const { userInfo, handleSignOut } = useContext(AuthContext);

  const handleLogOut = () => {
    handleSignOut()
      .then(() => {
        toast.info("User log out successful!");
      })
      .catch((err) => toast.error(err.message));
  };

  const pageLinks = (
    <>
      <NavLink to={"/"}>Home</NavLink>
      <NavLink to={"/allFoods"}>All Foods</NavLink>
      <NavLink to={"/gallery"}>Gallery</NavLink>
      <NavLink to={"/aboutUs"}>About Us</NavLink>
      {
        userInfo && <NavLink to={"/dashboard"}>Dashboard</NavLink>
      }
    </>
  );

  const myLinks = <>
  <NavLink className="py-2 px-2" to={"/myFoods"}>My Foods</NavLink>
  <NavLink className="py-2 px-2" to={"/addFood"}>Add Food</NavLink>
  <NavLink className="py-2 px-2" to={"/myOrders"}>My Orders</NavLink>
  </>
  return (
    <div className="w-full bg-orange-500 dark:bg-orange-700">
      <div className="navbar w-11/12 mx-auto py-1">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-white border border-gray-400 dark:bg-gray-900 dark:text-gray-100 rounded-box z-1 mt-3 w-28 p-2 shadow flex flex-col items-start gap-3 font-bold"
            >
              {pageLinks}
            </ul>
          </div>
          <div className="flex flex-col md:flex-row gap-1 items-center justify-center">
            <div className="w-20 h-20 p-2 rounded-full">
              <img
                className="w-16 h-16"
                src={mainLogo}
                alt="Royal Bites Logo"
              />
            </div>
            <h1 className="hidden md:block play font-extrabold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-white dark:from-white dark:to-orange-100 to-gray-100">
              Royal Bites
            </h1>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 flex gap-5 font-bold text-white dark:text-gray-100">
            {pageLinks}
          </ul>
        </div>
        <div className="navbar-end space-x-4">
          <DarkModeToggle></DarkModeToggle>
          {userInfo ? (
            <div className="flex justify-center items-center gap-3">
              <div className="dropdown dropdown-bottom dropdown-center">
                <img
                  role="button"
                  tabIndex={0}
                  className="w-12 h-12 md:w-16 md:h-16 rounded-full ring ring-gray-100 dark:ring-gray-200"
                  src={userInfo.photoURL}
                  alt=""
                />
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-1 w-28 p-2 shadow-sm dark:bg-gray-900 dark:text-white border dark:border-gray-200"
                >
                  {myLinks}
                </ul>
              </div>
              <button
                onClick={handleLogOut}
                className="bg-white dark:bg-gray-200 dark:text-orange-700 hover:bg-orange-900 hover:text-white duration-200 text-orange-500 text-xs md:text-base font-medium py-1 px-2 md:px-4 cursor-pointer rounded-sm"
              >
                Log Out
              </button>
            </div>
          ) : (
            <Link to={"/login"}>
              <button className="bg-white dark:bg-gray-200 dark:text-orange-700 hover:bg-orange-900 hover:text-white duration-200 text-orange-500 font-bold py-2 px-6 cursor-pointer rounded-sm">
                Log In
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
