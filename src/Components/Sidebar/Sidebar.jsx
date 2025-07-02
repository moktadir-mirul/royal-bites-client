
// import { X } from "lucide-react";
import { useContext } from "react";
import { RxCross2 } from "react-icons/rx";
import { NavLink } from "react-router";
import { RiPlantFill } from "react-icons/ri";
import { AuthContext } from "../../AuthProvider/AuthContext";
import { GrRestaurant } from "react-icons/gr";

const Sidebar = ({ isOpen, onClose }) => {

    const {userInfo} = useContext(AuthContext)

  const links = [
    { path: "/dashboard/stats", label: "Stats" },
    { path: "/dashboard/allFoods", label: "All Foods" },
    { path: "/dashboard/addFood", label: "Add Food" },
    { path: "/dashboard/myFoods", label: "My Foods" },
    { path: "/dashboard/myOrders", label: "My Orders" },
  ];

  return (
    <div className="bg-orange-100 dark:bg-gray-700">
      {/* Overlay for small screens */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden transition-opacity ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full w-64 bg-orange-100 dark:bg-gray-800 shadow-md z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Close btn for mobile */}
        <div className="flex items-center justify-between px-4 py-3 border-b md:hidden">
          {/* <h2 className="font-semibold text-lg">Dash</h2> */}
          <button onClick={onClose}>
            <RxCross2 className="w-5 h-5" />
          </button>
        </div>

        {/* User Info */}
        <div className="p-4 border-b flex flex-row md:flex-col items-center space-x-3 gap-3">
          <div>
            <img
            src={userInfo.photoURL}
            alt={userInfo.displayName}
            className="w-10 md:w-32 h-10 md:h-32 rounded-full"
          />
          </div>
          <div className="space-y-3 flex flex-col items-center justify-center">
            <h3 className="font-bold text-xl text-orange-700 dark:text-gray-200">{userInfo.displayName}</h3>
            <p className="text-sm flex items-center gap-2 text-orange-700 dark:text-gray-200">Food Enthusiasist <GrRestaurant color="orange" size={20}/></p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `block px-3 py-2 rounded hover:bg-orange-200 dark:hover:bg-gray-500 text-orange-700 dark:text-gray-200 ${
                  isActive ? "bg-orange-200 font-medium dark:bg-gray-500" : ""
                }`
              }
              onClick={onClose} // Close sidebar on mobile when link clicked
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;