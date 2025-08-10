import React, { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthContext";
import LoadingAnimation from "../Components/Loading/LoadingAnimation";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { loading, userInfo } = useContext(AuthContext);

  const location = useLocation();

  if (loading) {
    return <LoadingAnimation></LoadingAnimation>;
  }

  if (!userInfo) {
    return <Navigate state={location?.pathname} to={"/login"}></Navigate>;
  }
  return children;
};

export default PrivateRoute;
