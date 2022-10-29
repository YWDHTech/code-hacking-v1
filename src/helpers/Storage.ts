import { ContactType, UserType } from "./type";
import { Dataset } from "@mui/icons-material";

type Dataset = {
  users: {
    [email: string]: UserType;
  };
  contacts: {
    [email: string]: {
      [id: string]: ContactType;
    };
  };
};

export default class Storage {
  private static Dataset: Dataset = {} as any;
  private static datasetKey = "PhoneBook_Dataset";

  constructor() {
    Storage.Dataset = Storage.getItem<Dataset, Dataset>(
      Storage.datasetKey,
      {} as Dataset
    ) as Dataset;
  }

  static getUsers() {
    return Object.values(Storage.Dataset.users);
  }

  static getUser(email: string) {
    return Storage.Dataset.users[email];
  }

  static getUserContacts(email: string) {
    return Object.values(Storage.Dataset.contacts[email]);
  }

  static getContactByUser(id: string, email: string) {
    return Storage.Dataset.contacts[email][id];
  }

  static userExist(email: string) {
    const user: UserType | undefined = Storage.Dataset.users[email];
    return !!user;
  }

  static insertUser(userObject: UserType) {
    Storage.Dataset.users[userObject.email] = userObject;
    Storage.setItem(Storage.datasetKey, Storage.Dataset);
  }

  static insertContact(email: string, contactObject: ContactType) {
    Storage.Dataset.contacts[email] = {
      [contactObject.id]: contactObject,
    };
    Storage.setItem(Storage.datasetKey, Storage.Dataset);
  }

  static deleteContact(email: string, id: string) {
    delete Storage.Dataset.contacts[email][id];
    Storage.setItem(Storage.datasetKey, Storage.Dataset);
  }

  private static getItem<T, D>(key: string, defaultValue?: D) {
    const data = localStorage.getItem(key);
    if (data !== null) {
      return JSON.parse(data) as T;
    }
    return defaultValue;
  }

  private static setItem(key: string, value: any) {
    const data = JSON.stringify(value);
    localStorage.setItem(key, data);
  }

  private static removeItem(key: string) {
    localStorage.removeItem(key);
  }
}
