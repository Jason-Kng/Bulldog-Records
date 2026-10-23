import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ isAuth, Component, allowedUsers }) {
  const token = localStorage.getItem("accessToken");
  const decoded = jwtDecode(token);

  if (isAuth === null) {
    return null;
  }

  if (!isAuth || !allowedUsers.includes(decoded.userType)) {
    return <Navigate to='/' replace />
  }

  return <Component />;
}

export default ProtectedRoute;
