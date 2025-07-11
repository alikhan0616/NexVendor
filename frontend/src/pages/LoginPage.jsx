import React, { useEffect } from "react";
import Login from "../components/Login/Login.jsx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!loading && isAuthenticated === true) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);
  return (
    <div>
      <Login />
    </div>
  );
};

export default LoginPage;
