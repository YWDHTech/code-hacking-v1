export type ThemeMode = "light" | "dark";

export type UserType = {
  email: string;
  name: string;
  password: string;
  avatar?: string;
  id: number;
};

export type ContactType = {
  firstname: string;
  lastname: string;
  middleName?: string;
  phoneNumber: string;
  emailAddress?: string;
  address?: string;
  id: number;
};
