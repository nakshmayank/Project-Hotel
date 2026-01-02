import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

function ProtectedRoute({ children }) {
  const { user, authLoading } = useAppContext();

  if (authLoading) return null; // loader already handled in App.jsx

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
