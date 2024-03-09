import http from "./http";

export function registerUser(data) {
  return http.post("/users", data).then((res) => res.data);
}
export function loginUser(data) {
  return http.post("/users/login", data).then((res) => res.data);
}
export function getCurrentUser(token) {
  return http
    .get("/user", {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((res) => res.data);
}
