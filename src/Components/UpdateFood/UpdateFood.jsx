import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../../ThemeProvider/ThemeContext";
import { AuthContext } from "../../AuthProvider/AuthContext";
import { useLoaderData, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { animate, inView } from "motion";

const UpdateFood = () => {
  const { darkMode } = useContext(ThemeContext);
  const { userInfo, foods, setFoods } = useContext(AuthContext);

  const navigate = useNavigate();
  const formRef = useRef();

  const updateFood = useLoaderData();

  useEffect(() => {
    fetch("https://royal-bites-rest-server.vercel.app/foods")
      .then((res) => res.json())
      .then((data) => {
        setFoods(data);
      });
    inView(formRef.current, () => {
      animate(
        formRef.current,
        { x: [-400, 0], opacity: [0, 1] },
        { duration: 0.9, easing: "ease-out" }
      );
    });
    document.title = "Update Food | Royal Bites";
  }, [setFoods]);

  const [foodCategory, setFoodCategory] = useState(updateFood.foodCategory);
  const [upQuantity, setUpQuantity] = useState(updateFood.quantity);
  const [upPrice, setUpPrice] = useState(updateFood.price);

  const handleUpdateFood = (e, uid) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const updateFoodData = Object.fromEntries(formData.entries());
    updateFoodData.quantity = Number(updateFoodData.quantity);
    updateFoodData.price = Number(updateFoodData.price);
    updateFoodData.purchaseCount = Number(updateFood.purchaseCount);
    updateFoodData.originalQuantity = updateFoodData.quantity;

    fetch(`https://royal-bites-rest-server.vercel.app/foods/${uid}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
      body: JSON.stringify(updateFoodData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          const updatedFoods = foods.map((food) => {
            if (food._id === uid) {
              return { uid, ...updateFood };
            }
            return food;
          });
          setFoods(updatedFoods);
          toast("Food updated successfully!");
          navigate("/dashboard/myFoods");
        }
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <div className="w-full bg-[url(./Images/add-bg.jpg)] dark:bg-[url(./Images/add-food-d.jpg)] bg-no-repeat bg-cover">
      <div className="flex justify-center py-10">
        <div
          ref={formRef}
          className={`card w-11/12 mx-auto ${
            darkMode ? "form-bg-d" : "form-bg"
          } shrink-0 shadow-xl`}
        >
          <div className="card-body">
            <h1 className="play pb-2 arap text-center font-bold text-4xl text-orange-500 dark:text-gray-300">
              Update Food
            </h1>
            <form onSubmit={(e) => handleUpdateFood(e, updateFood._id)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* name input */}
                <div className="fieldset">
                  <label className="label text-orange-500 font-bold dark:text-gray-300 text-lg">
                    Food Name
                  </label>
                  <input
                    name="foodName"
                    defaultValue={updateFood.foodName}
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
                    defaultValue={updateFood.imageUrl}
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
                    value={upQuantity}
                    onChange={(e) => setUpQuantity(e.target.value)}
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
                    min="1"
                    value={upPrice}
                    onChange={(e) => setUpPrice(e.target.value)}
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
                    defaultValue={updateFood.foodOriginCountry}
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
                  defaultValue={updateFood.briefDescription}
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
                    value={userInfo.displayName}
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
                    value={userInfo.email}
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
                Update Food Item
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateFood;
