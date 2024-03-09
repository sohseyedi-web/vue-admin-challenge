import axios from "axios";

const token = localStorage.getItem("accessToken");

const app = axios.create({
  baseURL: import.meta.env.VITE_APIURL,
});
app.defaults.headers.common["Authorization"] = `Token ${token}`;

const http = {
  get: app.get,
  post: app.post,
  patch: app.patch,
  put: app.put,
  delete: app.delete,
};

export default http;
