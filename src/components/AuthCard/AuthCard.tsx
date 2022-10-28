import {
  Avatar,
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import logo from "../../assets/images/logo.png";
import AuthCardStyles from "./AuthCardStyles";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function AuthCard({ children }: Props) {
  const { classes } = AuthCardStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <br />
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Avatar src={logo} alt="phonebook logo" />
          <Typography className={classes.title} variant={"h5"}>
            PhoneBook
          </Typography>
        </Stack>
        <Box>{children}</Box>
      </CardContent>
    </Card>
  );
}
