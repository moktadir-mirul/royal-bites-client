import React, { useEffect, useState } from "react";
import { TbCurrencyTaka } from "react-icons/tb";
import { useNavigate, useParams } from "react-router";
import { AuthContext } from "../../AuthProvider/AuthContext";
import LoadingAnimation from "../../Components/Loading/LoadingAnimation";

const FoodDetails = () => {
  const [food, setFood] = useState([]);
  const [detailsLoading, setDetailsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://royal-bites-rest-server.vercel.app/foods/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFood(data);
        setDetailsLoading(false);
      });
    document.title = "Details | Royal Bites";
  }, [id]);

  if (detailsLoading) {
    return <LoadingAnimation></LoadingAnimation>;
  }

  return (
    <div className="p-10 bg-orange-50 dark:bg-gray-900">
      <div className="max-w-3xl w-full mx-auto rounded-2xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg duration-300">
        {/* Image */}
        <div className="w-full h-80 sm:h-80 md:h-96 overflow-hidden">
          <img
            src={food?.imageUrl}
            alt={food?.foodName}
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Text Area */}
        <div className="p-6 bg-white dark:bg-gray-700 space-y-4">
          <h2 className="play text-2xl font-bold text-orange-500 dark:text-white">
            {food?.foodName}
          </h2>

          <p className="text-gray-900 dark:text-gray-300 text-sm">
            Description:{" "}
            <span className="text-base font-medium">
              {food?.briefDescription}
            </span>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-600 dark:text-gray-300 text-sm">
            <p className="text-sm text-gray-900 dark:text-gray-300">
              Category:{" "}
              <span className="text-base font-medium capitalize">
                {food.foodCategory}
              </span>
            </p>
            <p className="text-sm text-gray-900 dark:text-gray-300">
              Origin:{" "}
              <span className="text-base font-medium">
                {food.foodOriginCountry}
              </span>
            </p>
            <p className="text-sm text-gray-900 dark:text-gray-300">
              Total Quantity:{" "}
              <span className="inter text-base font-bold">
                {food.originalQuantity}
              </span>
            </p>
            <p className="text-sm text-gray-900 dark:text-gray-300">
              Available Quantity:{" "}
              <span className="inter text-base font-bold">{food.quantity}</span>
            </p>
            <p className="text-sm font-medium text-orange-500 dark:text-orange-300 flex items-center">
              Price: <TbCurrencyTaka size={20}></TbCurrencyTaka>
              <span className=" text-base font-bold">{food.price}</span>
            </p>
            <p className="text-base text-gray-900 dark:text-gray-300">
              Purchase Count:{" "}
              <span className="text-lg font-bold">{food.purchaseCount}</span>
            </p>
            <p className="text-sm text-gray-900 dark:text-gray-300">
              Added By:{" "}
              <span className="text-base font-medium capitalize">
                {food.addedBy}
              </span>
            </p>
            <p className="text-sm text-gray-900 dark:text-gray-300">
              Email:{" "}
              <span className="text-base font-medium">{food.userEmail}</span>
            </p>
          </div>

          <button
            onClick={() => navigate(`/purchaseFood/${food._id}`)}
            className="w-full mt-3 px-5 py-3 rounded-lg bg-orange-500 dark:bg-orange-800 text-white font-medium hover:bg-orange-800 dark:hover:bg-orange-600 transition duration-300 cursor-pointer"
          >
            Purchase
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
