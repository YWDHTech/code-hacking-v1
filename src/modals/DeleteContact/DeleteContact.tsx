import AppModal from "../../components/AppModal/AppModal";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useMutation, useQueryClient } from "react-query";
import { AlertType, ApiResponse } from "../../helpers/type";
import Api from "../../helpers/Api";
import { useAppSelector } from "../../redux/store";
import { useState } from "react";
import Toast from "../../components/Toast/Toast";

type Props = {
  open: boolean;
  handleClose: () => void;
  id?: string;
};

export default function DeleteContact({ open, handleClose, id }: Props) {
  const { accessToken } = useAppSelector((store) => store.user);
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.down("sm"));
  const client = useQueryClient();
  const [toast, setToast] = useState<AlertType>({ open: false });

  const deleteContact = useMutation<
    ApiResponse<null>,
    ApiResponse<null>,
    { id: string }
  >(
    async (variables) => {
      return (await Api.deleteContact(accessToken, variables.id)) as any;
    },
    {
      onSuccess: (data) => {
        client.invalidateQueries("contacts").then(() => {
          handleClose();
        });
        setToast({
          open: true,
          status: "success",
          message: data.message,
        });
      },
      onError: (error) => {
        setToast({
          open: true,
          status: "error",
          message: error.message,
        });
      },
    }
  );

  if (!id) return null;

  return (
    <AppModal open={open} handleClose={handleClose} width={"min(400px, 100%)"}>
      <Card>
        <CardHeader
          title={"Delete Contact"}
          titleTypographyProps={{ align: "left" }}
        />
        <CardContent>
          <Typography>Are you sure you want to delete this contact?</Typography>
          <Stack
            direction={small ? "column-reverse" : "row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            sx={{ width: "100%", px: 0, mt: 3 }}
          >
            <Button
              disableElevation
              variant={"contained"}
              color={"inherit"}
              onClick={handleClose}
              size={"large"}
              fullWidth={small}
            >
              Cancel
            </Button>
            <br />
            <Button
              disableElevation
              variant={"contained"}
              color={"error"}
              size={"large"}
              fullWidth={small}
              startIcon={
                deleteContact.isLoading ? (
                  <CircularProgress color={"error"} />
                ) : null
              }
              disabled={deleteContact.isLoading}
              onClick={() => deleteContact.mutate({ id })}
            >
              Delete
            </Button>
          </Stack>
        </CardContent>
      </Card>
      <Toast
        open={toast.open}
        message={toast.message}
        status={toast.status}
        handleClose={() => setToast((prev) => ({ ...prev, open: false }))}
      />
    </AppModal>
  );
}
