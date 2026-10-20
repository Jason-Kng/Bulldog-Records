import { Navigate } from "react-router-dom";

function ProtectedRoute({ isAuth, Component }) {
  if (isAuth === null) {
    return null;
  }

  if (!isAuth) {
    return <Navigate to='/' replace />
  }

  return <Component />;
}

export default ProtectedRoute;
