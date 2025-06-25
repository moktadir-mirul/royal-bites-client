import React, { useContext, useEffect, useRef } from "react";
import { ThemeContext } from "../../ThemeProvider/ThemeContext";
import { toast } from "react-toastify";
import { animate, inView } from "motion";
import { AuthContext } from "../../AuthProvider/AuthContext";

const ForgetPass = () => {
  const { darkMode } = useContext(ThemeContext);
  const {handleResetPassword} = useContext(AuthContext);
  const passRef = useRef();
  useEffect(() => {
    inView(passRef.current, () => {
      animate(
        passRef.current,
        { x: [-500, 0], opacity: [0, 1] },
        { duration: 1.1, easing: "ease-out" }
      );
    });
    document.title = "Forget Password | Royal Bites";
  }, []);

  const handleForgetPass = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    handleResetPassword(email)
    .then(() => {
        toast("An email was sent to you for password change");
        e.target.reset();
    })
    .catch(err => toast.error(err.message));
  };
  return (
    <div className="w-full h-full px-2 md:px-0 xl:h-screen bg-[url(./Images/login-bg-4.jpg)] dark:bg-[url(./Images/login-bg-d.jpg)] bg-no-repeat bg-cover">
      <div className="flex justify-center py-10">
        <div
          ref={passRef}
          className={`w-full ${
            darkMode ? "form-bg-d" : "form-bg"
          } max-w-md p-8 space-y-3 rounded-xl dark:text-gray-300`}
        >
          <h1 className="text-3xl font-bold play text-center pb-5">
            Change Password
          </h1>
          <form onSubmit={handleForgetPass} className="space-y-6">
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
            <button
              type="submit"
              className="block w-full p-3 text-center rounded-sm bg-orange-500 dark:bg-orange-800 text-white font-medium hover:bg-orange-800 dark:hover:bg-orange-600 duration-200 text-xl cursor-pointer"
            >
              Send Reset Email
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPass;
