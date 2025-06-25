import React, { useContext } from "react";
import mainLogo from "../../assets/royal-logo.png";
import { Link, NavLink } from "react-router";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import { ThemeContext } from "../../ThemeProvider/ThemeContext";
import { AuthContext } from "../../AuthProvider/AuthContext";
import { toast } from "react-toastify";

const NavBar = () => {
  const { darkMode } = useContext(ThemeContext);
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
    </>
  );

  const myLinks = <>
  <NavLink className="py-2 px-2" to={"/myFoods"}>My Foods</NavLink>
  <NavLink className="py-2 px-2" to={"/addFood"}>Add Food</NavLink>
  <NavLink className="py-2 px-2" to={"/myOrders"}>My Orders</NavLink>
  </>
  return (
    <div className="w-full dark:bg-gray-900">
      <div className="navbar w-11/12 mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke={darkMode ? "white" : "black"}
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
              className="menu menu-sm dropdown-content bg-white border border-gray-400 dark:bg-gray-900 dark:text-gray-200 rounded-box z-1 mt-3 w-28 p-2 shadow flex flex-col items-start gap-3 font-bold"
            >
              {pageLinks}
            </ul>
          </div>
          <div className="flex flex-col md:flex-row gap-1 items-center justify-center">
            <div className="w-20 h-20 p-2 rounded-full bg-white dark:bg-gray-300">
              <img
                className="w-16 h-16"
                src={mainLogo}
                alt="Royal Bites Logo"
              />
            </div>
            <h1 className="hidden md:block play font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-amber-700 dark:from-amber-400 dark:to-amber-600 to-violet-700">
              Royal Bites
            </h1>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 flex gap-5 font-bold dark:text-gray-200">
            {pageLinks}
          </ul>
        </div>
        <div className="navbar-end space-x-4">
          <DarkModeToggle></DarkModeToggle>
          {userInfo ? (
            <div className="flex flex-col md:flex-row justify-center items-center gap-3">
              <div className="dropdown dropdown-bottom dropdown-center">
                <img
                  role="button"
                  tabIndex={0}
                  className="w-16 h-16 rounded-full ring ring-orange-500 dark:ring-amber-800"
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
                className="bg-orange-500 dark:bg-orange-800 dark:text-gray-100 hover:bg-amber-950 duration-200 text-white font-bold py-2 px-6 cursor-pointer rounded-sm"
              >
                Log Out
              </button>
            </div>
          ) : (
            <Link to={"/login"}>
              <button className="bg-orange-500 dark:bg-orange-800 dark:text-gray-100 hover:bg-amber-950 duration-200 text-white font-bold py-2 px-6 cursor-pointer rounded-sm">
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
