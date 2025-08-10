import React, { useContext, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router';
import Sidebar from '../../Components/Sidebar/Sidebar';
import DarkModeToggle from '../../Components/DarkModeToggle/DarkModeToggle';
import { IoMenu } from 'react-icons/io5';
import { AuthContext } from '../../AuthProvider/AuthContext';
import { toast } from 'react-toastify';

const Dashboard = () => {
    const {handleSignOut} = useContext(AuthContext)
      const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    handleSignOut()
        .then(() => {
          toast.success("User Logged Out Successfully!");
          navigate("/");
        })
        .catch((err) => {
          toast.error(err.message);
        });
  }
    return (
            <div className="min-h-screen flex flex-col md:flex-row">
        
      {/* Sidebar for md+ and slide-in for small screens */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main area */}
      <div className="flex-1 bg-orange-50 dark:bg-gray-700">
        <div className="w-full h-16 flex items-center justify-center gap-3 bg-orange-500 dark:bg-orange-700 text-white dark:text-gray-200">
            <NavLink to={"/"}>Home</NavLink>
            <DarkModeToggle/>
            <button
                onClick={handleLogout}
                className="bg-white dark:bg-gray-200 dark:text-orange-700 hover:bg-orange-900 hover:text-white duration-200 text-orange-500 font-bold py-2 px-6 cursor-pointer rounded-sm"
              >
                Log Out
              </button>
        </div>
        {/* Mobile toggle button */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden mb-4 flex items-center text-orange-500"
        >
          <IoMenu className="w-6 h-6 mr-2" />
          Dashboard
        </button>

        {/* Dashboard content */}

        <div className="mt-6">
          <Outlet />
        </div>
      </div>
    </div>
    );
};

export default Dashboard;