import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AuthCard from "../../components/AuthCard/AuthCard";
import SignUpStyles from "./SignUpStyles";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "react-query";
import Api from "../../helpers/Api";
import { Link, useNavigate } from "react-router-dom";
import Toast from "../../components/Toast/Toast";
import { useState } from "react";
import { AlertType, ApiResponse, AuthPayload } from "../../helpers/type";
import { setUser } from "../../redux/userSlice";
import { useAppDispatch } from "../../redux/store";

type FormType = {
  name: string;
  email: string;
  password: string;
};

export default function SignUp() {
  const { classes } = SignUpStyles();
  const [alert, setAlert] = useState<AlertType>({ open: false });
  const dispatch = useAppDispatch;
  const navigate = useNavigate();

  const formik = useFormik<FormType>({
    initialValues: { name: "", email: "", password: "" },
    onSubmit: ({ name, email, password }) => {
      signUp.mutate({ name, email, password });
    },
    validationSchema: Yup.object({
      name: Yup.string().label("Name").min(3).required(),
      email: Yup.string().label("Email address").email().required(),
      password: Yup.string().label("Password").min(6).required(),
    }),
  });

  const signUp = useMutation(
    ({ name, email, password }: FormType) => {
      return Api.signup(name, email, password) as any;
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
                <Typography variant={"body2"}>Name</Typography>
                <TextField
                  helperText={formik.errors.name}
                  error={!!formik.errors.name}
                  onChange={formik.handleChange("name")}
                  fullWidth
                  name={"name"}
                  variant={"outlined"}
                  size={"small"}
                  type={"text"}
                  placeholder={"Name"}
                />
              </Box>
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
                {signUp.isLoading ? "Loading..." : "Sign up"}
              </Button>
              <br />
              <Button
                variant={"text"}
                className={classes.button}
                component={Link}
                to={"/auth/login"}
              >
                Already have an account?
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
