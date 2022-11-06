import { QueryFunction, QueryFunctionContext } from "react-query";
import api from "./api";

export default {
  getTodos: ({ queryKey }: QueryFunctionContext): QueryFunction => {
    // ['key']
    // ['key', {page, status}]
    const [url, params] = queryKey;
    const arr: string[] = [];
    if (params) {
      const queryObject: { [key: string]: any } = params as any;
      // ?['page=1', 'status=done']
      Object.keys(queryObject).forEach((key) => {
        arr.push(`${key}=${queryObject[key]}`);
      });
    }
    // ?page=1&status=done
    let urlQuery = arr.length > 0 ? `?${arr.join("&")}` : "";
    return api.get(`/todos${urlQuery}`).then((res) => res.json()) as any;
  },
  getData: ({ queryKey }) => {
    const urlData: string[] = [];
    let urlquery: string = "";
    queryKey.forEach((param: any) => {
      if (typeof param === "object") {
        urlquery = Object.keys(param)
          .map((key: string) => {
            return `${key}=${param[key]}`;
          })
          .join("&");
      } else {
        urlData.push(`${param}`);
      }
    });
    const url = `/${urlData.join("/")}${urlquery === "" ? "" : "?"}${urlquery}`;
  },
};

// [string || number] = /string
// [object] = ?key=value&...
