import React, { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../../ThemeProvider/ThemeContext";
import { Link, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../AuthProvider/AuthContext";
import { toast } from "react-toastify";
import { animate, inView } from "motion";

const Register = () => {
  const {userInfo} = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const { darkMode } = useContext(ThemeContext);
  const {handleUserReg, handleUpdateUser} = useContext(AuthContext);

  const regRef = useRef();
  
    useEffect(() => {
      inView(regRef.current, () => {
        animate(
          regRef.current,
          { y: [-500, 0], opacity: [0, 1] },
          { duration: 1.1, easing: "ease-out" }
        );
      });
      document.title = "Register | Royal Bites";
    }, []);


  const handleRegister = e => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.name.value;
    const photoUrl = e.target.photoUrl.value;
    
    const passReg = /(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if(!passReg.test(password)) {
      return setPasswordError("Password must contain one uppercase letter, one lower case letter and needs to be minimum six character long.")
    }

    handleUserReg(email, password)
    .then(() => {
        handleUpdateUser(name, photoUrl)
        .then(() => {
          toast.success("New user registration successful.");
          navigate("/")
        })
        .catch(err => toast.error(err.message))
    })
    .catch(err => {
      toast.error(err.message);
    })
  }


  return (
    <div className="w-full h-full px-2 md:px-0 xl:h-screen bg-[url(./Images/reg-bg-f.jpg)] dark:bg-[url(./Images/reg-bg-fdd.jpg)] bg-no-repeat bg-cover">
      <div className="flex justify-center py-10">
        <div
        ref={regRef}
          className={`w-full ${
            darkMode ? "form-bg-d" : "form-bg"
          } max-w-lg p-8 space-y-3 rounded-xl dark:text-gray-300`}
        >
          <h1 className="text-3xl font-bold play text-center pb-5">Register</h1>
          <form onSubmit={handleRegister} className="space-y-6">
            <div className="space-y-1 text-sm">
              <label
                htmlFor="name"
                className="block text-lg md:text-xl font-bold dark:text-gray-300"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter your Name"
                required
                className="w-full px-4 py-3 text-black text-lg rounded-md bg-gray-200 dark:bg-gray-900 dark:text-gray-300 focus:dark:border-amber-600"
              />
            </div>
            <div className="space-y-1 text-sm">
              <label
                htmlFor="photoUrl"
                className="block text-lg md:text-xl font-bold dark:text-gray-300"
              >
                Photo URL
              </label>
              <input
                type="text"
                name="photoUrl"
                id="photoUrl"
                placeholder="Photo URL"
                required
                className="w-full px-4 py-3 text-black text-lg rounded-md bg-gray-200 dark:bg-gray-900 dark:text-gray-300 focus:dark:border-amber-600"
              />
            </div>
            <div className="space-y-1 text-sm">
              <label
                htmlFor="username"
                className="block text-lg md:text-xl font-bold dark:text-gray-300"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="username"
                required
                placeholder="Enter your Email"
                className="w-full px-4 py-3 text-black text-lg rounded-md bg-gray-200 dark:bg-gray-900 dark:text-gray-300 focus:dark:border-amber-600"
              />
            </div>
            <div className="relative space-y-1 text-sm">
              <label
                htmlFor="password"
                className="block  text-lg md:text-xl font-bold dark:text-gray-300"
              >
                Password
              </label>
              <input
                type={`${showPassword ? "text" : "password"}`}
                onClick={() => setPasswordError("")}
                name="password"
                id="password"
                placeholder="Password"
                required
                className="w-full px-4 py-3 text-black text-lg rounded-md bg-gray-200 dark:bg-gray-900 dark:text-gray-300"
              />
              <p
                onClick={() => setShowPassword(!showPassword)}
                className="px-2 py-1 cursor-pointer bg-gray-100 dark:bg-gray-800 absolute right-6 top-10 z-20 rounded-sm"
              >
                {showPassword ? (
                  <FaEye size={27} />
                ) : (
                  <FaEyeSlash size={27} />
                )}
              </p>
              <p className="text-red-700 dark:text-red-300">{passwordError}</p>
            </div>
            {
              userInfo ? <p className="block w-full p-3 text-center rounded-sm bg-orange-500 dark:bg-orange-800 text-white font-medium hover:bg-orange-800 dark:hover:bg-orange-600 duration-200 text-xl cursor-pointer">
              Already Logged In
            </p> : <button className="block w-full p-3 text-center rounded-sm bg-orange-500 dark:bg-orange-800 text-white font-medium hover:bg-orange-800 dark:hover:bg-orange-600 duration-200 text-xl cursor-pointer">
              Register
            </button>
            }
          </form>
          <p className="text-xl py-3 text-center sm:px-6 dark:text-gray-300 play font-medium">
            Already have an account ? {`${" "}`}
            <Link
              to={"/login"}
              className="play font-bold underline text-xl dark:text-gray-300 hover:text-orange-600"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
