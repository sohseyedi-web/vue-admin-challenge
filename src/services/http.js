import axios from "axios";

const BASE_URL = import.meta.env.APIURL;

const app = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const http = {
  get: app.get,
  post: app.post,
  patch: app.patch,
  put: app.put,
  delete: app.delete,
};

export default http;
