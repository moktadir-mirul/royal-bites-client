import React, { useContext, useEffect, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { Link } from "react-router";
import { AuthContext } from "../../AuthProvider/AuthContext";
import LoadingAnimation from "../../Components/Loading/LoadingAnimation";
import { TbCurrencyTaka } from "react-icons/tb";

const MyFoods = () => {
  const { foods, setFoods, userInfo } = useContext(AuthContext);

  const [myFoodsLoading, setMyFoodsLoading] = useState(true);

  useEffect(() => {
    fetch(`https://royal-bites-rest-server.vercel.app/foods?email=${userInfo.email}`, {
      headers: {
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setFoods(data);
        setMyFoodsLoading(false);
      });
  }, [setFoods, userInfo.email, userInfo.accessToken]);

  if (myFoodsLoading) {
    return <LoadingAnimation></LoadingAnimation>;
  }

  if (foods.length <= 0) {
    return (
      <div className="p-10 bg-orange-50 dark:bg-gray-900">
        <h2 className="play text-4xl lg:text-5xl font-bold pt-10 text-center text-black dark:text-white">
          You haven't added any foods yet!
        </h2>
        <div className="flex justify-center py-10">
          <Link to={"/addFood"}>
            <button className="max-w-sm mt-2 px-9 py-2 bg-orange-500 dark:bg-orange-800 text-white font-medium rounded-lg hover:scale-105 hover:bg-orange-800 dark:hover:bg-orange-700 transition duration-200 cursor-pointer">
              Add Food
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 bg-orange-50 dark:bg-gray-900">
      <h2 className="play text-4xl lg:text-5xl font-bold pt-5 text-center dark:text-white">
        My <span className="text-orange-500 dark:text-amber-500">Foods</span>
      </h2>
      <div className="w-11/12 mx-auto py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {foods.map((food) => (
          <div
            key={food._id}
            className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-600 shadow-lg bg-white dark:bg-gray-800 duration-300"
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
            <div className="p-5 bg-white dark:bg-gray-700 space-y-3">
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
                Total Quantity:{" "}
                <span className="inter text-base font-bold">
                  {food.originalQuantity}
                </span>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Available Quantity:{" "}
                <span className="inter text-base font-bold">
                  {food.quantity}
                </span>
              </p>
              <p className="text-lg font-extrabold text-gray-900 dark:text-orange-300 flex items-center ">
                <TbCurrencyTaka size={25}></TbCurrencyTaka>{" "}
                <span>{food.price}</span>
              </p>

              <Link to={`/updateFood/${food._id}`}>
                <button className="w-full mt-2 px-4 py-2 bg-orange-500 dark:bg-orange-800 text-white font-bold rounded-lg hover:scale-105 hover:bg-orange-800 dark:hover:bg-orange-700 transition duration-200 cursor-pointer flex items-center justify-center gap-2">
                  <MdModeEdit size={20}></MdModeEdit>Update Food
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyFoods;
