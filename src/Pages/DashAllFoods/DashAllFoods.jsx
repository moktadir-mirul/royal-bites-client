import React, { useContext, useEffect, useState } from "react";
import { TbCurrencyTaka } from "react-icons/tb";
import { Link } from "react-router";
import { AuthContext } from "../../AuthProvider/AuthContext";
import LoadingAnimation from "../../Components/Loading/LoadingAnimation";

const DashAllFoods = () => {
  const { foods, setFoods } = useContext(AuthContext);
  const [allFoodsLoading, setAllFoodsLoading] = useState(true);


  useEffect(() => {
    const url = "https://royal-bites-rest-server.vercel.app/foods";
    fetch(`${url}`)
      .then((res) => res.json())
      .then((data) => {
        setFoods(data);
        setAllFoodsLoading(false);
      });

    document.title = "All Food | Royal Bites";
  }, [setFoods]);

  if (allFoodsLoading) {
    return <LoadingAnimation></LoadingAnimation>;
  }

  return (
    <div className="w-full bg-[url(./Images/footer-bg.png)] dark:bg-gray-900">
      <div className="pb-5 w-11/12 mx-auto">
        <h2 className="play text-4xl lg:text-5xl font-bold py-5 text-center dark:text-white">
          All <span className="text-orange-500 dark:text-amber-500">Foods</span>
        </h2>
        {/* <div className="pt-8 pb-2 text-black flex justify-center">
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
      </div> */}
        {foods <= 0 ? (
          <h2 className="play text-4xl lg:text-5xl font-bold pt-10 text-center text-red-500 dark:text-white">
            No food items found! Try searching again!
          </h2>
        ) : (
          <div className="overflow-x-auto rounded-2xl shadow-lg">
            <table className="min-w-full mx-auto bg-white text-sm text-center text-gray-600">
              <thead className="bg-orange-500 dark:bg-orange-700 text-white text-lg">
                <tr>
                  <th className="px-6 py-2 text-left">Image</th>
                  <th className="px-6 py-2">Food Name</th>
                  <th className="px-6 py-2">Category</th>
                  <th className="px-6 py-2">Price</th>
                  <th className="px-6 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {foods?.map((food, idx) => (
                  <tr
                    key={food._id}
                    className={`hover:bg-orange-100 transition ${
                      idx % 2 === 0
                        ? "bg-white dark:bg-gray-300"
                        : "bg-orange-50 dark:bg-gray-400"
                    }`}
                  >
                    <td className="px-6 py-4">
                      <img
                        src={food.imageUrl}
                        alt={food.foodName}
                        className="w-24 h-20 object-cover rounded-xl"
                      />
                    </td>
                    <td className="px-6 py-4 font-bold text-xl text-black">
                      {food.foodName}
                    </td>
                    <td className="px-6 py-4 font-medium text-black text-lg capitalize">
                      {food.foodCategory}
                    </td>
                    <td className="px-6 py-4 font-medium text-lg text-black">
                      {food.price}
                    </td>
                    <td className="px-6 py-4">
                      <Link to={`/dashboard/details/${food._id}`}>
                        <button className="px-6 py-2 bg-orange-500 dark:bg-orange-700 text-white rounded-lg hover:bg-green-800 font-bold text-sm transition cursor-pointer">
                          See More
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashAllFoods;
