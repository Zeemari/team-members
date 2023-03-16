import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const Auth = () => {
  const token = localStorage.getItem("team-token");
  return token === null ? <Navigate to="/" /> : <Outlet />;
};

export default Auth;
