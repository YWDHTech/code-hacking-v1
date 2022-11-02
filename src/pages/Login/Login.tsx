import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AuthCard from "../../components/AuthCard/AuthCard";
import LoginStyles from "./LoginStyles";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "react-query";
import Api from "../../helpers/Api";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { AlertType, ApiResponse, AuthPayload } from "../../helpers/type";
import Toast from "../../components/Toast/Toast";
import { useAppDispatch } from "../../redux/store";
import { setUser } from "../../redux/userSlice";

type FormType = {
  email: string;
  password: string;
};

export default function Login() {
  const { classes } = LoginStyles();
  const [alert, setAlert] = useState<AlertType>({ open: false });
  const dispatch = useAppDispatch;
  const navigate = useNavigate();

  const formik = useFormik<FormType>({
    initialValues: { email: "", password: "" },
    onSubmit: ({ email, password }) => {
      login.mutate({ email, password });
    },
    validationSchema: Yup.object({
      email: Yup.string().label("Email address").email().required(),
      password: Yup.string().label("Password").min(6).required(),
    }),
  });

  const login = useMutation(
    ({ email, password }: FormType) => {
      return Api.login(email, password) as any;
    },
    {
      onSuccess: ({ success, data, message }: ApiResponse<AuthPayload>) => {
        formik.setSubmitting(false);
        if (success && data) {
          dispatch(setUser(data));
          navigate("/app/dashboard");
          formik.resetForm();
        }
        setAlert({
          open: true,
          status: success ? "success" : "error",
          message,
        });
      },
    }
  );

  return (
    <Container maxWidth={"xl"} className={classes.root}>
      <Stack
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        className={classes.con}
      >
        <AuthCard>
          <form onSubmit={formik.handleSubmit}>
            <Box>
              <Box className={classes.formField}>
                <Typography variant={"body2"}>Email</Typography>
                <TextField
                  helperText={formik.errors.email}
                  error={!!formik.errors.email}
                  onChange={formik.handleChange("email")}
                  fullWidth
                  name={"email"}
                  variant={"outlined"}
                  size={"small"}
                  type={"email"}
                  placeholder={"Email"}
                />
              </Box>
              <Box className={classes.formField}>
                <Typography variant={"body2"}>Password</Typography>
                <TextField
                  helperText={formik.errors.password}
                  error={!!formik.errors.password}
                  onChange={formik.handleChange("password")}
                  fullWidth
                  name={"password"}
                  variant={"outlined"}
                  size={"small"}
                  type={"password"}
                  placeholder={"Password"}
                />
              </Box>
              <br />
              <Button
                type={"submit"}
                variant={"contained"}
                color={"primary"}
                className={classes.button}
              >
                {login.isLoading ? "Loading..." : "Sign in"}
              </Button>
              <br />
              <Button
                variant={"text"}
                className={classes.button}
                component={Link}
                to={"/auth/signup"}
              >
                Don't have an account?
              </Button>
            </Box>
          </form>
        </AuthCard>
      </Stack>
      <Toast
        {...alert}
        handleClose={() => setAlert((prev) => ({ ...prev, open: false }))}
      />
    </Container>
  );
}
