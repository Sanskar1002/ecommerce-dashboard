import React from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const PrivateRoute = () => {
  //   const navigate = useNavigate();
  const user = localStorage.getItem("user");
  if (user) {
    return <Outlet />;
  } else {
    return <Navigate to="/signup" />;
  }
};

export default PrivateRoute;

{
  /* <Navigate to="/signup" /> */
}
