import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../store/actions/authAction";
import { useNavigate } from "react-router";
import { NavLink, Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { isLoggedIn } from "../../../utils/isLoggedIn";
import Dropdown from "../../Reusables/Dropdown";

const LoginComponent = () => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  let token = localStorage.getItem("token");

  const handleLogin = async (e) => {
    if (error) {
      toast.error(error.message);
    }
    setLoader(true);
    e.preventDefault();
    try {
      const response = await dispatch(login(userData));
      if (response.payload.success) {
        toast.success("User Logged In");
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
      toast.error("Invalid Credentials");
    } finally {
      setLoader(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (isLoggedIn(token)) {
      toast.warn("User Already Logged In");
      navigate("/dashboard");
    }
  }, []);
  return (
    <div>
      <header className="flex justify-between items-center bg-[#18181B] w-full px-6 py-4">
        <button className="w-12 h-12 text-white pl-14 bg-[#ffffff13] rounded-full flex justify-center items-center">
          <span className="text-2xl mr-0.5 mb-1">De</span>
          Central
        </button>
        <div className="flex items-center space-x-4">
          <Link
            to={"/register"}
            className="bg-[#ffffff13] text-white py-2 px-4 rounded-md"
          >
            Register
          </Link>
          <div className="w-12 h-12 bg-[#ffffff13] rounded-full flex justify-center items-center">
            <Dropdown
              head={
                <svg
                  className="w-6 h-6 text-white"
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
      <div className="h-screen w-screen flex items-center justify-center bg-zinc-900">
        <form
          onSubmit={handleLogin}
          className="flex flex-col items-center justify-center"
        >
          <input
            className="bg-gray-200 w-80 h-10 rounded-md p-2 mb-2"
            type="username"
            name="username"
            value={userData.username}
            onChange={(e) => handleInputChange(e)}
            placeholder="Username"
            required
          />
          <input
            className="bg-gray-200 w-80 h-10 rounded-md p-2 mb-2"
            type="password"
            name="password"
            value={userData.password}
            onChange={(e) => handleInputChange(e)}
            placeholder="Password"
            required
          />
          <button
            className="bg-teal-800 mb-3 text-white py-2 mt-2 px-14 rounded-xl text-xl"
            type="submit"
          >
            {loader ? <ClipLoader color="white" /> : "Login"}
          </button>
          <p className="text-white text-sm">
            New to assignment ?{" "}
            <NavLink className="text-teal-700" to={"/register"}>
              Register Here
            </NavLink>{" "}
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;
