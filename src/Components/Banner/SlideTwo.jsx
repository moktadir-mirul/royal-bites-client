import React from "react";
import slideImg from "../../Images/slideImg-two-c.jpg";
import { Link } from "react-router";

const SlideTwo = () => {
  return (
    // <div className="w-full dark:bg-gray-700">
    //   <div className="slide-2 bg-no-repeat bg-cover w-11/12 mx-auto h-[450px] flex flex-col md:flex-row justify-center items-center text-center bg-[url(./Images/slide-one-bg.jpg)] dark:bg-[url(./Images/slideTwo-img-sd.jpg)] md:bg-[url(./Images/slideTwo-img.jpg)] dark:md:bg-[url(./Images/slideTwo-img-d.jpg)]">
    //   <div className="flex-4/12 md:flex-1"></div>
    //   <div className="flex-8/12 md:flex-1 space-y-5 p-1">
    //     <h1 className="play font-bold text-amber-900 text-4xl">Savor the Royal Experience</h1>
    //     <p className="font-semibold md:text-amber-800">At Royal Bites, we blend classic recipes with modern flair to deliver a dining experience that’s both comforting and unforgettable.</p>
    //   </div>
    //   </div>
    // </div>
    <div className="w-full dark:bg-gray-900">
      <div className="w-11/12 mx-auto lg:h-[450px] flex flex-col md:flex-row-reverse justify-between items-center ">
        <div className="dark:bg-[#828282] p-5 text-center space-y-5 w-full h-full bg-[url(./Images/slide-one-img-c.jpg)] bg-no-repeat bg-contain dark:bg-[url(./Images/slide-one-img-c-d.jpg)] flex flex-col items-center justify-center rounded-lg dark:text-gray-800">
          <h1 className="play pt-10 md:pt-0 text-4xl font-bold text-amber-800 dark:text-amber-400">
            Savor the Royal Experience
          </h1>
          <p className="inter text-amber-700 dark:text-amber-200">
            At Royal Bites, we blend classic recipes with modern flair to
            deliver a dining experience that’s both comforting and
            unforgettable.
          </p>
          <div className="py-5 flex justify-center">
            <Link to={"/allFoods"}>
              <button className="block max-w-sm px-12 py-3 text-center rounded-sm bg-orange-500 dark:bg-orange-800 text-white font-medium hover:bg-orange-800 dark:hover:bg-orange-600 duration-200 text-xl cursor-pointer">
                View Foods
              </button>
            </Link>
          </div>
        </div>
        <div className="w-full h-full">
          <img
            className="w-full h-full object-cover rounded-lg"
            src={slideImg}
            alt="Random Food"
          />
        </div>
      </div>
    </div>
  );
};

export default SlideTwo;
