import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function RequireAuth({ children }) {
  const { user } = useAuth();
  const location = useLocation();
  if (!user) {
    // send them to /signin and remember where they tried to go
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }
  return children;
}