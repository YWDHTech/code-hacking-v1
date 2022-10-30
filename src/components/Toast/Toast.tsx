import { AlertType } from "../../helpers/type";
import { Alert, Snackbar } from "@mui/material";

type Props = AlertType & {
  handleClose: () => void;
};

export default function Toast({ open, status, message, handleClose }: Props) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
      anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
    >
      <Alert
        severity={status}
        variant={"filled"}
        sx={{ width: "100%" }}
        onClose={handleClose}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
