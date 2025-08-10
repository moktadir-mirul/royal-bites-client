import React, { useContext, useEffect, useState } from "react";

import LoadingAnimation from "../../Components/Loading/LoadingAnimation";
import OrderCard from "./OrderCard";
import { AuthContext } from "../../AuthProvider/AuthContext";
import { toast } from "react-toastify";
import { Link } from "react-router";

const MyOrders = () => {
  const { userInfo } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  useEffect(() => {
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
        setOrdersLoading(false);
      });
  }, [userInfo.email, userInfo.accessToken]);

  const handleOrderDelete = (id) => {
    fetch(`https://royal-bites-rest-server.vercel.app/foodOrders/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount) {
          const fiteredData = orders.filter((order) => order._id !== id);
          setOrders(fiteredData);
          toast("Order Deleted Successfully!");
        }
      })
      .catch((err) => toast.error(err.message));
  };

  if (ordersLoading) {
    return <LoadingAnimation></LoadingAnimation>;
  }

  if (orders.length <= 0) {
    return (
      <div className="p-10 bg-orange-50 dark:bg-gray-900">
        <h2 className="play text-4xl lg:text-5xl font-bold pt-10 text-center text-black dark:text-white">
          You haven't placed any orders yet!
        </h2>
        <div className="flex justify-center py-10">
          <Link to={"/allFoods"}>
            <button className="max-w-sm mt-2 px-9 py-2 bg-orange-500 dark:bg-orange-800 text-white font-medium rounded-lg hover:scale-105 hover:bg-orange-800 dark:hover:bg-orange-700 transition duration-200 cursor-pointer">
              Buy Food
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 bg-orange-50 dark:bg-gray-900">
      <h2 className="play text-4xl lg:text-5xl font-bold pt-5 text-center dark:text-white">
        My <span className="text-orange-500 dark:text-amber-500">Orders</span>
      </h2>
      <div className="w-11/12 mx-auto py-10 grid grid-cols-1 md:grid-cols-2 gap-5">
        {orders.map((order, idx) => (
          <OrderCard
            key={order._id}
            order={order}
            idx={idx}
            handleOrderDelete={handleOrderDelete}
          ></OrderCard>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
