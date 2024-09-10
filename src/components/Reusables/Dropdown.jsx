import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectTeams, setTeam } from "../../store/reducers/colonySlice";
import { persistor } from "../../store/store";

const Dropdown = ({
  head,
  options,
  className,
  buttonClassName,
  menuClassName,
  itemClassName,
  team,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const teams = useSelector(selectTeams);
  const dispatch = useDispatch();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleClick = (e, option) => {
    if (team) {
      e.preventDefault();
      const activeTeam = teams.find((team) => team.teamName === option);
      dispatch(setTeam(activeTeam));
    } 
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className={`inline-flex justify-center items-center w-20 h-16 text-nowrap px-4 py-2 text-sm font-medium focus:outline-none ${buttonClassName}`}
      >
        {head}
      </button>
      {isOpen && (
        <div
          className={`absolute ml-auto w-40 mt-2 origin-top-right rounded-md shadow-lg outline-none ${menuClassName}`}
        >
          <div className="py-1">
            {options.map((option, index) => (
              <Link
                key={index}
                onClick={(e) => handleClick(e, option)}
                to={team ? "#" : `/${option.toLowerCase().replace(" ", "-")}`}
                className={`block px-4 py-2 text-sm hover:bg-teal-700 ${itemClassName}`}
              >
                {option}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
