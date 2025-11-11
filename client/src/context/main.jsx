// Import necessary modules and components
import { RouterProvider, createBrowserRouter, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { ProtectedRoute } from "./ProtectedRouteMine";
import DashboardPatient from "../dashboards/DashboardPatient";
import Home from "../pages/Home";
import Logout from "../modules/Patient/Logout";
import MainLayout from "../pages/MainLayout";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import React from "react";

const Routes = () => {
  const { token } = useAuth();

  // ✅ Add a small hydration delay so the router waits for AuthContext to initialize
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    setIsReady(true);
  }, [token]);

  // ✅ Prevent router rendering before token is ready (avoids flickering)
  if (!isReady) return null; // or <LoadingSpinner /> if you prefer

  /*
  // Define public routes accessible to all users
  const routesForPublic = [
    {
      path: "/register",
      element: <RegisterForm />,
    },
    {
      path: "/login",
      element: <LoginForm />
    },
    {
      path: "/",
      element: <Home />
    }
  ];

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [
        {
          path: "/bla",
          element: <div>User Home Page</div>,
        },
        {
          path: "/dashboard/patient/*",
          element: <DashboardPatient />,
        },
        {
          path: "/logout",
          element: <Logout />
        },
      ],
    },
  ];

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    {
      path: "/",
      element: <div>Home Page</div>,
    },
    {
      path: "/login",
      element: <LoginForm />,
    },
  ];

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);
  */

  // ✅ New modern router definition using MainLayout (Navbar wrapper)
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />, // ✅ Always wraps pages with the NavigationBar
      children: [
        // ✅ Public routes
        { index: true, element: <Home /> },

        {
          // Redirect already logged-in users away from login page
          path: "login",
          element:
           token ? (
            <Navigate to="/" replace />
          ) : (
            <LoginPage />
          ),
        },
        {
          // Redirect already logged-in users away from register page
          path: "register",
          element:
           token ? (
            <Navigate to="/" replace />
          ) : (
            <RegisterPage />
          ),
        },

        // ✅ Protected routes (accessible only if authenticated)
        {
          path: "dashboard/patient/*",
          element: (
            <ProtectedRoute>
              <DashboardPatient />
            </ProtectedRoute>
          ),
        },

        // ✅ Misc routes
        { path: "logout", element: <Logout /> },
        { path: "bla", element: <div>User Home Page</div> },
      ],
    },
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;
