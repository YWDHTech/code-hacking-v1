import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Fab } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { DarkMode, LightMode } from "@mui/icons-material";
import { setDarkMode, setLightMode } from "../../redux/themeSlice";
import { useQueryClient } from "react-query";
import Utilities from "../../helpers/utilities";
import Toast from "../Toast/Toast";
import { AlertType, ApiResponse } from "../../helpers/type";

export default function Layout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { mode } = useAppSelector((store) => store.themeMode);
  const dispatch = useAppDispatch;
  const client = useQueryClient();
  const [toast, setToast] = useState<AlertType>({ open: false });

  const handleError = (err: any) => {
    const { status, message }: ApiResponse<null> = err;
    if (status === 401) {
      Utilities.logout(dispatch, navigate);
      setToast({
        open: true,
        status: "error",
        message,
      });
    } else {
      setToast({
        open: true,
        status: "error",
        message,
      });
    }
  };

  useEffect(() => {
    client.setDefaultOptions({
      mutations: {
        onError: handleError,
      },
      queries: {
        onError: handleError,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    switch (pathname) {
      case "/":
        navigate("/auth/login");
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <Toast
        open={toast.open}
        handleClose={() => setToast((prev) => ({ ...prev, open: false }))}
        message={toast.message}
        status={toast.status}
      />
    </Box>
  );
}
