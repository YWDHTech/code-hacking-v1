import { makeStyles } from "tss-react/mui";
import { alpha } from "@mui/material";

export default makeStyles<{ drawerWidth: number }>()(
  (theme, { drawerWidth }) => ({
    root: {
      display: "flex",
    },
    appBar: {
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
      },
    },
    toolbar: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottom: `4px solid ${theme.palette.primary.main}`,
      backgroundColor: theme.palette.background.paper,
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
      },
    },
    searchIconWrapper: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    styledInputBase: {
      color: "inherit",
      "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
          width: "12ch",
          "&:focus": {
            width: "20ch",
          },
        },
      },
    },
    drawerRoot: {
      [theme.breakpoints.up("sm")]: {
        width: `${drawerWidth}px`,
        flexShrink: 0,
      },
      backgroundColor: theme.palette.primary.dark,
    },
    drawerMobile: {
      [theme.breakpoints.down("sm")]: {
        display: "block",
      },
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
      "& .MuiDrawer-paper": {
        boxSizing: "border-box",
        width: `${drawerWidth}px`,
        backgroundColor: theme.palette.primary.dark,
      },
    },
    drawer: {
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
      "& .MuiDrawer-paper": {
        boxSizing: "border-box",
        width: `${drawerWidth}px`,
        backgroundColor: theme.palette.primary.dark,
      },
    },
    main: {
      flexGrow: 1,
      padding: theme.spacing(3),
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${drawerWidth}px)`,
      },
    },
    menuItem: {
      "&:hover": {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
      },
    },
    title: {
      fontWeight: "bold",
      marginLeft: theme.spacing(1),
      color: theme.palette.common.white,
    },
  })
);
