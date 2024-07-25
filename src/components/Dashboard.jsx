import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn } from "../utils/isLoggedIn";
import { toast } from "react-toastify";
import { selectToken, selectUser } from "../store/reducers/authSlice";
import Dropdown from "./Dropdown";
import { FaPlus, FaDev } from "react-icons/fa";
import Modal from "./Modal";
import { fetchActiveColony } from "../store/actions/colonyActions";
import {
  selectColony,
  selectTeam,
  selectTeams,
} from "../store/reducers/colonySlice";

const Dashboard = () => {
  const navigate = useNavigate();
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const colony = useSelector(selectColony);
  const team = useSelector(selectTeam);
  const allTeams = useSelector(selectTeams);
  const teams = allTeams ? [{teamName: "Root", _id: null }, ...allTeams] : [{teamName: "Root", _id: null }]
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const getColonyHandler = (id) => {
    dispatch(fetchActiveColony(id));
  };

  const userBalance = user?.tokens.find(
    (token) => token.symbol === colony?.nativeTokenSymbol
  );

  useEffect(() => {
    if (!isLoggedIn(token)) {
      toast.error("Please Login!");
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <div className="h-screen w-screen bg-zinc-900 text-white overflow-hidden flex flex-col lg:flex-row">
      <aside className="w-full lg:w-20 bg-[#ffffff13] overflow-x-auto p-4 rounded-md flex lg:flex-col items-center">
        <ul className="flex lg:flex-col space-x-4 lg:space-x-0 lg:space-y-4">
          {user?.colonies.map((colony) => (
            <li key={colony._id}>
              {/* {console.log(colony)} */}
              <Link
                to="#"
                onClick={() => getColonyHandler(colony._id)}
                className="block w-12 h-12 p-1.5 rounded-md bg-[#ffffff13]"
              >
                <img
                  src={colony.colonyPicture}
                  alt="Colony Profile Picture"
                  className="h-full rounded-md w-full object-cover object-center"
                />
              </Link>
            </li>
          ))}
          <li>
            <Link
              to="#"
              className="flex items-center justify-center w-12 h-12 bg-[#ffffff13] rounded-md"
            >
              <FaPlus />
            </Link>
          </li>
        </ul>
      </aside>
      <div className="flex-grow px-6 py-4 2 overflow-auto lg:overflow-hidden">
        <nav className="container-fluid flex flex-col lg:flex-row justify-between items-center bg-[#ffffff13] p-4 rounded-md mb-6">
          <ul className="flex items-center space-x-4 mb-4 lg:mb-0">
            <li>
              <strong>
                {colony ? colony?.colonyName : "Choose or Create a colony"}
              </strong>
            </li>
            <li className="text-gray-400">
              {colony?._id
                ? colony._id.slice(0, 4) + "..." + colony._id.slice(18)
                : ""}
            </li>
          </ul>
          <ul
            className={`flex space-x-4 text-teal-500 mb-4 lg:mb-0 ${
              colony ? "block" : "hidden"
            }`}
          >
            <li>
              <a href="#">Actions</a>
            </li>
            <li>
              <a href="#">Decisions</a>
            </li>
            <li>
              <a href="#">Extensions</a>
            </li>
          </ul>
          <ul className="flex items-center space-x-6">
            <li className="flex items-center space-x-2">
              <span className="text-red-400">●</span>
              <span className="flex gap-5">
                <span>
                  {colony
                    ? `${userBalance?.amount || 0} ${colony.nativeTokenSymbol}`
                    : ""}
                </span>
                <span className="text-gray-400 tracking-widest">
                  {user?._id
                    ? user._id.slice(0, 4) + "..." + user._id.slice(18)
                    : "0xFe2d...044d"}
                </span>
              </span>
            </li>
            <li>
              <Dropdown
                head={
                  <img
                    src={user?.pfp || "https://via.placeholder.com/30"}
                    alt="User"
                    className="rounded-full cursor-pointer"
                  />
                }
                team={false}
                options={["Profile", "Settings", "Logout"]}
                className="relative"
                buttonClassName=""
                menuClassName="bg-[#2d2d30] border border-[#27272a64] divide-y rounded-md"
                itemClassName="text-white"
              />
            </li>
          </ul>
        </nav>
        {user && colony ? (
          <main className="container mx-auto mt-4">
            <div className="flex flex-col lg:flex-row justify-between items-center mb-6">
              <div className="mb-4 lg:mb-0">
                <h2 className="text-4xl font-semibold flex items-center justify-center lg:block">
                  {colony?.funds.toLocaleString()} {colony?.nativeTokenSymbol}{" "}
                </h2>
                <p className="text-gray-400 mt-3">
                  Colony total balance{" "}
                  <a href="#" className="text-blue-400">
                    Manage Funds
                  </a>
                </p>
              </div>
              <div>
                <Button
                  onClick={handleOpen}
                  className="bg-teal-800 text-white py-2 px-4 rounded-md capitalize tracking-wider"
                >
                  New Action
                </Button>
                <Modal isOpen={open} teams={teams} team={team} setIsOpen={setOpen} />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <Dropdown
                head={teams && team ? team.teamName : teams[0].teamName}
                team={true}
                options={teams.map((team) => team.teamName)}
                className="relative inline-block text-left ml-6"
                buttonClassName="bg-[#29292C] border border-zinc-800 rounded-md hover:bg-[#ffffff0a] text-white"
                menuClassName="bg-[#2d2d30] border border-[#27272a64] ml-16 divide-y rounded-md"
                itemClassName="text-white"
              />
              <div className="flex items-center space-x-4">
                <span>Newest</span>
                <a href="#" className="text-blue-400">
                  Transactions log
                </a>
              </div>
            </div>
            <div className="w-full lg:w-[66.2%] py-4 lg:py-6 rounded-md shadow-md flex justify-between items-center">
              <h2 className="text-3xl font-semibold">Actions</h2>
              <button className="bg-teal-800 text-white py-2 px-4 rounded-md hover:bg-teal-700 transition-colors duration-300">
                Load More
              </button>
            </div>

            <div className="grid grid-cols-1  lg:grid-cols-3 gap-6">
              <section className="bg-[#ffffff13] p-6 rounded-lg shadow-md col-span-2 overflow-auto h-[32rem] no-scrollbar">
                <div className="space-y-4">
                  <div className="flex items-center p-4 bg-[#ffffff13] rounded-md">
                    <img
                      src="https://via.placeholder.com/30"
                      alt="User"
                      className="rounded-full mr-4"
                    />
                    <div>
                      <p>Pay sylv 10 PZA</p>
                      <p className="text-sm text-red-400">Failed</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-[#ffffff13] rounded-md">
                    <img
                      src="https://via.placeholder.com/30"
                      alt="User"
                      className="rounded-full mr-4"
                    />
                    <div>
                      <p>Award Sumit with a 250 pts reputation reward</p>
                      <p className="text-sm text-green-400">Forced</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-[#ffffff13] rounded-md">
                    <img
                      src="https://via.placeholder.com/30"
                      alt="User"
                      className="rounded-full mr-4"
                    />
                    <div>
                      <p>Move 25,000 PZA from E-cell Admin to Root</p>
                      <p className="text-sm text-green-400">Forced</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-[#ffffff13] rounded-md">
                    <img
                      src="https://via.placeholder.com/30"
                      alt="User"
                      className="rounded-full mr-4"
                    />
                    <div>
                      <p>Address book was updated</p>
                      <p className="text-sm text-green-400">Forced</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-[#ffffff13] rounded-md">
                    <img
                      src="https://via.placeholder.com/30"
                      alt="User"
                      className="rounded-full mr-4"
                    />
                    <div>
                      <p>Pay ayush 50,000 PZA</p>
                      <p className="text-sm text-green-400">Forced</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-[#ffffff13] rounded-md">
                    <img
                      src="https://via.placeholder.com/30"
                      alt="User"
                      className="rounded-full mr-4"
                    />
                    <div>
                      <p>Address book was updated</p>
                      <p className="text-sm text-green-400">Forced</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-[#ffffff13] rounded-md">
                    <img
                      src="https://via.placeholder.com/30"
                      alt="User"
                      className="rounded-full mr-4"
                    />
                    <div>
                      <p>Pay ayush 50,000 PZA</p>
                      <p className="text-sm text-green-400">Forced</p>
                    </div>
                  </div>
                </div>
              </section>
              <section className="bg-[#ffffff13] p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold">Available funds</h2>
                <p>Current Team: {team?.teamName || "Root"}</p>
                <p>
                  {team
                    ? team.funds.toLocaleString()
                    : colony?.funds.toLocaleString()}{" "}
                  {colony?.nativeTokenSymbol}
                </p>
                <p className="text-xl font-semibold mt-4">
                  Current Team: <span className="font-normal">Team Name</span>
                </p>
                <h2 className="text-xl font-semibold mt-4">
                  Contributors ( {colony?.contributors.length} )
                </h2>
                <div className="flex flex-wrap gap-4 mt-2">
                  {colony?.contributors.map((user) => (
                    <img
                      key={user?._id}
                      src={user?.pfp}
                      alt="Contributer pfp"
                      className="rounded-full h-11 w-11"
                    />
                  ))}
                </div>
                <h2 className="text-xl font-semibold mt-4">
                  Watchers ( {colony?.watchers.length} )
                </h2>
                <div className="flex flex-wrap gap-4 mt-2">
                  {colony?.watchers.map((user) => (
                    <img
                      key={user?._id}
                      src={user?.pfp}
                      alt="User"
                      className="rounded-full h-11 w-11"
                    />
                  ))}
                </div>
              </section>
            </div>
            <footer className="container mx-auto mt-7 text-center">
              <small>
                <a href="#" className="text-blue-400">
                  We ♥ feedback!
                </a>
              </small>
            </footer>
          </main>
        ) : (
          <div className="h-2/3 flex items-center justify-center flex-col w-full m-auto lg:h-4/5">
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
                  <span>Create a New Colony</span>
                </button>
                <button className="flex items-center space-x-2 bg-teal-800 text-white py-2 px-4 rounded-md shadow-md hover:bg-teal-700 transition duration-150">
                  <FaDev className="scale-125 mr-3" />
                  Join an existing Colony
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
        )}
      </div>
    </div>
  );
};

export default Dashboard;
