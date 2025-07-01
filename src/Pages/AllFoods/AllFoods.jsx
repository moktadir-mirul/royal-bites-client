import React, { useContext, useEffect, useState } from "react";
import { TbCurrencyTaka } from "react-icons/tb";
import { Link } from "react-router";
import { AuthContext } from "../../AuthProvider/AuthContext";
import LoadingAnimation from "../../Components/Loading/LoadingAnimation";

const AllFoods = () => {
  const { foods, setFoods } = useContext(AuthContext);
  const [allFoodsLoading, setAllFoodsLoading] = useState(true);
  const [searchFood, setSearchFood] = useState("");


  useEffect(() => {
    const url = "https://royal-bites-rest-server.vercel.app/foods"
    fetch(`${url}?searchParams=${searchFood}`)
      .then((res) => res.json())
      .then((data) => {
        setFoods(data);
        setAllFoodsLoading(false);
      });
    
    document.title = "All Food | Royal Bites";
  }, [setFoods, searchFood]);

  if (allFoodsLoading) {
    return <LoadingAnimation></LoadingAnimation>;
  }

  return (
    <div className="w-full bg-[url(./Images/footer-bg.png)] dark:bg-gray-900">
      <h2 className="play text-4xl lg:text-5xl font-bold pt-10 text-center dark:text-white">
        All <span className="text-orange-500 dark:text-amber-500">Foods</span>
      </h2>
      <div className="pt-8 pb-2 text-black flex justify-center">
        <label className="input bg-white dark:bg-gray-300">
          <svg
            className="h-[1em] opacity-50 "
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="black"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            onChange={(e) => setSearchFood(e.target.value)}
            placeholder="Search by Food Name"
            className="dark:bg-gray-300 dark:border-white "
          />
        </label>
      </div>
      {foods <= 0 ? (
        <h2 className="play text-4xl lg:text-5xl font-bold pt-10 text-center text-red-500 dark:text-white">
          No food items found! Try searching again!
        </h2>
      ) : (
        ""
      )}
      <div className="w-11/12 mx-auto pt-2 pb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {foods.map((food) => (
          <div
            key={food._id}
            className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-600 shadow-lg bg-white dark:bg-gray-800 transition transform hover:shadow-orange-500 dark:hover:shadow-orange-800 duration-300"
          >
            {/* Image */}
            <div className="w-full h-56 overflow-hidden">
              <img
                src={food.imageUrl}
                alt={food.foodName}
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Text Area */}
            <div className="p-5 bg-white dark:bg-gray-700 flex flex-col justify-between md:h-[320px]">
              <h2 className="play text-2xl font-bold text-gray-800 dark:text-white">
                {food.foodName}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 capitalize">
                Category:{" "}
                <span className="text-base font-medium">
                  {food.foodCategory}
                </span>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Origin:{" "}
                <span className="text-base font-medium">
                  {food.foodOriginCountry}
                </span>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Available Quantity:{" "}
                <span className="inter text-base font-bold">
                  {food.quantity}
                </span>
              </p>
              <p className="text-lg font-extrabold text-gray-900 dark:text-orange-300 flex gap-1 items-center">
                <TbCurrencyTaka size={25}></TbCurrencyTaka>
                <span>{food.price}</span>
              </p>

              <Link to={`/details/${food._id}`}>
                <button className="w-full mt-2 px-4 py-2 bg-orange-500 dark:bg-orange-800 text-white font-medium rounded-lg hover:scale-105 hover:bg-orange-800 dark:hover:bg-orange-700 transition duration-200 cursor-pointer">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllFoods;
