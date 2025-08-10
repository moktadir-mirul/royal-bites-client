import React from "react";
import errorImage from "../../assets/error.avif";
import { Link } from "react-router";
const Error = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div>
        <img
          className="w-full h-[250px] md:h-[350px]"
          src={errorImage}
          alt="Error 404"
        />
      </div>
      <div>
        <Link to={"/"}>
          <button className="bg-orange-700 dark:bg-orange-800 dark:text-gray-100 hover:bg-amber-900 duration-200 text-white font-bold py-2 px-6 cursor-pointer rounded-sm">
            Go Back Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Error;
