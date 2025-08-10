import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthContext";

const Maindash = () => {
  const { userInfo } = useContext(AuthContext);
  const [statLoading, setStatLoading] = useState(true);
  const [foodsLoading, setFoodsLoading] = useState(true);
  const [allFoods, setAllFoods] = useState();
  const [orders, setOrders] = useState();

  useEffect(() => {
    fetch("https://royal-bites-rest-server.vercel.app/foods")
      .then((res) => res.json())
      .then((data) => {
        setAllFoods(data)
        setFoodsLoading(false);
      }
      );

    fetch(
      `https://royal-bites-rest-server.vercel.app/foodOrders?email=${userInfo.email}`,
      {
        headers: {
          Authorization: `Bearer ${userInfo.accessToken}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setStatLoading(false);
      });
  }, [userInfo.accessToken, userInfo.email]);

const myAddedFoods = allFoods?.filter(food => food.userEmail === userInfo.email);
  return (
    <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card title="🍔 Total Foods" value={foodsLoading ? <span className="loading loading-spinner loading-lg"></span> : allFoods?.length} />
      <Card
        title="🛒 Foods Added by You"
        value={statLoading ? <span className="loading loading-spinner loading-lg"></span>: myAddedFoods?.length}
      />
      <Card title="📦 Food Ordered by You" value={statLoading? <span className="loading loading-spinner loading-lg"></span>:orders?.length} />
    </div>
  );
};

const Card = ({ title, value }) => (
  <div className={`bg-white dark:bg-gray-300 p-4 rounded shadow text-center`}>
    <h3 className="text-md font-semibold">{title}</h3>
    <p className={`text-2xl text-orange-500 dark:text-orange-400 font-bold mt-1 inter`}>{value}</p>
  </div>
);

export default Maindash;
