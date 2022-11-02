import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Grid,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AppModal from "../../components/AppModal/AppModal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "react-query";
import Api from "../../helpers/Api";
import { AlertType, ApiResponse, ContactType } from "../../helpers/type";
import { useAppSelector } from "../../redux/store";
import { useState } from "react";
import Toast from "../../components/Toast/Toast";

type Props = {
  open: boolean;
  handleClose: () => void;
};

type FormType = {
  firstname: string;
  lastname: string;
  middleName: string;
  phoneNumber: string;
  emailAddress: string;
  address: string;
  [key: string]: string;
};

const fields: FormType = {
  firstname: "First Name",
  lastname: "Last Name",
  middleName: "Middle Name",
  phoneNumber: "Phone Number",
  emailAddress: "Email Address",
  address: "Address",
};

export default function CreateContact({ open, handleClose }: Props) {
  const { accessToken } = useAppSelector((store) => store.user);
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.down("sm"));
  const client = useQueryClient();
  const [toast, setToast] = useState<AlertType>({ open: false });

  const createContact = useMutation<
    ApiResponse<ContactType>,
    ApiResponse<null>,
    FormType
  >(
    async (variables) => {
      return (await Api.createContact(
        accessToken,
        variables.firstname,
        variables.lastname,
        variables.phoneNumber,
        variables.middleName,
        variables.emailAddress,
        variables.address
      )) as any;
    },
    {
      onSuccess: (data) => {
        formik.setSubmitting(false);
        formik.resetForm();
        setToast({
          open: true,
          status: "success",
          message: data.message,
        });
        client.invalidateQueries("contacts").then(() => {
          handleClose();
        });
      },
      onError: (error) => {
        formik.setSubmitting(false);
        setToast({
          open: true,
          status: "error",
          message: error.message,
        });
      },
    }
  );

  const formik = useFormik<FormType>({
    initialValues: {
      firstname: "",
      middleName: "",
      lastname: "",
      phoneNumber: "",
      emailAddress: "",
      address: "",
    },
    validationSchema: Yup.object({
      firstname: Yup.string().label("Firstname").required(),
      middleName: Yup.string().label("MiddleName"),
      lastname: Yup.string().label("LastName").required(),
      phoneNumber: Yup.string().label("Phone Number").required(),
      emailAddress: Yup.string().label("Email Address").email(),
      address: Yup.string().label("Address"),
    }),
    onSubmit: (values) => {
      createContact.mutate(values);
    },
  });

  return (
    <AppModal open={open} handleClose={handleClose} width={"min(600px, 100%)"}>
      <Card>
        <CardHeader
          title={"Add Contact"}
          titleTypographyProps={{ align: "center" }}
        />
        <CardContent>
          <form id={"create-form"} onSubmit={formik.handleSubmit}>
            <Grid container spacing={3}>
              {Object.keys(fields).map((field: string, index) => (
                <Grid key={index} item xs={12} sm={6} md={6}>
                  <Typography variant={"body2"}>{fields[field]}</Typography>
                  <TextField
                    helperText={formik.errors[field]}
                    error={!!formik.errors[field]}
                    onChange={formik.handleChange(field)}
                    fullWidth
                    name={field}
                    variant={"outlined"}
                    size={"small"}
                    type={
                      { email: "email", phoneNumber: "tel" }[field] || "text"
                    }
                    placeholder={fields[field]}
                  />
                </Grid>
              ))}
            </Grid>
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
                Close
              </Button>
              <br />
              <Button
                disableElevation
                startIcon={
                  createContact.isLoading ? <CircularProgress /> : null
                }
                type={"submit"}
                variant={"contained"}
                onClick={formik.submitForm}
                color={"primary"}
                disabled={!formik.isValid || createContact.isLoading}
                size={"large"}
                fullWidth={small}
              >
                Add Create
              </Button>
            </Stack>
          </form>
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
