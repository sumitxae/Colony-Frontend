import React from "react";
import Dropdown from "../Reusables/Dropdown";
import { Link } from "react-router-dom";
import { FaDev } from "react-icons/fa";

const WelcomePage = () => {
  return (
    <div className="min-h-screen bg-zinc-900 flex flex-col justify-between text-gray-800">
      <header className="flex justify-between items-center bg-[#18181B] w-full px-6 py-4">
        <button className="w-12 h-12 text-white pl-14 bg-[#ffffff13] rounded-full flex justify-center items-center">
          <span className="text-2xl mr-0.5 mb-1">De</span>
          Central
        </button>
        <div className="flex items-center space-x-4">
          <Link
            to={"/register"}
            className="bg-[#ffffff13] text-xs lg:text-base text-white py-3 lg:py-2 px-4 rounded-md"
          >
            <span className="text-teal-400">New to DeCentral?</span> Sign Up
          </Link>
          <div className="w-12 h-12 bg-[#ffffff13] rounded-full flex justify-center items-center">
            <Dropdown
              head={
                <svg
                  className="w-1 h-1 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5.121 17.804A8 8 0 0116.88 6.196m.42 6.607l-.39-.185A8.06 8.06 0 0112 18a8.06 8.06 0 01-4.909-1.736l-.391.186A7.978 7.978 0 0012 20a7.978 7.978 0 004.9-1.796l-.39-.185a8.06 8.06 0 01-4.91 1.736 8.06 8.06 0 01-4.909-1.736l-.391.186A7.978 7.978 0 0012 20a7.978 7.978 0 004.9-1.796"
                  ></path>
                </svg>
              }
              options={[
                "Create a Colony",
                "Get Started",
                "Report a Bug",
                "Help",
              ]}
              key={Math.random()}
              buttonClassName=""
              menuClassName="bg-[#2d2d30] border border-[#27272a64] divide-y rounded-md"
              itemClassName="text-white"
            />
          </div>
        </div>
      </header>
      <main className="flex flex-col items-center justify-center p-6 flex-grow text-white">
        <h1 className="text-2xl md:text-4xl font-semibold mb-4 text-center">
          Welcome, what would you like to do?
        </h1>
        <div className="space-y-4 flex flex-col items-center justify-center">
          <button className="flex items-center space-x-2 bg-teal-800 text-white py-2 px-4 rounded-md shadow-md hover:bg-teal-700 transition duration-150">
            <svg
              className="w-6 h-6 md:w-8 md:h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              ></path>
            </svg>
            <span>Login to Access your colonies</span>
          </button>
          <button className="flex items-center space-x-2 bg-teal-800 text-white py-2 px-4 rounded-md shadow-md hover:bg-teal-700 transition duration-150">
            <FaDev className="scale-125 mr-3" />
            Explore our Dev Forums
          </button>
        </div>
      </main>
      <footer className="text-center mb-5">
        <small>
          <a href="#" className="text-green-400">
            We ♥ feedback!
          </a>
        </small>
      </footer>
    </div>
  );
};

export default WelcomePage;
