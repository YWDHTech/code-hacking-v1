import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import muiTheme from "./theme/muiTheme";
import { RouterProvider } from "react-router-dom";
import RootRouter from "./routers/RootRouter";
import { useAppSelector } from "./redux/store";
import { ThemeMode } from "./helpers/type";

function App() {
  const { mode } = useAppSelector((store) => store.themeMode);

  return (
    <ThemeProvider theme={muiTheme(mode as ThemeMode)}>
      <CssBaseline />
      <RouterProvider router={RootRouter} />
    </ThemeProvider>
  );
}

export default App;
