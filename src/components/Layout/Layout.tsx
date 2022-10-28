import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Layout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    switch (pathname) {
      case "/":
        navigate("/auth/login");
        break;
    }
  }, [pathname]);

  return <Outlet />;
}
