import React from 'react';
import { Link } from 'react-router-dom';
import myImage from "./assets/dot2.png";
import myImage2 from "./assets/fruit.png";

function NavBar() {

  return (
    <nav className="border-gray-200 text-white dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                <img src={myImage2} className="h-8" alt="Logo" />
                <span className="self-center text-2xl text-emerald-500 font-semibold whitespace-nowrap dark:text-white">Fruitection</span>
            </Link>
            <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                <Link to="/detection" className='hover:cursor-pointer'>
                <button type="button" className="live  text-white   focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <img src={myImage} className="h-8" alt="Logo" />
                    Live Detection
                    </button>
                </Link>
                
                <button data-collapse-toggle="navbar-cta" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-cta" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>
            </div>
            <div className="items-center bg-transparent justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
                <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-transparent md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  ">
                <li>
                    <Link to="/" className="block py-2 px-3 md:p-0 text-white hover:text-emerald-500  rounded-sm md:bg-transparent  " aria-current="page">Home</Link>
                </li>
                <li>
                    <Link to="about" className="block hover:text-emerald-500 py-2 px-3 md:p-0 rounded-sm hover:bg-gray-100 md:hover:bg-transparent  dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</Link>
                </li>
                
                <li>
                    <Link to="contact" className="block hover:text-emerald-500 py-2 px-3 md:p-0 rounded-sm hover:bg-gray-100 md:hover:bg-transparent  md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</Link>
                </li>
                </ul>
            </div>
        </div>
    </nav>

  )
}

export default NavBar
