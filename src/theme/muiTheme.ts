import { createTheme, responsiveFontSizes } from "@mui/material";
import { ThemeMode } from "../helpers/type";
import { dark } from "@mui/material/styles/createPalette";

export default function muiTheme(mode: ThemeMode) {
  return responsiveFontSizes(
    createTheme({
      palette: {
        mode,
        background:
          mode === "light"
            ? {
                default: "rgb(229, 231, 235)",
                paper: "#FFFFFF",
              }
            : dark.background,
        text:
          mode === "light"
            ? {
                primary: "rgb(55, 65, 81)",
                secondary: "rgb(107, 114, 128)",
              }
            : dark.text,
        primary: {
          main: "rgb(79, 70, 229)",
          dark: "rgb(17, 24, 39)",
        },
        secondary: {
          main: "rgb(209, 213, 219)",
        },
      },
      shape: {
        borderRadius: 10,
      },
      typography: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 14,
        htmlFontSize: 14,
        fontWeightBold: "600",
        fontWeightRegular: "400",
        fontWeightLight: "300",
        fontWeightMedium: "500",
        button: {
          textTransform: "none",
        },
      },
    })
  );
}
