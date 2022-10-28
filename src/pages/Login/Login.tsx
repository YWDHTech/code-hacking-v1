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

type FormType = {
  email: string;
  password: string;
};

export default function Login() {
  const { classes } = LoginStyles();
  const formik = useFormik<FormType>({
    initialValues: { email: "", password: "" },
    onSubmit: (values, { setSubmitting }) => {
      console.log(values);
      setSubmitting(false);
    },
    validationSchema: Yup.object({
      email: Yup.string().label("Email address").email().required(),
      password: Yup.string().label("Password").min(6).required(),
    }),
  });

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
                Sign in
              </Button>
            </Box>
          </form>
        </AuthCard>
      </Stack>
    </Container>
  );
}
