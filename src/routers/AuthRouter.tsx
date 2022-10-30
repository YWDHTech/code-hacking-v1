import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";

const AuthRouter = [
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/auth/signup",
    element: <SignUp />,
  },
];

export default AuthRouter;
