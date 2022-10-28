import { createBrowserRouter, Outlet } from "react-router-dom";
import AuthRouter from "./AuthRouter";
import AppRouter from "./AppRouter";
import Layout from "../components/Layout/Layout";

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
        element: <Outlet />,
        children: AppRouter,
      },
    ],
  },
]);
