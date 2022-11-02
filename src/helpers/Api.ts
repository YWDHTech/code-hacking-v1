import Storage from "./Storage";
import { ContactType, UserType } from "./type";

export default class Api {
  static async login(email: string, password: string) {
    if (Storage.userExist(email)) {
      const user = Storage.getUser(email);
      const pass = btoa(password);
      if (pass === user.password) {
        return Api.successResponse(
          "Login successfully!",
          {
            accessToken: Api.generateToken(user),
            user: {
              email: user.email,
              name: user.name,
              avatar: user.avatar,
              id: user.id,
            },
          },
          200
        );
      }
    }
    return Api.errorResponse(
      "Invalid credentials! incorrect email or password.",
      401
    );
  }

  static async signup(
    name: string,
    email: string,
    password: string,
    avatar: string = "https://i.pinimg.com/564x/da/43/7d/da437dd022ffe7e63cc7fff7dd6e2a70.jpg"
  ) {
    if (!Storage.userExist(email)) {
      const user: UserType = {
        id: Date.now(),
        name,
        email,
        avatar,
        password: btoa(password),
      };
      Storage.insertUser(user);
      return Api.successResponse(
        "Signed up successfully!",
        {
          accessToken: Api.generateToken(user),
          user: {
            email: user.email,
            name: user.name,
            avatar: user.avatar,
            id: user.id,
          },
        },
        201
      );
    }
    return Api.errorResponse(
      `User with email address "${email}" already exists.`,
      400
    );
  }

  static async getUserProfile(token: string) {
    return Api.authenticateUser(token, (user) =>
      Api.successResponse("Success!", {
        id: user.id,
        name: user.name,
        avatar: user.avatar,
        email: user.email,
      } as UserType)
    );
  }

  static async createContact(
    token: string,
    firstname: string,
    lastname: string,
    phoneNumber: string,
    middleName?: string,
    emailAddress?: string,
    address?: string
  ) {
    return Api.authenticateUser(token, ({ email }) => {
      const contact: ContactType = {
        id: Date.now().toString(),
        address,
        emailAddress,
        firstname,
        lastname,
        middleName,
        phoneNumber,
      };
      Storage.insertContact(email, contact);
      return Api.successResponse(
        "Contact created successfully!",
        { ...contact },
        201
      );
    });
  }

  static async deleteContact(token: string, id: string) {
    return Api.authenticateUser(token, ({ email }) => {
      Storage.deleteContact(email, id);
      return Api.successResponse("Contact deleted successfully!", null);
    });
  }

  static async getContacts(token: string) {
    return Api.authenticateUser(token, ({ email }) => {
      const contacts = Storage.getUserContacts(email);
      return Api.successResponse("Success!", [...contacts]);
    });
  }

  static async getContact(token: string, id: string) {
    return Api.authenticateUser(token, ({ email }) => {
      const contact = Storage.getContactByUser(id, email);
      if (contact) {
        return Api.successResponse("Success!", { ...contact });
      }
      return Api.errorResponse("Contact not found!", 404);
    });
  }

  private static authenticateUser(
    token: string,
    cb: (user: UserType) => Promise<any>
  ) {
    const tokenData = Api.resolveToken(token);
    if (tokenData) {
      const user = Storage.getUser(tokenData.email);
      return cb(user);
    }
    return Api.errorResponse(
      "Unauthorized!: Your session has expired, Logging out.",
      401
    );
  }

  private static generateToken(
    { id, email }: UserType,
    expires: number = 1000 * 60 * 60
  ) {
    const rawString = JSON.stringify({
      id,
      email,
      timestamp: Date.now() + expires,
    });
    return btoa(rawString);
  }

  private static resolveToken(token: string) {
    const data: { email: string; id: string; timestamp: number } = JSON.parse(
      atob(token)
    );
    if (data.timestamp < Date.now()) {
      return false;
    }
    return { email: data.email, id: data.id };
  }

  private static getResponseTime() {
    return Math.floor(Math.max(Math.random() * 4, 2) * 1000);
  }

  private static async successResponse(
    message: string,
    data: any = null,
    status: number = 200
  ) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          status,
          success: true,
          message: message || "Success!",
          data,
        });
      }, Api.getResponseTime());
    });
  }

  private static async errorResponse(message: string, status: number = 500) {
    return Promise.reject({
      status,
      success: false,
      message: message || "An unexpected error occurred!",
      error: new Error(message || "An unexpected error occurred!"),
    });
  }
}
