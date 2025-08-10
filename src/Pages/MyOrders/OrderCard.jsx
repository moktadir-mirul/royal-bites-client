import React from "react";
import { MdDelete } from "react-icons/md";
import { TbCurrencyTaka } from "react-icons/tb";

const OrderCard = ({ order, idx, handleOrderDelete }) => {
  return (
    <div
      className={`flex flex-col md:flex-row ${
        idx % 2 !== 0 ? "md:flex-row-reverse" : ""
      } justify-between items-center border shadow-lg border-gray-200 dark:border-gray-600 rounded-xl`}
    >
      {/* Text Area */}
      <div className="w-full h-[380px] bg-white dark:bg-gray-700 rounded-xl text-black dark:text-white p-5 flex flex-col justify-between">
        <h1 className="text-2xl font-bold play text-orange-500">
          {order.foodName}
        </h1>
        <p>
          Quantity : <span className="font-bold inter">{order.quantity}</span>
        </p>
        <p className="flex items-center">
          Price : <TbCurrencyTaka></TbCurrencyTaka>
          <span className="font-bold">{order.price}</span>
        </p>
        <p>
          Food Owner : <span className="font-bold">{order.addedBy}</span>
        </p>
        <p>Date: {order.buyingDate.split("T")[0]}</p>
        <p>Time: {order.buyingDate.split("T")[1]}</p>
        <div>
          <button
            onClick={() => handleOrderDelete(order._id)}
            className='className="w-full mt-2 px-4 py-2 bg-red-500 dark:bg-orange-800 text-white font-bold rounded-lg hover:scale-105 hover:bg-red-800 dark:hover:bg-orange-700 transition duration-200 cursor-pointer flex items-center justify-center gap-2"'
          >
            <MdDelete></MdDelete> Delete
          </button>
        </div>
      </div>

      {/* Image Area */}
      <div className="w-full h-full overflow-hidden">
        <img
          className="w-full h-full rounded-xl object-cover object-center"
          src={order.imageUrl}
          alt={order.foodName}
        />
      </div>
    </div>
  );
};

export default OrderCard;
