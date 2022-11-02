import { removeUser } from "../redux/userSlice";

export default class Utilities {
  static logout(dispatch: any, navigate: (path: string) => void) {
    dispatch(removeUser());
    navigate("/auth/login");
  }

  static toNumber(value: any) {
    return new Intl.NumberFormat("en-IN", {
      maximumSignificantDigits: 2,
    }).format(Number(value));
  }
}
