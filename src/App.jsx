import React from "react";
import { Route, Routes } from "react-router";
import RegisterForm from "./components/auth/RegisterForm";
import LoginForm from "./components/auth/Login";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import WelcomePage from "./components/WelcomePage";
import Logout from "./components/auth/Logout";
import Action from "./components/Action";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/temp" element={<Action />} />
        {/* <Route
          path="/products"
          element={
            <PrivateRoute component={<DashBoard />}/>
          }
        />
        <Route path="/payment-success/:payment_id" element={<PaymentSuccess/>} /> */}
      </Routes>
    </>
  );
};

export default App;
