import React, { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../../ThemeProvider/ThemeContext";
import { AuthContext } from "../../AuthProvider/AuthContext";
import { toast } from "react-toastify";
import { animate, inView } from "motion";


const AddFood = () => {
  const { darkMode } = useContext(ThemeContext);
  const {userInfo} = useContext(AuthContext);

  const [foodCategory, setFoodCategory] = useState("");
  const [addQuantity, setAddQuantity] = useState(1);
  const [addPrice, setAddPrice] = useState(1);

  const addRef = useRef();  
  useEffect(() => {
    inView(addRef.current, () => {
      animate(
        addRef.current,
        { y: [500, 0], opacity: [0, 1] },
        { duration: 0.9, easing: "ease-out" }
      );
    });
    document.title = "Add Food | Royal Bites";
  }, [])
  
  const handleAddFood = (e) => {
    e.preventDefault();
    const form = e.target;
    const formdata = new FormData(form);
    const newFoodData = Object.fromEntries(formdata.entries());
    newFoodData.quantity = Number(newFoodData.quantity);
    newFoodData.price = Number(newFoodData.price);
    newFoodData.purchaseCount = 0;
    newFoodData.originalQuantity = newFoodData.quantity;

     fetch("https://royal-bites-rest-server.vercel.app/foods", {
      method: "POST",
      headers:{
        "content-type" : "application/json",
        'Authorization' : `Bearer ${userInfo.accessToken}`
      },
      body: JSON.stringify(newFoodData)
     })
     .then(res => res.json())
     .then((data) => {
      if(data.insertedId) {
        toast.success("Food added to the database successfully!");
        setAddPrice(1);
        setAddQuantity(1);
        setFoodCategory("");
        form.reset();
      }
     })
     .catch(err => toast.error(err.message))
  };
  return (
    <div className="w-full bg-[url(./Images/add-bg.jpg)] dark:bg-[url(./Images/add-food-d.jpg)] bg-no-repeat bg-cover">
      <div className="flex justify-center py-10">
        <div
        ref={addRef}
          className={`card w-11/12 mx-auto ${
            darkMode ? "form-bg-d" : "form-bg"
          } shrink-0 shadow-xl`}
        >
          <div className="card-body">
            <h1 className="play pb-2 arap text-center font-bold text-4xl text-orange-500 dark:text-gray-300">
              Add Food
            </h1>
            <form onSubmit={handleAddFood}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* name input */}
                <div className="fieldset">
                  <label className="label text-orange-500 font-bold dark:text-gray-300 text-lg">
                    Food Name
                  </label>
                  <input
                    name="foodName"
                    type="text"
                    className="input w-full text-black dark:bg-gray-900 dark:text-gray-300 dark:focus:outline-gray-300 text-lg"
                    placeholder="Food Name"
                    required
                  />
                </div>

                {/* image url */}
                <div className="fieldset">
                  <label className="label text-orange-500 font-bold dark:text-gray-300 text-lg">
                    Food Image URL
                  </label>
                  <input
                    name="imageUrl"
                    type="text"
                    className="input text-black dark:bg-gray-900 dark:text-gray-300 dark:focus:outline-gray-300 w-full text-lg"
                    placeholder="Food Image URL"
                    required
                  />
                </div>

                {/* food category */}
                <div className="fieldset relative">
                  <label
                    htmlFor="cat-options"
                    className="label text-orange-500 font-bold dark:text-gray-300 text-lg"
                  >
                    Select Food Category
                  </label>
                  <select
                    id="cat-options"
                    name="foodCategory"
                    value={foodCategory}
                    onChange={(e) => setFoodCategory(e.target.value)}
                    className="input w-full text-lg rounded-md shadow-sm text-black dark:bg-gray-900 dark:text-gray-300 dark:focus:outline-gray-300"
                    required
                  >
                    <option value="" disabled>
                      Select One
                    </option>
                    <option value="bangladeshi">Bangladeshi</option>
                    <option value="indian">indian</option>
                    <option value="noodles">Noodles</option>
                    <option value="burger">Burger</option>
                    <option value="chainese">Chainese</option>
                    <option value="steak">steak</option>
                    <option value="pasta">pasta</option>
                    <option value="sandwich">sandwich</option>
                    <option value="Kebab">Kebab</option>
                  </select>
                  <span className="absolute right-3 top-3/4 transform -translate-y-1/2 text-orange-500 font-bold dark:text-gray-300 pointer-events-none">
                    &#9660;
                  </span>
                </div>

                {/* Food Quantity */}
                <div className="fieldset">
                  <label className="label text-lg text-orange-500 font-bold dark:text-gray-300">
                    Quantity <span className="text-red-500 dark:text-amber-400">(Only Amount)</span>
                  </label>
                  <input
                    name="quantity"
                    type="number"
                    min="1"
                    value={addQuantity}
                    onChange={(e) => setAddQuantity(e.target.value)}
                    className="input text-black dark:bg-gray-900 dark:text-gray-300 dark:focus:outline-gray-300 w-full text-lg"
                    placeholder="Food Quantity"
                    required
                  />
                </div>

                {/* Price */}
                <div className="fieldset">
                  <label className="label text-lg text-orange-500 font-bold dark:text-gray-300">
                    Price <span className="text-red-500 dark:text-amber-400">(Only Amount)</span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={addPrice}
                    onChange={(e) => setAddPrice(e.target.value)}
                    min="1"
                    className="input text-black dark:bg-gray-900 dark:text-gray-300 dark:focus:outline-gray-300 w-full text-lg"
                    placeholder="Price"
                    required
                  />
                </div>

                {/* Origin */}
                <div className="fieldset">
                  <label className="label text-lg text-orange-500 font-bold dark:text-gray-300">
                    Food Origin
                  </label>
                  <input
                    type="text"
                    name="foodOriginCountry"
                    className="input text-black dark:bg-gray-900 dark:text-gray-300 dark:focus:outline-gray-300 w-full text-lg"
                    placeholder="Country of the origin"
                    required
                  />
                </div>
              </div>
              {/* Grid input ends */}

              {/* Description */}
              <div className="fieldset">
                <label className="label text-lg text-orange-500 font-bold dark:text-gray-300">
                  Description
                </label>
                <textarea
                  placeholder="A brief description of the food"
                  name="briefDescription"
                  className="w-full textarea textarea-lg text-black dark:bg-gray-900 dark:text-gray-300 dark:focus:outline-gray-300"
                  required
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* User name */}
                <div className="fieldset">
                  <label className="label text-lg text-orange-500 font-bold dark:text-gray-300">
                    User Name
                  </label>
                  <input
                    name="addedBy"
                    type="text"
                    readOnly
                    value={userInfo?.displayName}
                    className="input text-black dark:bg-gray-900 dark:text-gray-300 dark:focus:outline-gray-300 w-full text-lg"
                    placeholder="User Name"
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
                    value={userInfo?.email}
                    className="input text-black dark:bg-gray-900 dark:text-gray-300 dark:focus:outline-gray-300 w-full text-lg"
                    placeholder="User Email"
                    required
                  />
                </div>
              </div>

              {/* Input field ends */}

              <button
                type="submit"
                className="my-4 block w-full p-3 text-center rounded-sm bg-orange-500 dark:bg-orange-800 text-white hover:bg-orange-800 dark:hover:bg-orange-600 transition duration-300 text-xl font-bold cursor-pointer"
              >
                Add New Food
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFood;
