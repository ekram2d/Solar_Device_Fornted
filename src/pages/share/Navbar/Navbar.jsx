import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../../../public/logo.png";
import LogoutButton from "../../../components/Authentications/LogoutButton";

const Navbar = () => {
	const [menuOpen, setMenuOpen] = useState(false);

	const buttonClasses =
		"bg-blue-500 text-white px-4 py-2 rounded hover:bg-green-600 transition";

	return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 ">
        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center space-x-3  space-y-3 rtl:space-x-reverse"
        >
          <img
            src={logo}
            className="max-w-[50px] max-h-[50px]"
            alt="Asian Carbon Exchange Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Asian
          </span>
        </NavLink>

        {/* Hamburger Menu */}
        <button
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        {/* Navbar Links */}
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } w-full md:block md:w-auto`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <NavLink to="/" aria-current="page" className="block md:p-0">
                {({ isActive }) => (
                  <button
                    className={`${buttonClasses} ${
                      isActive ? "bg-red-600" : ""
                    }`}
                  >
                    Home
                  </button>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="block md:p-0">
                {({ isActive }) => (
                  <button
                    className={`${buttonClasses} ${
                      isActive ? "bg-red-600" : ""
                    }`}
                  >
                    About
                  </button>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink to="/services" className="block md:p-0">
                {({ isActive }) => (
                  <button
                    className={`${buttonClasses} ${
                      isActive ? "bg-red-600" : ""
                    }`}
                  >
                    Services
                  </button>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink to="/pricing" className="block md:p-0">
                {({ isActive }) => (
                  <button
                    className={`${buttonClasses} ${
                      isActive ? "bg-red-600" : ""
                    }`}
                  >
                    Pricing
                  </button>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink to="/login" className="block md:p-0">
                {({ isActive }) => (
                  <button
                    className={`${buttonClasses} ${
                      isActive ? "bg-red-600" : ""
                    }`}
                  >
                    Login
                  </button>
                )}
              </NavLink>
            </li>
            <li>
              {/* LogoutButton separate, styled inside that component */}
              <LogoutButton />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
