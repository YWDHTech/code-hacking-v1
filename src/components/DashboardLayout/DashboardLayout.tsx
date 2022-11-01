import { Box, Toolbar } from "@mui/material";
import DashboardLayoutStyles from "./DashboardLayoutStyles";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import TopBar from "../TopBar/TopBar";
import SideBar from "../SideBar/SideBar";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { removeUser } from "../../redux/userSlice";

const drawerWidth = 260;

export default function DashboardLayout() {
  const { classes } = DashboardLayoutStyles({ drawerWidth });
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch;
  const user = useAppSelector((store) => store.user);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (pathname.includes("/app") && !user.accessToken) {
      dispatch(removeUser());
      navigate("/auth/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, user.accessToken]);

  return (
    <Box className={classes.root}>
      <TopBar
        drawerWidth={drawerWidth}
        handleDrawerToggle={handleDrawerToggle}
      />
      <SideBar
        drawerWidth={drawerWidth}
        open={open}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Box component="main" className={classes.main}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
