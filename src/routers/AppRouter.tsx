import { Typography } from "@mui/material";

const AppRouter = [
  {
    path: "/app/dashboard",
    element: <Typography variant={"h4"}>Dashboard</Typography>,
  },
  {
    path: "/app/contacts",
    element: <Typography variant={"h4"}>My Contacts</Typography>,
  },
];

export default AppRouter;
