import { makeStyles } from "tss-react/mui";

export default makeStyles()((theme) => ({
  root: {
    minWidth: `min(100%, 25rem)`,
  },
  title: {
    fontWeight: "bold",
    marginLeft: theme.spacing(1),
  },
}));
