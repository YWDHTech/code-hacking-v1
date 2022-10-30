import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Box, Fab } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { DarkMode, LightMode } from "@mui/icons-material";
import { setDarkMode, setLightMode } from "../../redux/themeSlice";

export default function Layout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { mode } = useAppSelector((store) => store.themeMode);
  const dispatch = useAppDispatch;

  useEffect(() => {
    switch (pathname) {
      case "/":
        navigate("/auth/login");
        break;
    }
  }, [pathname]);

  const Dark = () => (
    <>
      <LightMode sx={{ mr: 1 }} />
      Light Mode
    </>
  );

  const Light = () => (
    <>
      <DarkMode sx={{ mr: 1 }} />
      Dark Mode
    </>
  );

  return (
    <Box>
      <Outlet />
      <Fab
        onClick={() => {
          if (mode === "light") {
            dispatch(setDarkMode());
          } else {
            dispatch(setLightMode());
          }
        }}
        variant="extended"
        color={mode === "dark" ? "secondary" : "primary"}
        sx={{ position: "fixed", bottom: 24, right: 24 }}
      >
        {mode === "light" ? <Light /> : <Dark />}
      </Fab>
    </Box>
  );
}
