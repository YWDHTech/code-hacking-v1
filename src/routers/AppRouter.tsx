import Dashboard from "../pages/Dashboard/Dashboard";
import Contacts from "../pages/Contacts/Contacts";

const AppRouter = [
  {
    path: "/app/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/app/contacts",
    element: <Contacts />,
  },
];

export default AppRouter;
