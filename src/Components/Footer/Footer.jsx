import React, { useContext } from "react";
import footerLogo from "../../assets/royal-logo.png";
import { Link, NavLink } from "react-router";
import { IoLocation } from "react-icons/io5";
import {
  FaApple,
  FaFacebook,
  FaGooglePlay,
  FaInstagram,
  FaPhoneAlt,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { ThemeContext } from "../../ThemeProvider/ThemeContext";
import { CiYoutube } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const { darkMode } = useContext(ThemeContext);
  const pageLinks = (
    <>
      <NavLink to={"/"}>Home</NavLink>
      <NavLink to={"/allFoods"}>All Foods</NavLink>
      <NavLink to={"/gallery"}>Gallery</NavLink>
    </>
  );
  return (
    <div className="w-full pt-12 pb-8 bg-gradient-to-b from-amber-50 dark:from-amber-950 dark:to-amber-900 to-orange-50 text-amber-800 dark:text-gray-300">
      {/* Footer first Part */}
      <div className="w-11/12 mx-auto flex flex-col md:grid md:grid-cols-2 lg:flex lg:flex-row justify-between items-center pb-10">
        <div className="flex-1 text-center flex flex-col items-center justify-center">
          <div className="w-32 h-32 p-2 rounded-full dark:bg-gray-300">
            <img
              className="w-28 h-28"
              src={footerLogo}
              alt="Royal Bites Logo"
            />
          </div>
          <h1>
            <span className="font-bold play text-lg">Royal Bites</span> – A
            taste of the Indian subcontinent, served with elegance and rich
            tradition. Where every bite tells a story of flavor and finesse.
          </h1>
        </div>
        <div className="flex-1 flex flex-col gap-3 items-center justify-center text-center">
          <h1 className="py-1 font-bold text-xl">Pages</h1>
          {pageLinks}
        </div>
        <div className="flex-1 text-center space-y-2">
          <h1 className="py-1 font-bold text-xl">Contact Us</h1>
          <h1 className="flex flex-col md:flex-row gap-2 items-center justify-center">
            <MdEmail size={30} color="saddlebrown dark:moccasin"></MdEmail>{" "}
            info@royalbites.com
          </h1>
          <h1 className="flex flex-col md:flex-row gap-2 items-center justify-center">
            <FaPhoneAlt size={25} color="saddlebrown dark:moccasin" />{" "}
            +88-01711-140802
          </h1>
          <h1 className="flex flex-col md:flex-row gap-2 items-center justify-center text-center">
            <IoLocation size={30} color="saddlebrown dark:moccasin" />
            Uttara, Dhaka, Bangladesh
          </h1>
        </div>
        <div className="flex-1 flex flex-col justify-center items-center gap-2">
          <h1 className="py-1 font-bold text-xl">Get Our App</h1>

          {/* Google Play Button */}
          <div>
            <Link
              to="https://play.google.com/"
              target="_blank"
              className="flex items-center gap-2 bg-amber-800 text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition"
            >
              <FaGooglePlay size={50} color="saddlebrown dark:moccasin" />
              <div className="text-left text-sm">
                <p className="text-xs">Download on the</p>
                <p className="font-semibold">Google Play</p>
              </div>
            </Link>
          </div>

          {/* Apple Store Button */}
          <div>
            <Link
              href="https://www.apple.com/app-store/"
              target="_blank"
              className="flex items-center gap-2 bg-amber-800 text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition"
            >
              <FaApple size={50} color="saddlebrown dark:moccasin" />
              <div className="text-left text-sm">
                <p className="text-xs">Download on the</p>
                <p className="font-semibold">App Store</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      {/* Second part */}
      <div className="w-11/12 mx-auto">
        <hr />
        <div className="py-1 flex flex-col md:flex-row-reverse items-center justify-between">
          <div>
            <h1 className="text-center font-bold">
            Connect With Us
          </h1>
          <div className="flex justify-center items-center  gap-3 py-2">
            <Link to={"https://www.facebook.com/mirulkhan"} target="_blank">
              <FaFacebook size={25} color={darkMode ? "papayawhip" : "saddlebrown"} />
            </Link>
            <Link to={"https://x.com/"} target="_blank">
              <FaXTwitter size={25} color={darkMode ? "papayawhip" : "saddlebrown"} />
            </Link>
            <Link to={"https://www.instagram.com/mirulkhan/"} target="_blank">
              <FaInstagram size={25} color={darkMode ? "papayawhip" : "saddlebrown"} />
            </Link>
            <Link
              to={"https://www.youtube.com/@mirulmoktadirkhan2127"}
              target="_blank"
            >
              <CiYoutube size={30} color={darkMode ? "papayawhip" : "saddlebrown"} />
            </Link>
          </div>
          </div>
          <h1 className="text-center text-sm">
            © 2025 Royal Bites. All rights reserved.{" "}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Footer;
