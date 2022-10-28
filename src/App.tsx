import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import muiTheme from "./theme/muiTheme";
import { RouterProvider } from "react-router-dom";
import RootRouter from "./routers/RootRouter";

function App() {
  return (
    <ThemeProvider theme={muiTheme("light")}>
      <CssBaseline />
      <RouterProvider router={RootRouter} />
    </ThemeProvider>
  );
}

export default App;
