import React, { useContext, useEffect, useState } from "react";
import { TbCurrencyTaka } from "react-icons/tb";
import { Link } from "react-router";
import { AuthContext } from "../../AuthProvider/AuthContext";
import LoadingAnimation from "../Loading/LoadingAnimation";

const TopSelling = () => {

  const { foods, setFoods } = useContext(AuthContext);
  const [ sellingFoods, setSellingFoods] = useState(true); 

  useEffect(() => {
    fetch("https://royal-bites-rest-server.vercel.app/foods")
      .then((res) => res.json())
      .then((data) => {
        setFoods(data);
        setSellingFoods(false);
      });
  }, [setFoods]);

  const sortedFoods = foods.slice().sort((a, b) => {
    return b.purchaseCount - a.purchaseCount;
  })

  if (sellingFoods) {
    return <LoadingAnimation></LoadingAnimation>;
  }

  return (
    <div className="w-full dark:bg-gray-900">
      <h2 className="play text-3xl sm:text-4xl font-bold pt-16 text-center dark:text-white">
        Top Selling{" "}
        <span className="text-orange-500 dark:text-amber-500">Foods</span>
      </h2>
      <div className="w-11/12 mx-auto py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {sortedFoods.slice(0, 8).map((food) => (
          <div
            key={food._id}
            className="rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-slate-100 to-white dark:from-gray-800 dark:to-gray-700 duration-300 border border-gray-200 dark:border-gray-600"
          >
            {/* Image Section */}
            <div className="w-full h-56 overflow-hidden">
              <img
                src={food.imageUrl}
                alt={food.foodName}
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Text Section */}
            <div className="p-5 bg-white dark:bg-gray-700 space-y-2 flex flex-col items-center md:items-start md:h-[250px] justify-between">
              <h2 className="text-2xl play font-semibold text-gray-800 dark:text-white">
                {food.foodName}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 capitalize">
                Category:{" "}
                <span className="text-base font-medium">
                  {food.foodCategory}
                </span>
              </p>
              <p className="text-lg font-bold text-gray-900 dark:text-orange-300 flex gap-1 items-center">
                <TbCurrencyTaka size={25}></TbCurrencyTaka>
                <span>{food.price}</span>
              </p>

              <Link to={`/details/${food._id}`}>
                <button className="mt-3 px-4 py-2 bg-orange-500 dark:bg-orange-800 text-white rounded-lg hover:bg-orange-600 dark:hover:bg-orange-700 duration-200 hover:scale-105 transform transition cursor-pointer">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="py-5 flex justify-center">
        <Link to={"/allFoods"}>
          <button className="block max-w-sm px-12 py-3 text-center rounded-sm bg-orange-500 dark:bg-orange-800 text-white font-medium hover:bg-orange-800 dark:hover:bg-orange-600 duration-200 text-xl cursor-pointer">
            Show All
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TopSelling;
