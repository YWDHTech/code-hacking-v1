import { makeStyles } from "tss-react/mui";

export default makeStyles()((theme) => ({
  root: {
    minHeight: "100vh",
  },
  con: {
    height: "100vh",
    width: "100%",
  },
  formField: {
    margin: theme.spacing(3, 0),
  },
  button: {
    display: "block",
    width: "100%",
  },
}));
