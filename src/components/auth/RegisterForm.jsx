import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../store/actions/authAction";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { isLoggedIn } from "../../utils/isLoggedIn";
import Dropdown from "../Dropdown";
import { IoMdPersonAdd } from "react-icons/io";

const RegisterComponent = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('image', image);  
    const res = await dispatch(register(formData));
    console.log(res);
    if (res.payload?.success) {
      toast.success("Registered Successfully");
      navigate("/dashboard");
    }
  };

  useEffect(() => {
    if (isLoggedIn(token)) {
      toast.warn("Please Logout First");
      navigate("/dashboard");
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen w-full bg-zinc-900 flex flex-col justify-between items-center overflow-hidden">
      <header className="flex justify-between items-center bg-[#18181B] w-full px-6 py-4">
        <button className="w-12 h-12 text-white pl-14 bg-[#ffffff13] rounded-full flex justify-center items-center">
          <span className="text-2xl mr-0.5 mb-1">De</span>
          Central
        </button>
        <div className="flex items-center space-x-4">
          <Link
            to={"/"}
            className="bg-[#ffffff13] text-white py-2 px-4 rounded-md"
          >
            Sign In
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
      <div className="flex justify-center items-center w-full flex-1">
        <div className="flex flex-col-reverse md:flex-row h-auto md:h-2/3 w-11/12 md:w-2/3 p-8 items-center justify-evenly bg-[#ffffff13] rounded-2xl">
          <div className="flex justify-center mt-6 w-full md:w-1/2 items-center">
            <form
              className="flex flex-col items-center h-full w-full gap-2"
              onSubmit={handleRegister}
            >
              <div className="relative mb-4">
                <input
                  name="pfp"
                  id="fileInput"
                  className="hidden"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  placeholder="Profile Image"
                />
                <div
                  className="bg-gray-200 w-32 h-32 rounded-full flex items-center justify-center cursor-pointer"
                  onClick={() => document.getElementById('fileInput').click()}
                >
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Profile Preview"
                      className="w-32 h-32 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-400">Select Image</span>
                  )}
                </div>
              </div>
              <input
                className="bg-gray-200 w-full h-12 rounded-md p-2 mb-2"
                type="text"
                value={username}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                required
              />
              <input
                className="bg-gray-200 w-full h-12 rounded-md p-2 mb-2"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
              <input
                className="bg-gray-200 w-full h-12 rounded-md p-2 mb-2"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
              <button
                className="active:from-teal-600 active:to-teal-800 bg-gradient-to-br w-full from-teal-800 to-teal-600 border border-zinc-400 mb-3 text-white py-2 mt-2 px-14 rounded-xl text-xl"
                type="submit"
              >
                Register
              </button>

              {error && <p>{error.message}</p>}
            </form>
          </div>
          <div className="bg-gradient-to-br gap-8 text-white from-teal-900 col-span-2 flex items-center justify-start flex-col to-teal-800 w-full md:w-1/2 h-full mt-8 md:mt-0 ml-0 md:ml-8 rounded-md p-6">
            <IoMdPersonAdd className="mt-8 text-8xl" />
            <div className="text-center">
              <h2 className="text-5xl font-semibold mb-8">Hi! There,</h2>
              <div>
                <p className="hidden lg:block">
                  Welcome to DeCenter! where you can create your own
                  Decentralized apps and manage your funds, <br /> Here{" "}
                  <span className="text-xl text-red-400 font-semibold uppercase">
                    You
                  </span>{" "}
                  are in{" "}
                  <span className="font-semibold text-xl text-green-300">
                    Control
                  </span>
                  .
                </p>
                <div className="text-white mt-8 text-sm flex items-center justify-center gap-2">
                  <p className="text-lg">Already Have an Account ? </p>
                  <NavLink className="text-teal-700" to={"/"}>
                    <button className="px-5 py-2 w-max border border-zinc-200 bg-gradient-to-br from-teal-600 text-white rounded-full">
                      Sign In
                    </button>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;
