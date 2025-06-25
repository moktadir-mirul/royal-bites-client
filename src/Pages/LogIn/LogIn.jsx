import React, { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../../ThemeProvider/ThemeContext";
import { Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../AuthProvider/AuthContext";
import { toast } from "react-toastify";
import { animate, inView } from "motion";

const LogIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [passwordError, setPasswordError] = useState("");

  const { darkMode } = useContext(ThemeContext);
  const { userInfo } = useContext(AuthContext);
  const { handleGoogleSignIn, handleUserSignIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const loginRef = useRef();

  useEffect(() => {
    inView(loginRef.current, () => {
      animate(
        loginRef.current,
        { x: [-500, 0], opacity: [0, 1] },
        { duration: 1.1, easing: "ease-out" }
      );
    });
    document.title = "Log In | Royal Bites";
  }, []);

  const handleGoogleLogIn = () => {
    handleGoogleSignIn()
      .then(() => {
        toast.success("Log in with Google successful!");
        navigate(location?.state || "/");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handleLogIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const passReg = /(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!passReg.test(password)) {
      return setPasswordError(
        "Password must contain one uppercase letter, one lower case letter and needs to be minimum six character long."
      );
    }

    handleUserSignIn(email, password)
      .then(() => {
        toast.success("Log in with email successful!");
        navigate(location?.state || "/");
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <div className="w-full h-full px-2 md:px-0 xl:h-screen bg-[url(./Images/login-bg-4.jpg)] dark:bg-[url(./Images/login-bg-d.jpg)] bg-no-repeat bg-cover">
      <div className="flex justify-center py-10">
        <div
          ref={loginRef}
          className={`w-full ${
            darkMode ? "form-bg-d" : "form-bg"
          } max-w-md p-8 space-y-3 rounded-xl dark:text-gray-300`}
        >
          <h1 className="text-3xl font-bold play text-center pb-5">
            Login in to your Account
          </h1>
          <form onSubmit={handleLogIn} className="space-y-6">
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
                placeholder="Enter your Email"
                required
                className="w-full px-4 py-3 text-lg rounded-md text-black bg-gray-200 dark:bg-gray-900 dark:text-gray-300 focus:dark:border-amber-600"
              />
            </div>
            <div className="relative space-y-1 text-sm">
              <label
                htmlFor="password"
                className="block text-lg md:text-xl font-bold dark:text-gray-300"
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
                className="w-full px-4 py-3 text-lg rounded-md text-black bg-gray-200 dark:bg-gray-900 dark:text-gray-300"
              />
              <p
                onClick={() => setShowPassword(!showPassword)}
                className="px-2 py-1 cursor-pointer bg-gray-100 dark:bg-gray-800 absolute right-6 top-10 z-20 rounded-sm"
              >
                {showPassword ? (
                  <FaEye size={25} className="papayawhip dark:moccasine" />
                ) : (
                  <FaEyeSlash size={25} className="papayawhip dark:moccasine" />
                )}
              </p>
              <p className="text-red-700 dark:text-red-300">{passwordError}</p>
              <div className="flex justify-start font-bold text-base dark:text-gray-300">
                <Link
                  to={"/forgetPass"}
                  className="hover:underline hover:text-amber-900 hover:dark:text-amber-500 duration-200"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>
            {userInfo ? (
              <p className="block w-full p-3 text-center rounded-sm bg-orange-500 dark:bg-orange-800 text-white font-medium hover:bg-orange-800 dark:hover:bg-orange-600 duration-200 text-xl cursor-pointer">
                Already Logged in
              </p>
            ) : (
              <button
                type="submit"
                className="block w-full p-3 text-center rounded-sm bg-orange-500 dark:bg-orange-800 text-white font-medium hover:bg-orange-800 dark:hover:bg-orange-600 duration-200 text-xl cursor-pointer"
              >
                Log in
              </button>
            )}
          </form>
          <div className="flex items-center pt-4 space-x-1">
            <div className="flex-1 h-px sm:w-16 bg-gray-900 dark:bg-gray-300"></div>
            <p className="px-3 text-sm font-bold dark:text-gray-300">
              Login with social accounts
            </p>
            <div className="flex-1 h-px sm:w-16 bg-gray-900 dark:bg-gray-300"></div>
          </div>
          <div className="flex justify-center space-x-4">
            {userInfo ? (
              ""
            ) : (
              <button
                onClick={handleGoogleLogIn}
                className="w-full bg-gray-200 text-black border-[#e5e5e5] flex items-center justify-center py-4 rounded-sm cursor-pointer hover:bg-gray-400 duration-200 gap-2 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-950"
              >
                <div>
                  <FcGoogle size={20} />
                </div>
                <h1>Login with Google</h1>
              </button>
            )}
          </div>
          <p className="text-xl py-3 text-center sm:px-6 dark:text-gray-300 play font-medium">
            Don't have an account ? {`${" "}`}
            <Link
              to={"/register"}
              className="play font-bold underline text-xl dark:text-gray-300 hover:text-orange-600"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
