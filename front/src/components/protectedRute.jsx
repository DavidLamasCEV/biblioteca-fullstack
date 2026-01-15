import React from "react";
import AuthContext from "../contents/authContext";
import { Route } from "react-router-dom";

const ProtectedRoute = ({ }) => {
    const { user } = useContext(AuthContext);

    return user ?  children : <Navigate to="/login" replace />;

};

export default ProtectedRoute;