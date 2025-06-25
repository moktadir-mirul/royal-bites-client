import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../ThemeProvider/ThemeContext";
import { AuthContext } from "../../AuthProvider/AuthContext";
import moment from "moment";
import { Link, useLoaderData, useNavigate } from "react-router";
import { toast } from "react-toastify";


const PurchaseFood = () => {
    const currentTime = moment().format("YYYY-MM-DD");
    // THH:mm:ss

  const { userInfo } = useContext(AuthContext);

  const [foodQuantity, setFoodQuantity] = useState(1);
  const [qunatityError, setQuantityError] = useState("");
  const [buyDate, setBuyDate] = useState(currentTime);

  const purchasingFood = useLoaderData();

  const naviagate = useNavigate();


  const { darkMode } = useContext(ThemeContext);
  useEffect(() => {
    document.title = "Purchase Food | Royal Bites";
  }, [])

  if (userInfo.email === purchasingFood.userEmail) {
    return (
      // <div className="w-full bg-[url(./Images/footer-bg.png)] dark:bg-gray-900">
      <div className={`w-full bg-[url(./Images/add-bg.jpg)] dark:bg-[url(./Images/add-food-d.jpg)] bg-no-repeat bg-cover`}>
        <div className={`flex flex-col justify-center py-10 ${darkMode ? "form-bg-d" : "form-bg"}`}>
          <h1 className="play py-5 arap text-center font-bold text-4xl text-red-500 dark:text-orange-300">
            Sorry, you can't buy this food as you added this food!
          </h1>
          <Link to={"/allFoods"}>
            <div className="flex justify-center">
              <button
              className="my-4 block max-w-sm px-9 py-3 text-center rounded-sm bg-orange-500 dark:bg-orange-800 text-white hover:bg-orange-800 dark:hover:bg-orange-600 transition duration-300 text-xl font-bold cursor-pointer"
            >
              Buy Some Other Food
            </button>
            </div>
          </Link>
        </div>
      </div>
    );
  }


  const handleFoodQuantity = (e) => {
    setQuantityError("");
    const actualQuantity = purchasingFood.quantity;
    const orderQuantity = e.target.value;
    if (orderQuantity <= 0) {
      setQuantityError("You need to buy at least one!")
    }
    else if(orderQuantity > actualQuantity) {
      setQuantityError("You can't buy more than the actual quantity!")
    } else if (orderQuantity <= actualQuantity) {
      setQuantityError("");
      setFoodQuantity(orderQuantity);
  }
  };

  const handlePurchaseFood = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const purchaseData = Object.fromEntries(formData.entries());
    if(qunatityError) {
      return setQuantityError("Please select a valid quantity first!")
    }
    if(!qunatityError) {
      purchaseData.imageUrl = purchasingFood.imageUrl;
      purchaseData.buyingDate = moment().format("YYYY-MM-DDTHH:mm");
      purchaseData.foodId = purchasingFood._id;
      fetch("https://royal-bites-rest-server.vercel.app/foodOrders", {
        method: "POST",
        headers: {
          "content-type" : "application/json",
          'Authorization' : `Bearer ${userInfo.accessToken}`
        },
        body: JSON.stringify(purchaseData)
      })
      .then(res => res.json())
      .then(data => {
        if(data.insertedId) {
          toast.success("Order placed successfully!");
          form.reset();
          naviagate("/myOrders")
        }
      })
    }
  };

  return (
    <div className="w-full min-h-screen bg-[url(./Images/add-bg.jpg)] dark:bg-[url(./Images/add-food-d.jpg)] bg-no-repeat bg-cover">
      <div className="flex justify-center py-10">
        <div
          className={`card w-11/12 mx-auto ${
            darkMode ? "form-bg-d" : "form-bg"
          } shrink-0 shadow-xl`}
        >
          <div className="card-body">
            {
              purchasingFood.quantity <= 0 ? <h1 className="play pb-2 arap text-center font-bold text-4xl text-red-500 dark:text-orange-300">
              Sorry, this item is not available right now!!!
            </h1> : ""
            }
            <h1 className="play pb-2 arap text-center font-bold text-4xl text-orange-500 dark:text-gray-300">
              Purchase Food
            </h1>
            <form onSubmit={handlePurchaseFood}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* name input */}
                <div className="fieldset">
                  <label className="label text-orange-500 font-bold dark:text-gray-300 text-lg">
                    Food Name
                  </label>
                  <input
                    name="foodName"
                    defaultValue={purchasingFood.foodName}
                    type="text"
                    className="input w-full text-black dark:bg-gray-900 dark:text-gray-300 dark:focus:outline-gray-300 text-lg"
                    placeholder="Food Name"
                    required
                  />
                </div>

                {/* Food Quantity */}
                <div className="fieldset">
                  <label className="label text-lg text-orange-500 font-bold dark:text-gray-300">
                    Quantity {`(Available Quantity: ${purchasingFood.quantity})`}
                  </label>
                  <input
                    name="quantity"
                    defaultValue={foodQuantity}
                    onChange={handleFoodQuantity}
                    type="number"
                    className="input text-black dark:bg-gray-900 dark:text-gray-300 dark:focus:outline-gray-300 w-full text-lg"
                    placeholder="Food Quantity"
                    required
                  />
                  <p className="text-sm font-medium text-red-500 dark:text-orange-400">
                    {qunatityError}
                  </p>
                </div>

                {/* Price */}
                <div className="fieldset">
                  <label className="label text-lg text-orange-500 font-bold dark:text-gray-300">
                    Price <span className="text-red-500 dark:text-amber-400">(Only Amount)</span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    defaultValue={purchasingFood.price}
                    className="input text-black dark:bg-gray-900 dark:text-gray-300 dark:focus:outline-gray-300 w-full text-lg"
                    placeholder="Price"
                    required
                  />
                </div>

                {/* Buying Date */}
                <div className="fieldset">
                  <label className="label text-lg text-orange-500 font-bold dark:text-gray-300">
                    Buying Date
                  </label>
                  <input
                    type="date"
                    name="buyingDate"
                    value={buyDate}
                    onChange={(e) => setBuyDate(e.target.value)}
                    className="input text-black dark:bg-gray-900 dark:text-gray-300 dark:focus:outline-gray-300 w-full text-lg"
                    placeholder="Buying Date"
                    required
                  />
                </div>
              </div>
              {/* Grid input ends */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* User name */}
                <div className="fieldset">
                  <label className="label text-lg text-orange-500 font-bold dark:text-gray-300">
                    Buyer Name
                  </label>
                  <input
                    name="addedBy"
                    type="text"
                    readOnly
                    value={userInfo.displayName || ""}
                    className="input text-black dark:bg-gray-900 dark:text-gray-300 dark:focus:outline-gray-300 w-full text-lg"
                    placeholder="Buyer Name"
                    required
                  />
                </div>

                {/* User Email */}
                <div className="fieldset">
                  <label className="label text-lg text-orange-500 font-bold dark:text-gray-300">
                    User Email
                  </label>
                  <input
                    name="userEmail"
                    type="email"
                    readOnly
                    value={userInfo.email || ""}
                    className="input text-black dark:bg-gray-900 dark:text-gray-300 dark:focus:outline-gray-300 w-full text-lg"
                    placeholder="Buyer Email"
                    required
                  />
                </div>
              </div>

              {/* Input field ends */}

              {
                purchasingFood.quantity <= 0 ? <button
                type="submit"
                className="my-4 block w-full p-3 text-center rounded-sm bg-orange-500 dark:bg-orange-800 text-white hover:bg-orange-800 dark:hover:bg-orange-600 transition duration-300 text-xl font-bold btn btn-disabled cursor-not-allowed"
              >
                Purchase Food
              </button> : <button
                type="submit"
                className="my-4 block w-full p-3 text-center rounded-sm bg-orange-500 dark:bg-orange-800 text-white hover:bg-orange-800 dark:hover:bg-orange-600 transition duration-300 text-xl font-bold cursor-pointer"
              >
                Purchase Food
              </button>
              }
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseFood;
