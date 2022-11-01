import { createBrowserRouter, Outlet } from "react-router-dom";
import AuthRouter from "./AuthRouter";
import AppRouter from "./AppRouter";
import Layout from "../components/Layout/Layout";
import DashboardLayout from "../components/DashboardLayout/DashboardLayout";

export default createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/auth",
        element: <Outlet />,
        children: AuthRouter,
      },
      {
        path: "/app",
        element: <DashboardLayout />,
        children: AppRouter,
      },
    ],
  },
]);
