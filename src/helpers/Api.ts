export default class Api {
  static async get(path: string) {
    return new Promise((resolve, reject) => {
      const data = localStorage.getItem(path);
      if (data === null) {
        Api.response(reject.bind({}, new Error("Not Found")));
      } else {
        Api.response(
          resolve.bind(
            {},
            {
              status: true,
              data: JSON.parse(data),
              message: "Success",
            }
          )
        );
      }
    });
  }

  static async post(path: string, data: any) {
    const rawData = JSON.stringify(data);
    localStorage.setItem(path, rawData);
    return Api.get(path);
  }

  static async delete(path: string) {
    return new Promise((resolve) => {
      localStorage.removeItem(path);
      resolve({
        status: true,
        data: null,
        message: "Success",
      });
    });
  }

  private static response(res: () => void) {
    const time = Math.floor(Math.random() * 3);
    setTimeout(() => {
      res();
    }, time);
  }
}
