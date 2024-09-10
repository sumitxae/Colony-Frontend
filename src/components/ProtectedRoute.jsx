import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../utils/isLoggedIn";
import { useSelector } from "react-redux";
import { selectToken } from "../store/reducers/authSlice";

const ProtectedRoute = ({ children, ...rest }) => {
  const navigate = useNavigate();
  const token = useSelector(selectToken);
  useEffect(() => {
    if (!isLoggedIn(token)) {
      navigate("/");
      return
    }
  }, [navigate, isLoggedIn(token)]);
  return <>{children}</>;
};

export default ProtectedRoute;
