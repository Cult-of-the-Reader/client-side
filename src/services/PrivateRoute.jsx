
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token")

	return !token ? <Navigate to="/login" /> : children;

};

export default PrivateRoute;