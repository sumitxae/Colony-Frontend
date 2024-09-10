import React from "react";
import { Route, Routes } from "react-router";
import RegisterForm from "./components/Main Pages/auth/RegisterForm";
import LoginForm from "./components/Main Pages/auth/Login";
import Home from "./components/Main Pages/Home";
import Dashboard from "./components/Main Pages/Dashboard";
import WelcomePage from "./components/Main Pages/WelcomePage";
import Logout from "./components/Main Pages/auth/Logout";
import ProtectedRoute from "./components/ProtectedRoute";


const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<ProtectedRoute> <Dashboard/> </ProtectedRoute>} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </>
  );
};

export default App;
