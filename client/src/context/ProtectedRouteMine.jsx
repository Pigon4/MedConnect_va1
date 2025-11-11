import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

export const ProtectedRoute = ({children}) => {
  const { token, isReady } = useAuth();

  // Wait for AuthContext to initialize before deciding
  if (!isReady) return null; // or a loading spinner

  if (!token) {
    console.log("YOU WERE REDIRECTED SINCE NO AUTH");
    return <Navigate to="/login" replace/>;
  }

  return children;
};