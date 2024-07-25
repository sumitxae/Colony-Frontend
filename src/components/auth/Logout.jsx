import React, { useEffect } from "react";
import { logOut } from "../../store/reducers/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(logOut());
    navigate("/");
  }, []);
  return <div></div>;
};

export default Logout;
