import React, { useContext } from 'react';
import { ThemeContext } from '../../ThemeProvider/ThemeContext';
import { FaMoon, FaSun } from 'react-icons/fa';
import { MdSunny } from 'react-icons/md';

const DarkModeToggle = () => {
    const {darkMode, setDarkMode} = useContext(ThemeContext);
    return (
        <button
        onClick={() => setDarkMode(!darkMode)}
        className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-black dark:text-white hover:scale-105 transition duration-300"
        >
            {
                darkMode ? <FaMoon className='text-gray-100 w-6 h-6'></FaMoon> : <MdSunny className='text-amber-600 w-7 h-7'></MdSunny>
            }
        </button>
    );
};

export default DarkModeToggle;