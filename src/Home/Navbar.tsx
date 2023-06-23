import {
  ShoppingCartIcon,
  HeartIcon,
  UserCircleIcon,
  SearchIcon,
} from "@heroicons/react/solid";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="white"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M6 5v1H4.667a1.75 1.75 0 00-1.743 1.598l-.826 9.5A1.75 1.75 0 003.84 19H16.16a1.75 1.75 0 001.743-1.902l-.826-9.5A1.75 1.75 0 0015.333 6H14V5a4 4 0 00-8 0zm4-2.5A2.5 2.5 0 007.5 5v1h5V5A2.5 2.5 0 0010 2.5zM7.5 10a2.5 2.5 0 005 0V8.75a.75.75 0 011.5 0V10a4 4 0 01-8 0V8.75a.75.75 0 011.5 0V10z"
                  clipRule="evenodd"
                />
              </svg>
              <h1 className="text-white text-2xl font-bold ml-2">ShopCart</h1>
            </div>
          </Link>
          <div className="flex items-center space-x-11">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products"
                className="w-40 sm:w-64 py-2 px-4 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <SearchIcon className="h-4 w-4 text-gray-400" />
              </div>
            </div>
            <ul className="flex space-x-5">
              <li>
                <Link to="/cart" className="text-white hover:text-gray-300">
                  <ShoppingCartIcon className="h-6 w-6" />
                </Link>
              </li>
              <li>
                <a href="#" className="text-white hover:text-gray-300">
                  <HeartIcon className="h-6 w-6" />
                </a>
              </li>
              <li>
                <Link
                  to="/user/register"
                  className="text-white hover:text-gray-300"
                >
                  <UserCircleIcon className="h-6 w-6" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
