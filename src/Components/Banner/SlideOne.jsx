import React from "react";
import SlideImgOne from "../../Images/banner-img-1.avif";
import { Link } from "react-router";
const SlideOne = () => {
  return (
    <div className="w-full dark:bg-gray-900">
      <div className="w-11/12 mx-auto lg:h-[380px] flex flex-col md:flex-row justify-between items-center ">
        <div className="dark:bg-[#828282] p-5 text-center space-y-5 w-full h-full bg-[url(./Images/slide-one-img-c.jpg)] bg-no-repeat bg-contain dark:bg-[url(./Images/slide-one-img-c-d.jpg)] flex flex-col items-center justify-center rounded-lg dark:text-gray-800">
          <h1 className="play pt-10 md:pt-0 text-4xl font-bold text-amber-800 dark:text-amber-400">
            A Feast Fit for Royalty
          </h1>
          <p className="inter text-amber-700 dark:text-amber-200">
            Indulge in the rich flavors and exquisite dishes crafted with care
            and elegance — where every bite tells a story of taste and
            tradition.
          </p>
          <div className="py-5 flex justify-center">
            <Link to={"/allFoods"}>
              <button className="block max-w-sm px-12 py-3 text-center rounded-sm bg-orange-500 dark:bg-orange-800 text-white font-medium hover:bg-orange-800 dark:hover:bg-orange-600 duration-200 text-xl cursor-pointer">
                Browse Foods
              </button>
            </Link>
          </div>
        </div>
        <div className="w-full h-full">
          <img
            className="w-full h-full object-cover rounded-lg"
            src={SlideImgOne}
            alt="Random Food"
          />
        </div>
      </div>
    </div>
  );
};

export default SlideOne;
