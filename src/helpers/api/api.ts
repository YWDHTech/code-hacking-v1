function getToken() {
  return localStorage.getItem("token");
}

export default {
  get: (url: string, data: any = null, auth: boolean = false) =>
    fetch(url, {
      method: "get",
      body: JSON.stringify(data),
      headers: {
        Authentication: `Bearer ${auth ? getToken() : ""}`,
      },
    }),
};
